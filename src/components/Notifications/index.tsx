import { createSignal, For } from "solid-js";
import { Motion, Presence } from "solid-motionone";

const [notifications, setNotifications] = createSignal<Notification[]>([]);

interface Notification {
    type: "success" | "error" | "congratulations";
    id?: number;
    title: string;
    message: string;
    duration: number;
}

export const AddNotification = (props: Notification) => {
    const id = Date.now();
    const newNotification = { ...props, id };
    setNotifications([...notifications(), newNotification]);
    setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, props.duration);
};

const Notifications = () => {

    return (


        <div class="fixed top-0 left-0 m-4 flex flex-col gap-2 h-full z-[10000]">
            <For each={notifications()} >
                {(notification) => (

                    <Motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.3 }}

                        class={`w-auto h-auto p-4 origin-left rounded shadow ${notification.type}`}
                    >

                        <div class="w-full h-full">
                            <h1 class="font-extrabold text-left text-2xl w-full">{notification.title}</h1>
                            <p class="text-left">{notification.message}</p>
                        </div>
                        <Motion.div
                            initial={{ width: 0, opacity: 1 }}
                            animate={{ width: "100%", opacity: 1 }}
                            transition={{ duration: notification.duration / 1000, easing: "linear" }}
                            class="flex justify-end h-[3px] bg-white" />
                    </Motion.div>
                )}
            </For>
        </div >
    );
}

export default Notifications;
