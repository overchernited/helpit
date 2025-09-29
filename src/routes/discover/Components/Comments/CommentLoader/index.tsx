import { For, createSignal, onMount } from "solid-js";
import Comment from "../Comment";
import MyComment from "../MyComment";
import supa from "~/lib/supabase";

interface CommentProps {
    avatar_url: string;
    user_name: string;
    comment: string;
    id: string;
    user_id: string;
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

    onMount(() => getCommentsById());

    return (
        <div class=" w-full h-[80vh] flex overflow-y-auto items-center flex-col gap-4">
            <MyComment post_id={props.post_id} />
            <For each={comments()}>
                {(comment) => <Comment {...comment} />}
            </For>
        </div>
    )
}

export default CommentLoader