import { JSX } from "solid-js";
import { twMerge } from "tailwind-merge"
import { Motion } from "solid-motionone"
import { createSignal } from "solid-js";


interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element,
    btnStyle: "button-palette" | "button-steel",
    className?: string,
}


const Button = (props: ButtonProps) => {
    const { children, className, btnStyle, ...rest } = props;

    return (
        <>

            <Motion.button
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                class={twMerge(btnStyle, className, "button")}
                hover={{ scale: 1.3 }}
                transition={{ easing: [0.34, 1.56, 0.64, 1], duration: 0.4 }}


                {...rest}
            >
                {props.children}
            </Motion.button>
        </>
    );
}

export default Button;