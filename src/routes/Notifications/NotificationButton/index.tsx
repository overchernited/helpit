import supa from "~/lib/supabase";


const NotificationsButton = () => {

    const getNotifications = () => {
        try {

        } catch (error) {
            return 0;
        }
    }


    return (
        <div class="m-2 absolute top-0 right-0 text-2xl text-[var(--font-color-alt)]">
            <a href="/notifications" class="cursor-pointer"><i class="fa-solid fa-bell"></i></a>
        </div>
    )
}

export default NotificationsButton