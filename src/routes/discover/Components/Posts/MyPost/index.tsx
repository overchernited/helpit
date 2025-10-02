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

const MyPost = () => {
    const [isFocused, setIsFocused] = createSignal(false);
    const [visible, setVisible] = createSignal(true);

    //Form State
    const [text, setText] = createSignal("");
    const [title, setTitle] = createSignal("");

    let ref: HTMLDivElement | undefined;
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleScroll = () => {
        if (ref) {
            ref.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

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
        await giveXp(10)
        setIsFocused(false)


    };

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
                    y: isFocused() ? "-20%" : "0%",
                    height: isFocused() ? "50vh" : "20vh",
                    scale: isFocused() ? 1.1 : 1,
                }}
                transition={{ duration: 0.6, easing: [0.34, 1.56, 0.64, 1] }}
                style={{ "transform-origin": "top center" }}
                id="myPost"

                class="w-full h-[20vh] z-[500] flex-col flex justify-center items-center touch-pan-x text-[var(--font-color-alt-2)]"
            >
                <div
                    ref={ref}
                    class="w-full h-full palette-gradient rounded-3xl px-4 my-5 flex flex-row justify-center gap-5 shadow-lg shadow-[color:var(--color-primary)] touch-pan-x"
                >
                    <form class="flex flex-col h-full w-full" onsubmit={handleSubmit} onkeydown={(e) => e.key === "Enter" && e.preventDefault()}>
                        <section class="flex flex-row justify-center items-center">
                            <article class="flex flex-col justify-center items-center">
                                <img
                                    src={authUser()?.user_metadata.avatar_url}
                                    class="w-auto h-16 rounded-full mt-5 object-cover "
                                    alt="user avatar"
                                />
                                <p class="font-bold w-full truncate">{authUser()?.user_metadata.full_name}</p>
                            </article>
                            <input
                                type="text"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                value={title()}
                                onInput={(e) => setTitle(e.currentTarget.value)}
                                class="bg-transparent outline-0 font-bold text-xl w-full"
                                placeholder="¿En que piensas?"
                            />
                        </section>
                        <textarea
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={text()}
                            onInput={(e) => setText(e.currentTarget.value)}
                            class="bg-transparent outline-0 font-medium resize-none h-full"
                            placeholder={`Escríbe algo para ${category()}`}
                        />
                        <div class="text-center m-2">
                            <Show when={isFocused()}>
                                <Button
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