import { For } from "solid-js";
import { Motion } from "solid-motionone";


interface StepsProps {
    steps?: number;
    completed?: number;
}

const Steps = (props: StepsProps) => {
    return (
        <div class="flex gap-2">
            <For each={Array.from({ length: props.completed ?? 0 })}>
                {() => <Motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    transition={{ easing: [0.34, 1.56, 0.64, 1], duration: 0.4 }}
                    class="w-4 h-4 rounded-full bg-[var(--font-color-alt)]"></Motion.div>}
            </For>

            <For each={Array.from({ length: (props.steps ?? 3) - (props.completed ?? 0) })}>
                {() => (
                    <Motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 0.5, opacity: 1 }}
                        transition={{ easing: [0.34, 1.56, 0.64, 1], duration: 0.2 }}
                        class="w-4 h-4 rounded-full bg-transparent border-2 border-[var(--font-color-alt)]"></Motion.div>
                )}
            </For>
        </div>
    );
};


export default Steps;