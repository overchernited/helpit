import { authUser } from "~/user/UserHandler"
import { createSignal } from "solid-js"
import { Motion } from "solid-motionone"
import supa from "~/lib/supabase";
import { AddNotification } from "~/components/Notifications";
import { containsBadWords } from "~/lib/badwords";
import { giveXp } from "~/user/UserHandler";

const MyComment = (props: { post_id: string }) => {
    const [text, setText] = createSignal("");

    const createComment = async () => {
        try {

            const { data: insertComment, error: insertCommentError } = await supa.from("comments").insert({
                user_name: authUser()?.user_metadata.full_name,
                avatar_url: authUser()?.user_metadata.avatar_url,
                post_id: props.post_id,
                comment: text(),
            })

            if (insertCommentError) {
                console.error(insertCommentError);
                return
            }

            const { data: updateUser, error: updateUserError } = await supa.auth.updateUser({
                data: {
                    comments: (authUser()?.user_metadata.comments ?? 0) + 1
                }
            })

            if (updateUserError) {
                console.error(updateUserError);
                return
            }

            const { data: getCommentsNumberById, error: getCommentsNumberByIdError } = await supa.from("posts").select("comments_number").eq("id", props.post_id).single();

            if (getCommentsNumberByIdError) {
                console.error(getCommentsNumberByIdError);
                return
            }

            const { error: updateCommentsNumberError } = await supa.from("posts").update({ comments_number: getCommentsNumberById.comments_number + 1 }).eq("id", props.post_id);

            if (updateCommentsNumberError) {
                console.error(updateCommentsNumberError);
                return
            }


        } catch (err) {
            console.error("Error al crear comentario:", err);
            throw err
        }


    }

    const handleSubmit = async (e: Event) => {
        e.preventDefault()

        if (!text()) {
            AddNotification({ message: "No puedes enviar un comentario vacio", title: "Oops!", type: "error", duration: 3000 })
            return
        }



        const wordsCheck = containsBadWords(text())
        if (wordsCheck) {
            AddNotification({ message: "No vuelvas a hacer eso.", title: "Advertencia", type: "error", duration: 5000 })
        } else {
            await giveXp(10)
            createComment()
            setText("")
        }
    }

    return (

        <form class="w-[90%]" onsubmit={(e) => handleSubmit(e)}>
            <div
                class="p-1 flex flex-col items-center bg-[var(--background)] text-[var(--font-color-alt-2)] select-none rounded-md ">

                <div
                    class="w-full flex flex-row justify-center"
                >
                    <main class="flex flex-col w-full relative">
                        <article class="flex-row flex justify-between gap-5 p-5">
                            <section class="flex flex-row w-full">
                                <section class="flex flex-col items-center justify-center">
                                    <img
                                        src={authUser()?.user_metadata.avatar_url}
                                        alt=""
                                        class="rounded-full w-12 h-12 cursor-pointer"
                                    />
                                    <p class="font-bold line-clamp-1">{authUser()?.user_metadata.full_name}</p>
                                </section>
                                <textarea
                                    value={text()}
                                    onInput={(e) => setText(e.currentTarget.value)}
                                    class="bg-transparent outline-0 mx-2 font-medium resize-none h-full w-full"
                                    placeholder={`Escribe un comentario positivo!`}
                                />
                            </section>
                        </article>
                    </main>

                </div>
                <Motion.button
                    initial={{ scale: 1 }}
                    hover={{ scale: 1.3, opacity: 1 }}
                    class="cursor-pointer text-white w-8 h-8 rounded-full p-1 bg-[var(--color-primary)] font-bold"><i class="fa-solid fa-paper-plane"></i></Motion.button>
            </div >
        </form>
    )
}

export default MyComment