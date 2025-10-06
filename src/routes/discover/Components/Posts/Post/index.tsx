import { Motion, Presence } from "solid-motionone"
import { createSignal, onCleanup, onMount, Show } from "solid-js"
import party from "party-js";
import { twMerge } from "tailwind-merge";
import supa from "~/lib/supabase";
import { authUser, giveXp } from "~/user/UserHandler";
import { openModal } from "~/store/modal";
import ExpandedParagraph from "../ExpandedParagraph";
import ExpandedPost from "./expandedpost";
import { AddNotification } from "~/components/Notifications";
import Report from "../../Report";



type Props = {
    avatar_url: string,
    user_name: string,
    text: string,
    title: string,
    id: string,
    category: string,
    user_id: string
};



const Post = (props: Props) => {
    const [visible, setVisible] = createSignal(false);
    const [heart, setHeart] = createSignal(false);
    const [comments, setComments] = createSignal(0);
    const [deleted, setDeleted] = createSignal(false);

    const [reactiveHearts, setReactiveHearts] = createSignal(0);
    const [processing, setProcessing] = createSignal(false)

    const [dir, setDir] = createSignal<string>("");


    //SWIPE SHORTCUT
    let swipeActive = false;
    let pointerStartedOnInteractive = false;
    let startX = 0;
    let startY = 0;
    let isSwiping = false;
    let startTime = 0;

    const MIN_SWIPE_DISTANCE = 80;


    let ref!: HTMLDivElement;
    let cardRef!: HTMLDivElement;
    let BtnRef: HTMLButtonElement | undefined;

    const isInteractiveElement = (el: EventTarget | null) => {
        if (!(el instanceof HTMLElement)) return false;
        return ["BUTTON", "A", "INPUT", "TEXTAREA"].includes(el.tagName);
    };

    const handlePointerDown = (e: PointerEvent) => {
        pointerStartedOnInteractive = isInteractiveElement(e.target);
        if (pointerStartedOnInteractive) return;
        startX = e.clientX;
        startY = e.clientY;
        startTime = Date.now();
        isSwiping = false;
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    };


    const handlePointerMove = (e: PointerEvent) => {
        if (isInteractiveElement(e.target)) {
            isSwiping = false;
            swipeActive = false;
            return;
        }
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        if (!isSwiping && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
            isSwiping = true;
            swipeActive = true;
        }
    };

    const handlePointerUp = (e: PointerEvent) => {
        if (pointerStartedOnInteractive) {
            pointerStartedOnInteractive = false;
            return;
        }

        if (!isSwiping) return;

        const deltaX = e.clientX - startX;
        if (deltaX < -MIN_SWIPE_DISTANCE) {
            if (processing()) return
            setDir("left");
            handleHeart();
        }

        setTimeout(() => setDir(""), 200);
        setTimeout(() => swipeActive = false, 300);
    };

    const throwConfetti = () => {
        if (BtnRef) {
            party.confetti(BtnRef, {
                count: party.variation.range(20, 50),
                spread: 100,
                size: party.variation.range(1, 2),
            });
        }
    };

    onMount(() => {


        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (ref) observer.observe(ref);
        onCleanup(() => observer.disconnect());


    });


    const handleCloudHeart = {
        async plus() {
            try {
                setProcessing(true);
                setReactiveHearts(prev => prev + 1);
                await giveXp(10)
                const { error: insertError } = await supa.from("hearts").insert({
                    post_id: props.id,
                    owner_id: props.user_id,
                })

                if (insertError) {
                    AddNotification({ message: "Hubo un error, inténtalo mas tarde.", title: "Oops!", type: "error", duration: 3000 })
                    return;
                }

                if (authUser()?.id === props.user_id) return

                const { error: notificationError } = await supa.from("notifications").insert({
                    from_id: authUser()?.id,
                    from_avatar: authUser()?.user_metadata.avatar_url,
                    title: `${authUser()?.user_metadata.full_name} le agrada tu publicación.`,
                    to_id: props.user_id,
                    type: "heart",
                    post_id: props.id
                })

                if (notificationError) {
                    AddNotification({ message: "Hubo un error, inténtalo mas tarde.", title: "Oops!", type: "error", duration: 3000 })
                    return;
                }

            } catch (err) {
                console.error("Error inesperado:", err);
            }
            finally {
                setProcessing(false);
            }
        },

        async minus() {
            try {

                setReactiveHearts(prev => prev - 1);
                const { data, error } = await supa.from("hearts").delete().eq("post_id", props.id).eq("id", authUser()?.id)

                if (error) {
                    console.error(error);
                    return;
                }


            } catch (err) {
                console.error("Error inesperado:", err);
            }
            finally {
                setProcessing(false);
            }
        }
    };

    const handleHeart = async () => {
        if (processing()) return;
        setProcessing(true);

        try {

            setHeart(prev => {
                const newState = !prev;
                if (newState) {
                    throwConfetti();
                    handleCloudHeart.plus()
                } else {
                    handleCloudHeart.minus();
                }
                return newState;
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleComment = () => {
        openModal({ content: () => <ExpandedPost {...props} /> })
    }

    const handleDelete = async () => {
        try {
            const { error } = await supa.from("posts").delete().eq("id", props.id)

            if (error) {
                console.error(error)
                return
            }

            setDeleted(true)


        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const getComments = async () => {
        try {
            const { error, data } = await supa.from("comments").select("*").eq("post_id", props.id)
            if (error) {
                console.error(error)
                return
            }
            setComments(data.length)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const getHearts = async () => {
        try {
            const { error, data } = await supa.from("hearts").select("*").eq("post_id", props.id)
            if (error) {
                console.error(error)
                return
            }
            setReactiveHearts(data.length)
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }

    const getState = async () => {
        try {
            const { error, data } = await supa.from("hearts").select("*").eq("id", authUser()?.id).eq("post_id", props.id)
            if (error) {
                console.error(error)
                return
            }

            if (data.length > 0) {
                setHeart(true)
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const handleReport = () => {
        openModal({ content: () => <Report {...props} /> })
    }



    onMount(async () => {
        await getState()
        await getComments()
        await getHearts()
    })

    const length = props.title.length

    let fontSize = Math.max(18, 28 - length * 0.1);

    return (
        <Presence exitBeforeEnter>
            <Show when={!deleted()}>
                <Motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={{
                        opacity: visible() ? 1 : 0,
                        scale: visible() ? 1 : 0.5,
                        y: visible() ? 0 : 50,
                    }}
                    exit={{ opacity: 0, x: 200 }}
                    class="select-none shadow-lg w-full text-[var(--font-color-alt-2)] palette-gradient shadow-[color:var(--color-primary)] rounded-lg flex flex-col items-center ">
                    <div
                        ref={cardRef}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        class={twMerge(
                            "w-full rounded-md bg-[var(--background)] flex flex-row justify-center gap-5  transition-all touch-pan-y select-none",
                            dir() === "left" ? "-translate-x-50" : "translate-x-0",
                        )}
                    >

                        <main class="flex flex-col w-full relative">
                            <section class="flex flex-col w-full p-2">
                                <article class="flex flex-col items-start gap-2">
                                    <section class="flex flex-row justify-between items-center gap-3 w-full">
                                        <div class="w-[80%] flex flex-row items-center gap-2">
                                            <img
                                                src={props.avatar_url}
                                                alt={`${props.user_name} avatar`}
                                                class="rounded-full w-16 h-auto object-cover "
                                            />
                                            <a href={`/users/${props.user_id}`} class={twMerge("font-bold break-all md:break-normal cursor-pointer text-lg underline inline-block", props.user_name === authUser()?.user_metadata.full_name ? "text-[var(--color-primary)]" : "")}>{props.user_name}</a>
                                        </div>
                                        <div class="border-2 border-[var(--font-color-alt)] px-2 w-auto text-center rounded-full text-[var(--font-color-alt)]">{props.category}</div>
                                    </section>


                                    <h1 style={{ "font-size": `${fontSize}px` }} class={`font-extrabold w-full`}>{props.title}</h1>
                                </article>
                                <ExpandedParagraph>{props.text}</ExpandedParagraph>
                            </section>
                        </main>

                    </div>
                    <Motion.aside
                        initial={{ width: 0 }}
                        animate={dir() === "left" ? { width: "30%" } : { width: 0 }}
                        transition={{ duration: 0.3 }}
                        class={"flex flex-col text-2xl justify-center right-0 h-full absolute items-center bg-red-600 text-white rounded-r-md xl"} >
                        <Motion.i
                            initial={{ width: 0, opacity: 0 }}
                            animate={dir() === "left" ? { opacity: 1 } : { opacity: 0 }}
                            class="fa-solid fa-heart"></Motion.i>
                    </Motion.aside>
                    <section class="flex flex-row justify-center items-center gap-5 w-full h-5  text-xl shadow-2xl p-5">
                        <Motion.button
                            ref={BtnRef}
                            animate={heart() ? { scale: [0.5, 1], color: "red" } : { color: "var(--font-color-alt-2)" }}
                            transition={{ duration: 0.3, easing: [0.34, 1.56, 0.64, 1] }}
                            class="flex items-center gap-2 cursor-pointer"
                            onPointerDown={(e) => e.stopPropagation()}
                            onTouchStart={(e) => e.stopPropagation()}
                            onclick={(e) => {
                                e.stopPropagation();
                                handleHeart();
                            }}>
                            <i class={heart() ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                            <span>{reactiveHearts()}</span>
                        </Motion.button>
                        <button class="flex items-center gap-2 cursor-pointer" onclick={handleComment}>
                            <i class="fa-regular fa-comment"></i>
                            <span>{comments()}</span>
                        </button>
                        <Show when={authUser() && authUser()?.id === props.user_id}>
                            <button class="flex items-center gap-2 cursor-pointer text-red-600" onclick={handleDelete}>
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </Show>
                        <Show when={authUser()?.id !== props.user_id}>
                            <button class="flex items-center gap-2 cursor-pointer text-red-600" onclick={handleReport}>
                                <i class="fa-solid fa-triangle-exclamation"></i>
                            </button>
                        </Show>
                    </section>
                </Motion.div >
            </Show>
        </Presence>
    );
};

export default Post;
