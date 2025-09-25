

import { authUser } from "~/auth/GetUser"
import { Motion, Presence } from "solid-motionone"
import { createSignal } from "solid-js"
import { JSX, Show } from "solid-js"
import h from "solid-js/h"


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
            }} class=" bg-[var(--surface)]  text-2xl  text-[var(--color-tertiary)] cursor-pointer w-10 h-10 rounded-full" >{props.children}</Motion.button>
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
        }, 4000) as unknown as number;
    };

    return (
        <Motion.nav
            initial={{ height: "2rem" }}
            animate={{ height: active() ? "4rem" : "1rem" }}
            onclick={(event) => {
                event.stopPropagation()
                handleClick()
            }}
            class="bg-[var(--color-primary)] py-2 flex justify-center items-center fixed bottom-0 left-1/2 -translate-x-1/2 p-2 w-[90%] md:w-[60%] rounded-t-3xl! z-[50] overflow-hidden select-none" >

            <Presence exitBeforeEnter>
                <Show when={active()} keyed>
                    <Motion.div
                        initial={{ width: "30%" }}
                        animate={{ width: active() ? "68%" : "30%" }}
                        transition={{ duration: 0.3, easing: [0.34, 1.56, 0.64, 1] }}
                        class="w-full flex justify-between">
                        <NButton redirect=""><i class="fa-solid fa-crown"></i></NButton>
                        <NButton redirect=""><i class="fa-solid fa-gear"></i></NButton>
                        <div class="flex flex-col justify-center items-center relative">
                            <img loading="lazy" class="w-10 h-10 rounded-full" src={authUser()?.user_metadata.avatar_url}></img>
                            <p class="text-xs absolute translate-y-[100%] mt-5 text-[var(--surface)]">LVL 1</p>
                        </div>
                        <NButton redirect="#searchBar"><i class="fa-solid fa-magnifying-glass"></i></NButton>
                        <NButton redirect="#myPost"><i class="fa-solid fa-plus"></i></NButton>
                    </Motion.div>
                </Show>
            </Presence>
        </Motion.nav>
    )
}

export default Navbar