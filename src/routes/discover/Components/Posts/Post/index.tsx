import { Motion } from "solid-motionone"
import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js"
import party from "party-js";
import { twMerge } from "tailwind-merge";
import { JSX } from "solid-js";
import supa from "~/lib/supabase";
import { authUser, giveXp } from "~/user/UserHandler";
import { modal, openModal, setModal } from "~/store/modal";
import ExpandedParagraph from "../ExpandedParagraph";
import ExpandedPost from "./expandedpost";



type Props = {
    avatar_url: string,
    user_name: string,
    text: string,
    title: string,
    id: string
    user_id: string
};



const Post = (props: Props) => {
    const [visible, setVisible] = createSignal(false);
    const [heart, setHeart] = createSignal(false);
    const [comments, setComments] = createSignal(0);

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
                const { data, error } = await supa.from("hearts").insert({
                    post_id: props.id,
                    owner_id: props.user_id,
                })


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

    const getComments = async () => {
        try {
            const { error, data } = await supa.from("comments").select("*").eq("post_id", props.id)
            if (error) {
                console.log(error)
                return
            }
            setComments(data.length)
        } catch (error) {
            throw error
            console.log(error)
        }
    }

    const getHearts = async () => {
        try {
            const { error, data } = await supa.from("hearts").select("*").eq("post_id", props.id)
            if (error) {
                console.log(error)
                return
            }
            setReactiveHearts(data.length)
        }
        catch (error) {
            throw error
            console.log(error)
        }
    }

    const getState = async () => {
        try {
            const { error, data } = await supa.from("hearts").select("*").eq("id", authUser()?.id).eq("post_id", props.id)
            if (error) {
                console.log(error)
                return
            }
            console.log(data)

            if (data.length > 0) {
                setHeart(true)
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    onMount(async () => {
        await getState()
        await getComments()
        await getHearts()
    })


    return (
        <Motion.div
            ref={(el) => { ref = el; }}
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{
                opacity: visible() ? 1 : 0,
                scale: visible() ? 1 : 0.5,
                y: visible() ? 0 : 50,
            }}
            class="shadow-xl w-full palette-gradient shadow-zinc-400 rounded-md bg-[--surface-alt] flex flex-col items-center ">
            <div
                ref={cardRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                class={twMerge(
                    "w-full rounded-md bg-[var(--surface)] flex flex-row justify-center gap-5  transition-all touch-pan-y select-none",
                    dir() === "left" ? "-translate-x-50" : "translate-x-0",
                )}
            >

                <main class="flex flex-col w-full relative">
                    <article class="flex-row flex justify-between gap-5 p-5">

                        <section class="flex flex-col w-full">
                            <article class="flex flex-row items-center gap-5">
                                <section class="flex flex-col justify-center items-center">
                                    <img
                                        onPointerDown={
                                            (e) => {
                                                e.preventDefault();
                                                window.location.href = `/users/${props.user_id}`
                                            }
                                        }
                                        src={props.avatar_url}
                                        alt=""
                                        class="rounded-full w-16 h-16 cursor-pointer"
                                    />
                                    <p class="font-bold text-[var(--color-secondary)]">{props.user_name}</p>
                                </section>
                                <h1 class="font-extrabold text-2xl w-full">{props.title}</h1>
                            </article>
                            <ExpandedParagraph>{props.text}</ExpandedParagraph>
                        </section>

                    </article>

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
                    animate={heart() ? { scale: [0.5, 1], color: "red" } : { color: "var(--color-secondary)" }}
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
            </section>
        </Motion.div >
    );
};

export default Post;
