import { For, Show, createSignal, onCleanup, onMount } from "solid-js";
import Comment from "../Comment";
import MyComment from "../MyComment";
import supa from "~/lib/supabase";

interface CommentProps {
    avatar_url: string;
    user_name: string;
    comment: string;
    id: string;
    user_id: string;
    post_id: string
}

const CommentLoader = (props: { post_id: string }) => {
    const [comments, setComments] = createSignal<CommentProps[]>([]);

    const getCommentsById = async () => {
        try {
            const { data, error } = await supa.from("comments").select("*").eq("post_id", props.post_id).order("created_at", { ascending: false });
            if (error) {
                console.error(error);
                return;
            }
            setComments(data);
        }
        catch (error) {
            throw error
            return
        }
    }



    onMount(() => {
        getCommentsById()
        const channel = supa
            .channel("realtime:comments")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "comments" },
                (payload) => {
                    const newComment = payload.new as CommentProps;
                    const oldComment = payload.old as CommentProps;

                    if (newComment.post_id !== props.post_id) return

                    if (payload.eventType === "INSERT") {
                        setComments(prev => [newComment, ...prev]);
                    }

                    if (payload.eventType === "UPDATE") {
                        setComments(prev =>
                            prev.map(p => (p.id === newComment.id ? newComment : p))
                        );
                    }

                    if (payload.eventType === "DELETE") {
                        setComments(prev => prev.filter(p => p.id !== oldComment.id));
                    }
                }
            )
            .subscribe();
        onCleanup(() => supa.removeChannel(channel));
    }


    );

    return (
        <div class=" w-full flex overflow-y-auto items-center flex-col gap-4">
            <MyComment post_id={props.post_id} />
            <For each={comments()}>
                {(comment) => <Comment {...comment} />}
            </For>
            <Show when={comments().length === 0} fallback={<></>}>
                <p class="font-bold text-lg text-[var(--color-tertiary)]">No hay comentarios aún</p>
            </Show>
        </div>
    )
}

export default CommentLoader