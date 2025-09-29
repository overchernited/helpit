import Post from "../Post";
import supa from "~/lib/supabase";
import { onMount, createSignal, For, Show } from "solid-js";
import Button from "~/components/Button";

interface PostData {
    id: string;
    user_id: string;
    avatar_url: string;
    user_name: string;
    text: string;
    title: string;
}

interface PostLoaderProps {
    userId?: string; // prop opcional
}

const PostLoader = (props: PostLoaderProps) => {
    const [posts, setPosts] = createSignal<PostData[]>([]);
    const [loading, setLoading] = createSignal(false);
    const [offset, setOffset] = createSignal(0);
    const limit = 50;

    const GetPosts = async (loadMore = false) => {
        setLoading(true);

        let query = supa
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false })
            .range(offset(), offset() + limit - 1);

        if (props.userId) {
            query = query.eq("user_id", props.userId);
        }

        const { data, error } = await query;

        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }

        if (loadMore) {
            setPosts(prev => [...prev, ...(data || [])]);
        } else {
            setPosts(data || []);
        }

        setOffset(prev => prev + (data?.length || 0));
        setLoading(false);
    };

    onMount(() => {
        GetPosts();
    });

    return (
        <div class="h-full w-[90vw] md:w-[50vw] flex flex-col items-center gap-5 my-5">
            <Show when={posts().length > 0} fallback={<div class="text-center font-bold text-[var(--color-primary)]">No hay posts</div>}>
                <For each={posts()}>{(post) =>
                    <Post
                        id={post.id}
                        avatar_url={post.avatar_url}
                        user_name={post.user_name}
                        text={post.text}
                        title={post.title}
                        user_id={post.user_id}
                    />
                }</For>
            </Show>

            <Show when={!loading() && posts().length > 25}>
                <Button
                    btnStyle="button-palette"
                    class="bg-blue-500 text-white px-4 py-2 text-md! w-full rounded-full!"
                    onclick={() => GetPosts(true)}
                >
                    Descubrir más!
                </Button>
            </Show>

            <Show when={loading()}>
                <div class="w-5 h-5 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            </Show>
        </div>
    );
};

export default PostLoader;
