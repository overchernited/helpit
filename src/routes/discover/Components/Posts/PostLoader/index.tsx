import Post from "../Post";
import supa from "~/lib/supabase";
import { onMount, createSignal, For, Show, createEffect, onCleanup, Accessor } from "solid-js";
import Button from "~/components/Button";
import { RealtimeChannel } from "@supabase/supabase-js";

interface PostData {
    id: string;
    user_id: string;
    category: string;
    avatar_url: string;
    user_name: string;
    title: string;
    text: string;
    created_at: string;
}


interface Props {
    userId?: string;
    category: string;
    signal?: number;
}

function PostLoader(props: Props) {
    const [posts, setPosts] = createSignal<PostData[]>([]);
    const [offset, setOffset] = createSignal(0);
    const [loading, setLoading] = createSignal(false);
    const limit = 10;
    let cacheCategory = props.category;
    const GetPosts = async (loadMore = false, reset = false) => {
        setLoading(true);

        const start = reset ? 0 : offset();
        const end = start + limit - 1;

        let query = supa
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false })
            .range(start, end);

        if (props.userId) query = query.eq("user_id", props.userId);
        if (props.category !== "general") query = query.eq("category", props.category);

        setTimeout(async () => {
            const { data, error } = await query;
            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            if (loadMore) {
                setPosts((prev) => [...prev, ...(data as PostData[])]);
            } else {
                setPosts(data as PostData[]);
            }

            setOffset(start + (data?.length || 0));
            setLoading(false);
        });

    };


    const GetLatestPost = async () => {
        const { data, error } = await supa
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(1);

        if (error) {
            console.error(error);
            return;
        }

        if (data && data.length > 0) {
            setPosts((prev) => {
                if (prev.length > 0 && prev[0].id === data[0].id) {
                    return prev;
                }
                return [data[0], ...prev];
            });
        }
    };


    onMount(() => {
        GetPosts();
        supa.auth.startAutoRefresh();

    })

    onCleanup(() => {
        supa.auth.stopAutoRefresh();
    });

    createEffect(() => {
        if (cacheCategory !== props.category) {
            cacheCategory = props.category;

            GetPosts(false, true);
        }
    }, [props.category, cacheCategory]);

    let cacheSignal = props.signal

    createEffect(() => {
        if (props.signal !== cacheSignal) {
            GetLatestPost();
            cacheSignal = props.signal;
        }
    });

    return (
        <div class="h-full w-[90vw] md:w-[50vw] flex flex-col items-center gap-5 mt-5 mb-15">
            <Show
                when={posts().length > 0}
                fallback={<div class="text-center font-bold text-[var(--color-tertiary)]">No hay posts</div>}
            >
                <For each={posts()}>
                    {(post) => (
                        <Post
                            id={post.id}
                            avatar_url={post.avatar_url}
                            user_name={post.user_name}
                            text={post.text}
                            title={post.title}
                            category={post.category}
                            user_id={post.user_id}
                        />
                    )}
                </For>
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
                <div class="w-5 h-5 border-4 border-[var(--color-tertiary)] border-t-transparent rounded-full animate-spin"></div>
            </Show>
        </div>
    );
}

export default PostLoader;
