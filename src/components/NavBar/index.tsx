

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
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ easing: [0.34, 1.56, 0.64, 1] }}
            onclick={(event) => {
                event.stopPropagation()
                handleClick(event)
            }} class=" bg-[var(--background)] text-2xl text-[var(--font-color-alt)] cursor-pointer w-10 h-10 rounded-full" >{props.children}</Motion.button>
    )
}

const Navbar = () => {


    const [active, setActive] = createSignal(false)
    let timeoutId: number | null = null;

    return (
        <Motion.nav
            initial={{ height: "2rem" }}
            animate={{ height: "4rem" }}
            transition={{ delay: 0.1 }}
            class=" bg-[var(--color-primary)] text-[var(--font-color)] border-[var(--font-color)] border-t-2 border-x-2 py-2 flex justify-center items-center fixed bottom-0 left-1/2 -translate-x-1/2 p-2 w-[90%] md:w-[60%] rounded-t-3xl! z-[50] overflow-hidden select-none" >

            <Presence exitBeforeEnter>
                <Motion.div
                    initial={{ width: "20vh" }}
                    animate={{ width: "40vh" }}
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
                    <NButton redirect="/flubberai"><i class="fa-solid fa-robot"></i></NButton>
                </Motion.div>
            </Presence>
        </Motion.nav>
    )
}

export default Navbar