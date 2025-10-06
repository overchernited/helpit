import { twMerge } from "tailwind-merge";
import ExpandedParagraph from "../ExpandedParagraph";
import CommentLoader from "../../Comments/CommentLoader";
import { authUser } from "~/user/UserHandler";
import { Show } from "solid-js";
type PostProps = {
    avatar_url: string,
    user_name: string,
    text: string,
    title: string,
    id: string
    user_id: string
};

type ExpandedPostProps = PostProps & {
    informative?: boolean;
};

type CommentProps = {
    avatar_url?: string,
    user_name?: string,
    text?: string,
    id?: string
    user_id?: string
};


const ExpandedPost = ({ informative, ...props }: ExpandedPostProps) => {


    const { title, ...restProps } = props;

    const length = props.title.length

    let fontSize = Math.max(12, 24 - length * 0.1);

    return (
        <main class="flex flex-col w-full h-auto items-center text-[var(--font-color-alt-2)] mt-2">
            <div
                class=" w-[90%] palette-gradient rounded-md flex flex-col items-center ">
                <div
                    class=
                    "w-full rounded-md flex flex-row justify-center gap-5 transition-all"
                >

                    <main class="flex flex-col w-full relative">
                        <article class="flex-row flex justify-between gap-5 p-5">

                            <section class="flex flex-col w-full">
                                <section class="flex flex-row w-full items-center">
                                    <img
                                        src={props.avatar_url}
                                        alt={`${props.user_name} avatar`}
                                        class="rounded-full w-auto h-16 cursor-pointer"
                                    />
                                    <a href={`/users/${props.user_id}`} class={twMerge("font-bold break-all md:break-normal cursor-pointer text-lg underline inline-block", props.user_name === authUser()?.user_metadata.full_name ? "text-[var(--color-primary)]" : "")}>{props.user_name}</a>
                                </section>
                                <h1 style={{ "font-size": `${fontSize}px` }} class="font-extrabold w-full">{props.title}</h1>
                                <ExpandedParagraph>{props.text}</ExpandedParagraph>
                            </section>

                        </article>

                    </main>

                </div>
            </div>
            <Show when={!informative} fallback={<></>}>
                <div class="h-auto w-full">
                    <h1 class="text-3xl font-bold">Comentarios</h1>
                    <CommentLoader post_id={props.id} user_id={props.user_id} />
                </div>
            </Show>
        </main >
    )
}

export default ExpandedPost