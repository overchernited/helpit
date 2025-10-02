import Post from "../Post";
import supa from "~/lib/supabase";
import { onMount, createSignal, For, Show, createEffect, onCleanup } from "solid-js";
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

function PostLoader(props: { userId?: string; category: string }) {
    const [posts, setPosts] = createSignal<PostData[]>([]);
    const [offset, setOffset] = createSignal(0);
    const [loading, setLoading] = createSignal(false);
    const limit = 10;
    let cacheCategory = props.category;
    let channel: RealtimeChannel | null = null;
    const GetPosts = async (loadMore = false) => {
        setLoading(true);

        let query = supa
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false })
            .range(offset(), offset() + limit - 1);

        if (props.userId) query = query.eq("user_id", props.userId);
        if (props.category !== "*") query = query.eq("category", props.category);

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

        setOffset((prev) => prev + (data?.length || 0));
        setLoading(false);
    };

    const handlePayload = (payload: any) => {

        if (payload.eventType === "INSERT") {
            const newPost = payload.new as PostData;
            if (props.userId && newPost?.user_id !== props.userId) return;
            if (props.category !== "*" && newPost?.category !== props.category) return;
            setPosts((prev) => [newPost, ...prev]);
        }

        if (payload.eventType === "UPDATE") {
            const newPost = payload.new as PostData;
            if (props.userId && newPost?.user_id !== props.userId) return;
            if (props.category !== "*" && newPost?.category !== props.category) return;
            setPosts((prev) => prev.map((p) => (p.id === newPost.id ? newPost : p)));
        }

        if (payload.eventType === "DELETE") {
            const oldPost = payload.old as PostData;
            if (props.userId && oldPost?.user_id !== props.userId) return;
            if (props.category !== "*" && oldPost?.category !== props.category) return;
            setPosts((prev) => prev.filter((p) => p.id !== oldPost.id));
        }
    };
    const setupChannel = () => {
        if (channel) supa.removeChannel(channel);

        channel = supa
            .channel(`realtime:posts:${props.userId ?? "all"}:${props.category}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "posts" },
                handlePayload
            )
            .subscribe();

        channel
            .on("system", { event: "error" }, (payload) => {
                if (payload.message === "Subscribed to PostgreSQL") {
                    return;
                }
            })

        console.log("Realtime channel: [ALIVE]");
    };

    // 📌 Ciclo de vida
    onMount(() => {
        GetPosts();
        setInterval(() => setupChannel(), 3000);

    });

    onCleanup(() => {
        if (channel) supa.removeChannel(channel);
    });

    createEffect(() => {
        if (cacheCategory !== props.category) {
            cacheCategory = props.category;
            setOffset(0);
            setPosts([]);
            GetPosts();
        }
    });

    return (
        <div class="h-auto w-[90vw] md:w-[50vw] flex flex-col items-center gap-5 my-5">
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
