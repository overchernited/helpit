import { JSX, Show } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Motion } from "solid-motionone";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element;
    btnStyle: "button-palette" | "button-steel";
    class?: string;
    isLoading?: boolean;
}

const Button = (props: ButtonProps) => {

    const { btnStyle, class: className, children, ...rest } = props;

    return (
        <Motion.button
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            hover={{ scale: 1.3 }}
            transition={{ easing: [0.34, 1.56, 0.64, 1], duration: 0.4 }}
            class={twMerge(btnStyle, className, "button cursor-pointer")}
            {...rest}
        >
            <Show when={!props.isLoading} fallback={<></>}>
                {children}
            </Show>
            <Show when={props.isLoading} fallback={<></>}>
                <i class="fa-solid fa-spinner animate-spin"></i>
            </Show>
        </Motion.button>
    );
};

export default Button;