import { modal, closeModal } from "~/store/modal";
import { Show, onMount, onCleanup } from "solid-js";
import { Motion, Presence } from "solid-motionone";
const Modal = () => {

    onMount(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (modal().isOpen) {
                closeModal();
            }
        };

        window.addEventListener("popstate", handlePopState);
        onCleanup(() => window.removeEventListener("popstate", handlePopState));
    });

    return (
        <Presence exitBeforeEnter>
            <Show when={modal().isOpen} keyed>
                <Motion.div
                    onclick={(e) => {
                        e.stopPropagation();
                        modal().closeOnForegroundClick && closeModal();
                    }}
                    class={"fixed z-[1000] bg-white/5 backdrop-blur-md w-screen h-screen flex justify-center items-center"}
                >
                    <Motion.div
                        onclick={(e) => e.stopPropagation()}
                        initial={modal().initial}
                        animate={modal().animate}
                        exit={modal().exit}
                        transition={{ duration: 0.3 }}
                        class="w-full md:w-6/12 h-10/12 bg-[var(--background-alt)] rounded-3xl shadow-2xl shadow-zinc-800 p-4 overflow-y-auto"
                    >
                        {modal().content?.()}
                    </Motion.div>
                </Motion.div>
            </Show>
        </Presence>
    );
};

export default Modal;
