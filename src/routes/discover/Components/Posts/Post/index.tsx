import { Motion } from "solid-motionone"
import { createSignal, onCleanup, onMount, Show } from "solid-js"
import party from "party-js";
import { twMerge } from "tailwind-merge";
import { JSX } from "solid-js";



type Props = {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
};

const ExpandedParagraph = (props: { children: JSX.Element }) => {
    const [collapsed, setCollapsed] = createSignal(true);
    const [isClamped, setIsClamped] = createSignal(false);

    let textRef!: HTMLParagraphElement;

    onMount(() => {
        if (textRef.scrollHeight > textRef.clientHeight) {
            setIsClamped(true);
        }
    });

    return (
        <>
            <p class={collapsed() ? "overflow-hidden text-ellipsis line-clamp-3" : ""} ref={textRef}>{props.children}</p>
            <Show when={isClamped()} fallback={<></>}>
                <button class="underline cursor-pointer"
                    onPointerDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onclick={(e) => {
                        e.stopPropagation(); // <- evita que el swipe del padre interfiera
                        setCollapsed(!collapsed());
                    }}>Leer {collapsed() ? "más" : "menos"}</button>
            </Show>
        </>
    )
}

const Post = (props: Props) => {
    const [visible, setVisible] = createSignal(false);
    const [heart, setHeart] = createSignal(false);
    const [comment, setComment] = createSignal(false);
    const [dir, setDir] = createSignal<string>("");

    let ref!: HTMLDivElement;
    let cardRef!: HTMLDivElement;
    let BtnRef: HTMLButtonElement | undefined;

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

    const handleHeart = () => {
        setHeart(prev => {
            const newState = !prev;
            if (newState) {
                throwConfetti();
            }
            return newState;
        });
    };

    const handleComment = () => { }

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let isSwiping = false;
    let startTime = 0;

    const MIN_SWIPE_DISTANCE = 80; // más alto para evitar falsos positivos
    const MIN_SWIPE_TIME = 120;    // ms

    const isInteractiveElement = (el: EventTarget | null) => {
        if (!(el instanceof HTMLElement)) return false;
        return ["BUTTON", "A", "INPUT", "TEXTAREA"].includes(el.tagName);
    };

    const handlePointerDown = (e: PointerEvent) => {
        if (isInteractiveElement(e.target)) return; // no empezar swipe en botones
        startX = e.clientX;
        startY = e.clientY;
        startTime = Date.now();
        isSwiping = false;
        const target = e.currentTarget as HTMLDivElement;
        target.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
        endX = e.clientX;
        endY = e.clientY;

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        // Solo marcar swipe si es claramente horizontal
        if (!isSwiping && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
            isSwiping = true;
        }
    };

    const handlePointerUp = (e: PointerEvent) => {
        if (!isSwiping) return;

        // Evitar swipe si el pointerUp fue sobre un botón/link
        if (isInteractiveElement(e.target)) return;

        const deltaX = endX - startX;
        const elapsed = Date.now() - startTime;

        if (elapsed < MIN_SWIPE_TIME) return;

        if (deltaX < -MIN_SWIPE_DISTANCE) {
            setDir("left");
            handleHeart();
        }

        setTimeout(() => setDir(""), 200);
    };

    return (
        <Motion.div
            ref={(el) => { ref = el; }}
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{
                opacity: visible() ? 1 : 0,
                scale: visible() ? 1 : 0.5,
                y: visible() ? 0 : 50,
            }}
            transition={{ duration: 0.6, easing: [0.34, 1.56, 0.64, 1] }}
            class="w-full h-auto flex-row flex justify-center items-center"
        >

            <div
                ref={cardRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                class={twMerge(
                    "w-full palette-gradient rounded-md flex flex-row justify-center gap-5 shadow-xl shadow-zinc-400 transition-all touch-pan-y select-none",
                    dir() === "left" ? "-translate-x-50" : dir() === "right" ? "" : ""
                )}
            >

                <main class="flex flex-col w-full relative">
                    <article class="flex-row flex justify-between gap-5 p-5">

                        <section class="flex flex-col w-full">
                            <article class="flex flex-row items-center gap-5">
                                <section class="flex flex-col justify-center items-center">
                                    <img
                                        src="/avatars/avatar1.jpg"
                                        alt=""
                                        class="rounded-full w-16 h-16"
                                    />
                                    <p class="font-bold text-[var(--color-secondary)]">fastduck98</p>
                                </section>
                                <h1 class="font-bold text-2xl w-full">Soy un titulo!</h1>
                            </article>
                            <ExpandedParagraph>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat magnam quos autem! Cum sunt libero nobis perferendis hic, commodi, explicabo similique minus ullam quae adipisci, fuga optio perspiciatis iusto unde. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod ullam similique distinctio fugit inventore rem, perspiciatis nostrum aut minima assumenda, totam iusto laborum nobis dolore! Architecto mollitia harum recusandae omnis?</ExpandedParagraph>
                        </section>

                    </article>

                    <section class="flex justify-center items-center gap-5 w-[95%] m-auto text-xl border-t-2 border-[var(--surface-alt)] p-2">
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
                            <span>0</span>
                        </Motion.button>
                        <button class="flex items-center gap-2 cursor-pointer" onclick={handleComment}>
                            <i class="fa-regular fa-comment"></i>
                            <span>0</span>
                        </button>
                    </section>
                </main>

                <Motion.aside
                    initial={{ width: 0, visibility: "hidden" }}
                    animate={dir() === "left" ? { width: "30%", visibility: "visible" } : { width: 0, visibility: "hidden" }}
                    transition={{ duration: 0.3 }}
                    class={"flex flex-col text-2xl justify-center right-0 h-full absolute items-center bg-red-600 text-white rounded-r-md xl"} >
                    <i class="fa-solid fa-heart"></i>
                </Motion.aside>
            </div>
        </Motion.div >
    );
};

export default Post;
