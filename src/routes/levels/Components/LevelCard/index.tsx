import { onMount, Show } from "solid-js"
import { JSX } from "solid-js"
import { twMerge } from "tailwind-merge"
import { authUser } from "~/user/UserHandler"
import { Motion } from "solid-motionone"

interface LevelCardProps {
    levelName: string,
    achievmentMedal?: string
    minLVL: number
    children: JSX.Element
}

const LevelCard = (props: LevelCardProps) => {

    return (
        <Show when={authUser()}>
            <Motion.article
                initial={{ scale: 0.5, opacity: 0 }}
                hover={{ scale: 1.2 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.5
                }}
                class={twMerge("flex items-center rounded-2xl text-[var(--font-color)] p-2 flex-col w-96 h-[24rem] my-2", authUser()?.user_metadata.level >= props.minLVL ? "grayscale-0" : "grayscale-100")}>
                < img alt="Level Banner" class="rounded-2xl" src="https://external-preview.redd.it/i-hired-an-artist-to-make-steam-capsule-and-im-amazed-by-v0-2UJxpu3RxK0tUljIQJ9e2wi0nT50rEGBeNCvMM1qs-g.jpg?auto=webp&s=dfc40aeef2dfd55d23075613ead3e3acd7be54cc" />
                <article class="flex flex-col justify-center items-center">
                    <section class="flex flex-row items-center text-center w-full h-full">
                        <h1 class="text-3xl font-bold">{props.levelName}</h1>
                        <Show when={props.achievmentMedal} fallback={<></>}>
                            <img class="w-auto h-14" alt="achievment medal" src={`achievements/${props.achievmentMedal}.png`}></img>
                        </Show>
                    </section>
                </article>
                <section class="text-lg p-p list-disc">{props.children}</section>
            </Motion.article >
        </Show>
    )
}

export default LevelCard