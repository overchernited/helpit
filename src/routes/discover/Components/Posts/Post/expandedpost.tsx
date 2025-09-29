import { twMerge } from "tailwind-merge";
import ExpandedParagraph from "../ExpandedParagraph";
import CommentLoader from "../../Comments/CommentLoader";
type PostProps = {
    avatar_url: string,
    user_name: string,
    text: string,
    title: string,
    id: string
    user_id: string
};

type CommentProps = {
    avatar_url?: string,
    user_name?: string,
    text?: string,
    id?: string
    user_id?: string
};


const ExpandedPost = (props: PostProps) => {
    const { title, ...restProps } = props;
    return (
        <main class="flex flex-col w-full h-full  justify-center items-center">
            <div
                class="m-2 w-[90%] palette-gradient rounded-md bg-[--surface-alt] flex flex-col items-center ">
                <div
                    class=
                    "w-full rounded-md bg-[var(--surface)] flex flex-row justify-center gap-5 transition-all"
                >

                    <main class="flex flex-col w-full relative">
                        <article class="flex-row flex justify-between gap-5 p-5">

                            <section class="flex flex-col w-full">
                                <article class="flex flex-row items-center gap-5">
                                    <section class="flex flex-col justify-center items-center">
                                        <img
                                            src={props.avatar_url}
                                            alt=""
                                            class="rounded-full w-16 h-16 cursor-pointer"
                                        />
                                        <p class="font-bold text-[var(--color-secondary)]">{props.user_name}</p>
                                    </section>
                                    <h1 class="font-extrabold text-2xl w-full">{props.title}</h1>
                                </article>
                                <ExpandedParagraph>{props.text}</ExpandedParagraph>
                            </section>

                        </article>

                    </main>

                </div>
            </div>

            <h1 class="text-3xl font-bold text-[var(--surface)]">Comentarios</h1>
            <CommentLoader post_id={props.id} />
        </main >
    )
}

export default ExpandedPost