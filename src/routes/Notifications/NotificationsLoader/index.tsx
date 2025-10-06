import { onMount, createSignal, For, createEffect, Show } from "solid-js"
import Private from "~/components/Routes"
import supa from "~/lib/supabase"
import { authUser } from "~/user/UserHandler"
import UserNotifications from "../userNotification"


interface Notification {
    notification_id: string
    type: string
    title: string
    to_id: string
    post_id: string
    from_id: string
    from_avatar: string
}
const NotificationsLoader = () => {
    const [notifications, setNotifications] = createSignal<Notification[]>([])

    const getNotifications = async () => {
        try {
            const { data, error } = await supa.from("notifications").select("*").eq("to_id", authUser()?.id).order("created_at", { ascending: false });
            if (error) {
                console.error(error);
                return;
            }
            setNotifications(data);
        } catch (error) {
            console.error(error);
        }
    }

    createEffect(() => {
        getNotifications();
    })

    return (
        <div class="flex flex-col h-full w-full items-center justify-center gap-5 m-5">
            <Show when={notifications().length > 0} fallback={<h1 class="text-2xl font-bold text-[var(--font-color-alt)]">No tienes notificaciones aún</h1>}>
                <For each={notifications()}>{notification => <UserNotifications {...notification} />}</For>

            </Show>
        </div>

    )
}

export default NotificationsLoader