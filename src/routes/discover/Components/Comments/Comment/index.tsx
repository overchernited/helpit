import ExpandedParagraph from "../../Posts/ExpandedParagraph"

interface Props {
    avatar_url: string
    user_name: string
    comment: string
    id: string
    user_id: string
}

const Comment = (props: Props) => {

    return (
        <div
            class="w-[90%] flex flex-col items-center ">
            <div
                class="w-full p-1 flex flex-row justify-center select-none border-b-1 border-[var(--surface)] text-[var(--surface)]"
            >
                <main class="flex flex-col w-full relative">
                    <article class="flex-row flex justify-between gap-5 p-5">
                        <section class="flex flex-row w-full">
                            <section class="flex flex-col items-center justify-center">
                                <img
                                    onclick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/profile/${props.user_id}`
                                    }}
                                    src={props.avatar_url}
                                    alt=""
                                    class="rounded-full w-10 h-10 cursor-pointer"
                                />
                                <p class="font-bold line-clamp-1">{props.user_name}</p>
                            </section>
                            <ExpandedParagraph>{props.comment}</ExpandedParagraph>
                        </section>

                    </article>

                </main>

            </div>
        </div >
    )
}

export default Comment