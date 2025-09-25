import { authUser } from "~/auth/GetUser"
import { Motion, Presence } from "solid-motionone";
import { createSignal, Show, onCleanup, onMount } from "solid-js";
import { twMerge } from "tailwind-merge";
import Button from "~/components/Button";
import { createEffect } from "solid-js";

const MyPost = () => {
    const [isFocused, setIsFocused] = createSignal(false);
    const [visible, setVisible] = createSignal(true);

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

    createEffect(() => {
        console.log(visible());
    }, visible);

    const handleClick = () => {
        alert("click");
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
                    class="fixed h-screen w-screen top-0 left-0 backdrop-blur-md bg-black/5 z-50 touch-pan-x"
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
                class="w-full h-[20vh] z-[200] flex-col flex justify-center items-center touch-pan-x"
            >
                <div
                    ref={ref}
                    class="w-full h-full palette-gradient rounded-3xl px-4 my-5 flex flex-row justify-center gap-5 shadow-xl shadow-zinc-400 touch-pan-x"
                >
                    <form class="flex flex-col h-full w-full">
                        <section class="flex flex-row justify-center items-center">
                            <article class="flex flex-col justify-center items-center">
                                <img
                                    src={authUser()?.user_metadata.avatar_url}
                                    class="w-16 h-16 rounded-full mt-5"
                                    alt="user avatar"
                                />
                                <p class="font-bold text-[var(--color-secondary)]">{authUser()?.user_metadata.full_name}</p>
                            </article>
                            <input
                                type="text"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                class="bg-transparent outline-0 font-bold text-xl w-full"
                                placeholder="¿En que piensas?"
                            />
                        </section>
                        <textarea
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            class="bg-transparent outline-0 font-medium resize-none h-full"
                            placeholder="Escríbelo"
                        />
                    </form>

                </div>
                <Show when={isFocused()}>
                    <Button
                        btnStyle="button-palette"
                        className={"w-[35%] text-xl"}
                        onclick={handleClick}
                    >Crear</Button>
                </Show>
            </Motion.div >
            {/* <Presence exitBeforeEnter>
                <Show when={!visible()} keyed>

                    <Button btnStyle="button-palette" onclick={handleScroll} className="fixed bottom-5 left-1/2 -translate-x-1/2 p-2 w-12 h-12 rounded-full! z-[50]"><i class="fa-solid fa-plus"></i></Button>
                </Show>
            </Presence> */}
        </>
    );
};

export default MyPost;