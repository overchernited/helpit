import { authUser } from "~/user/UserHandler"
import { createSignal } from "solid-js"
import { Motion } from "solid-motionone"
import supa from "~/lib/supabase";
import { AddNotification } from "~/components/Notifications";
import { containsBadWords } from "~/lib/badwords";
import { giveXp } from "~/user/UserHandler";

const MyComment = (props: { post_id: string, user_id: string }) => {
    const [text, setText] = createSignal("");

    const createComment = async () => {
        try {

            const { data, error: insertCommentError } = await supa.from("comments").insert({
                user_name: authUser()?.user_metadata.full_name,
                avatar_url: authUser()?.user_metadata.avatar_url,
                post_id: props.post_id,
                comment: text(),
            })

            if (insertCommentError) {
                console.error(insertCommentError);
                return
            }

            if (authUser()?.id === props.user_id) return

            const { error: notificationError } = await supa.from("notifications").insert({
                from_id: authUser()?.id,
                from_avatar: authUser()?.user_metadata.avatar_url,
                title: `${authUser()?.user_metadata.full_name} ha comentado tu publicación.`,
                to_id: props.user_id,
                type: "comment",
                post_id: props.post_id
            })

            if (notificationError) {
                console.error(notificationError);
                return;
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
                        <section class="flex flex-row items-center p-2">
                            <img
                                src={authUser()?.user_metadata.avatar_url}
                                alt={`${authUser()?.user_metadata.full_name} avatar`}
                                class="rounded-full w-auto h-12 cursor-pointer object-cover"
                            />
                            <p class="font-bold line-clamp-1 truncate">{authUser()?.user_metadata.full_name}</p>
                        </section>
                        <textarea
                            value={text()}
                            onInput={(e) => setText(e.currentTarget.value)}
                            class="bg-transparent outline-0 mx-2 font-medium resize-none h-full w-full"
                            placeholder={`Escribe un comentario positivo!`}
                        />
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