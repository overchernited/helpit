import { authUser } from "~/user/UserHandler"
import { Motion, Presence } from "solid-motionone";
import { createSignal, Show, onCleanup, onMount } from "solid-js";
import Button from "~/components/Button";
import { createEffect } from "solid-js";
import supa from "~/lib/supabase";
import { containsBadWords } from "~/lib/badwords";
import { AddNotification } from "~/components/Notifications";
import { giveXp } from "~/user/UserHandler";
import { category } from "../Categories";


interface Props {
    onCreate: () => void
}

const MyPost = (props: Props) => {
    const [isFocused, setIsFocused] = createSignal(false);
    const [visible, setVisible] = createSignal(true);
    const [isButtonLoading, setIsButtonLoading] = createSignal(false);

    //Form State
    const [text, setText] = createSignal("");
    const [title, setTitle] = createSignal("");

    let ref: HTMLDivElement | undefined;
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            const active = document.activeElement?.tagName;
            if (active !== "INPUT" && active !== "TEXTAREA" && active !== "BUTTON") {
                setIsFocused(false);
            }
        }, 0);
    };

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        setVisible(false);
                    } else {
                        setVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (ref) observer.observe(ref);
        onCleanup(() => observer.disconnect());
    });

    const uploadPostHandle = async () => {
        try {
            setIsButtonLoading(true)
            const { error } = await supa.from("posts").insert({
                user_name: authUser()?.user_metadata.full_name,
                avatar_url: authUser()?.user_metadata.avatar_url,
                category: category(),
                title: title(),
                text: text(),
            });
            if (error) {
                console.error(error);
                return
            }
            setIsFocused(false)
        }
        catch (error) {
            throw error
            return
        }
        finally {
            setIsButtonLoading(false)
        }
    }

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        const badword = containsBadWords(text()) || containsBadWords(title())
        if (badword) {
            AddNotification({ message: "No vuelvas a hacer eso.", title: "Advertencia", type: "error", duration: 5000 })
            return
        }

        if (!text() || !title()) {
            AddNotification({ message: "No puedes dejar campos vacios", title: "Oops!", type: "error", duration: 3000 })
            return
        }


        await uploadPostHandle()
        setText("")
        setTitle("")
        props.onCreate()
        await giveXp(10)
        setIsFocused(false)


    };
    createEffect(() => {
        if (isFocused()) {
            const ref = document.getElementById("myPost");
            ref?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    })

    return (
        <>
            <Show when={isFocused()}>
                <Motion.div
                    onClick={() => { setIsFocused(false) }}
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.2, opacity: 0 }}
                    transition={{ duration: 0.3, easing: [0.34, 1.56, 0.64, 1] }}
                    class="fixed h-screen w-screen top-0 left-0 backdrop-blur-md bg-black/5 z-[500] touch-pan-x overflow-hidden"
                />
            </Show>
            <Motion.div
                animate={{
                    height: isFocused() ? "50vh" : "24vh",
                }}
                transition={{ duration: 0.6, easing: [0.34, 1.56, 0.64, 1] }}
                style={{ "transform-origin": "top center" }}
                id="myPost"

                class="w-full h-[20vh] z-[500] my-3 flex-col flex justify-center items-center touch-pan-x text-[var(--font-color-alt-2)]"
            >
                <p class=" text-[var(--font-color-alt)] font-black text-xl my-2">Escribe algo para {category()}</p>
                <div
                    ref={ref}
                    class="w-full h-full palette-gradient rounded-3xl px-4 mb-2 flex flex-row justify-center gap-5 shadow-lg shadow-[color:var(--color-primary)] touch-pan-x"
                >
                    <form class="flex flex-col h-full w-full p-2 gap-2" onsubmit={handleSubmit} onkeydown={(e) => e.key === "Enter" && e.preventDefault()}>
                        <div class="flex flex-row items-center w-full">
                            <img
                                src={authUser()?.user_metadata.avatar_url}
                                class="w-auto h-16 rounded-full object-cover "
                                alt="user avatar"
                            />
                            <p class="font-bold w-full truncate">{authUser()?.user_metadata.full_name}</p>
                        </div>
                        <input
                            type="text"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={title()}
                            onInput={(e) => setTitle(e.currentTarget.value)}
                            class="bg-transparent outline-0 font-bold text-md md:text-xl w-full "
                            placeholder={`Titulo para tu publicación`}
                        />
                        <textarea
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={text()}
                            onInput={(e) => setText(e.currentTarget.value)}
                            class="bg-transparent outline-0 font-medium resize-none h-full"
                            placeholder="¿Qué estás pensando?"
                        />
                        <div class="text-center m-2">
                            <Show when={isFocused()}>
                                <Button
                                    isLoading={isButtonLoading()}
                                    type="submit"
                                    btnStyle="button-palette"
                                    class="w-[35%] text-xl"
                                >Crear</Button>
                            </Show>
                        </div>
                    </form>

                </div>
            </Motion.div >
        </>
    );
};

export default MyPost;