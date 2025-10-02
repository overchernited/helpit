

import { authUser } from "~/user/UserHandler"
import { Motion, Presence } from "solid-motionone"
import { createSignal, onMount } from "solid-js"
import { JSX, Show } from "solid-js"


const NButton = (props: { children?: JSX.Element, redirect: string }) => {

    const handleClick = (e: MouseEvent) => {
        if (props.redirect.startsWith("#")) {
            e.preventDefault();
            const id = props.redirect.substring(1);
            const element = document.querySelector("#" + id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        } else {
            window.location.href = props.redirect
        }
    };

    return (
        <Motion.button
            hover={{ scale: 1.3 }}
            onclick={(event) => {
                event.stopPropagation()
                handleClick(event)
            }} class=" bg-[var(--background)] text-2xl text-[var(--font-color-alt)] cursor-pointer w-10 h-10 rounded-full" >{props.children}</Motion.button>
    )
}

const Navbar = () => {


    const [active, setActive] = createSignal(false)
    let timeoutId: number | null = null;

    const handleClick = () => {
        setActive(!active());
        if (active() === false) {
            if (timeoutId) clearTimeout(timeoutId);
            return;
        }
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            setActive(false);
            timeoutId = null;
        }, 5000) as unknown as number;
    };

    onMount(() => {
        handleClick()
    });

    return (
        <Motion.nav
            initial={{ height: "4rem" }}
            animate={{ height: active() ? "4rem" : "1.5rem" }}
            onclick={(event) => {
                event.stopPropagation()
                handleClick()
            }}
            class="cursor-pointer bg-[var(--color-primary)] text-[var(--font-color)] border-[var(--font-color)] border-t-2 border-x-2 py-2 flex justify-center items-center fixed bottom-0 left-1/2 -translate-x-1/2 p-2 w-[90%] md:w-[60%] rounded-t-3xl! z-[50] overflow-hidden select-none" >

            <Presence exitBeforeEnter>
                <Show when={active()} keyed>
                    <Motion.div
                        initial={{ width: "30%" }}
                        animate={{ width: active() ? "40vh" : "30%" }}
                        transition={{ duration: 0.3, easing: [0.34, 1.56, 0.64, 1] }}
                        class="w-full flex justify-between">
                        <NButton redirect="/levels"><i class="fa-solid fa-crown"></i></NButton>
                        <NButton redirect="/settings"><i class="fa-solid fa-gear"></i></NButton>
                        <div class="flex flex-col justify-center text-[var(--font-color)] items-center relative">
                            <img
                                onpointerdown={(e) => {
                                    e.stopPropagation();
                                    window.location.href = `/users/${authUser()?.id}`
                                }}
                                loading="lazy"
                                class="w-auto object-cover h-10 rounded-full cursor-pointer" src={authUser()?.user_metadata.avatar_url}></img>
                            <p class="text-xs absolute translate-y-[100%] mt-5">LVL {authUser()?.user_metadata.level}</p>
                        </div>
                        <NButton redirect="/discover"><i class="fa-solid fa-magnifying-glass"></i></NButton>
                        <NButton redirect="/discover"><i class="fa-solid fa-plus"></i></NButton>
                    </Motion.div>
                </Show>
            </Presence>
        </Motion.nav>
    )
}

export default Navbar