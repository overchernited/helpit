import { Motion, } from "solid-motionone"
import { createSignal, onCleanup, onMount } from "solid-js";

interface Notification {
    notification_id: string
    type: string
    title: string
    to_id: string
    post_id: string
    from_id: string
    from_avatar: string
}


const UserNotifications = (props: Notification) => {

    const [visible, setVisible] = createSignal(false);
    let ref!: HTMLDivElement


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


    return (
        <Motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={visible() ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            class="bg-[var(--color-primary)] min-h-5 h-auto w-[90%] md:w-[40%] p-4 text-[var(--font-color)] relative rounded-3xl">
            <section class="flex flex-rown items-center gap-3">
                <img onclick={() => { window.location.href = `/users/${props.from_id}` }} alt={`${props.from_id} avatar`} class="w-12 h-12 rounded-full cursor-pointer" src={props.from_avatar}></img>
                <i class={`text-[var(--font-color)] text-2xl fa-solid fa-${props.type}`}></i>
                <a class="underline text-xl" href={`/discover?post_id=${props.post_id}`}>{props.title}</a>
            </section>
        </Motion.div>
    )
}

export default UserNotifications