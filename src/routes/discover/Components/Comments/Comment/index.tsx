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
                class="w-full p-1 flex flex-row justify-center select-none border-b-1 border-[var(--background)] text-[var(--font-color)]"
            >
                <main class="flex flex-col w-full relative">
                    <article class="flex-row flex justify-between">
                        <section class="flex flex-col w-full gap-1">
                            <section class="flex flex-row justify-center items-center gap-1">
                                <img
                                    src={props.avatar_url}
                                    alt=""
                                    class="rounded-full w-auto h-10 object-cover"
                                />
                                <p onPointerDown={
                                    (e) => {
                                        e.preventDefault();
                                        window.location.href = `/users/${props.user_id}`
                                    }
                                } class="font-bold w-[95%] text-md break-all underline  cursor-pointer">{props.user_name}</p>
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