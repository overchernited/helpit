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

    const length = props.title.length

    let fontSize = Math.max(12, 24 - length * 0.1);

    return (
        <main class="flex flex-col w-full h-full justify-center items-center text-[var(--font-color-alt-2)] mt-10">
            <div
                class=" w-[90%] palette-gradient rounded-md flex flex-col items-center ">
                <div
                    class=
                    "w-full rounded-md flex flex-row justify-center gap-5 transition-all"
                >

                    <main class="flex flex-col w-full relative">
                        <article class="flex-row flex justify-between gap-5 p-5">

                            <section class="flex flex-col w-full">
                                <article class="flex flex-row items-center gap-5">
                                    <section class="flex flex-col justify-center items-center">
                                        <img
                                            src={props.avatar_url}
                                            alt=""
                                            onpointerdown={() => { window.location.href = `/users/${props.user_id}` }}
                                            class="rounded-full w-auto h-16 cursor-pointer object-cover"
                                        />
                                        <p class="font-bold w-[95%] text-xs break-all">{props.user_name}</p>
                                    </section>
                                    <h1 style={{ "font-size": `${fontSize}px` }} class="font-extrabold w-full">{props.title}</h1>
                                </article>
                                <ExpandedParagraph>{props.text}</ExpandedParagraph>
                            </section>

                        </article>

                    </main>

                </div>
            </div>
            <div class="h-auto w-full">
                <h1 class="text-3xl font-bold">Comentarios</h1>
                <CommentLoader post_id={props.id} />
            </div>
        </main >
    )
}

export default ExpandedPost