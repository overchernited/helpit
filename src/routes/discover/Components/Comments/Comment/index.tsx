import ExpandedParagraph from "../../Posts/ExpandedParagraph"
import { authUser } from "~/user/UserHandler"
import { twMerge } from "tailwind-merge"

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
                    <section class="flex flex-col w-full gap-1">
                        <section class="flex flex-row items-center gap-1">
                            <img
                                src={props.avatar_url}
                                alt={`${props.user_name} avatar`}
                                class="rounded-full w-auto h-10 object-cover"
                            />
                            <a href={`/users/${props.user_id}`} class={twMerge("font-bold break-all md:break-normal cursor-pointer text-lg underline inline-block", props.user_name === authUser()?.user_metadata.full_name ? "text-[var(--color-primary)]" : "")}>{props.user_name}</a>
                        </section>
                        <ExpandedParagraph>{props.comment}</ExpandedParagraph>
                    </section>

                </main>

            </div>
        </div >
    )
}

export default Comment