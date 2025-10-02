import { Motion } from "solid-motionone";
import { JSX, createSignal } from "solid-js";
import { twMerge } from "tailwind-merge";

interface Props {
  placeholder?: string;
  type?: string;
  class?: string;
  value: () => string;
  onInput: (val: string) => void;
}

const Input = (props: Props): JSX.Element => {
  const [focused, setFocused] = createSignal(false);

  return (
    <Motion.div
      initial={{ scale: 1 }}
      animate={{ scale: focused() ? 1.1 : 1 }}
      transition={{ duration: 0.3, easing: [0.34, 1.56, 0.64, 1] }}
      class={twMerge("relative w-full flex flex-col items-start", props.class)}>
      <input
        type={props.type || "text"}
        placeholder={props.placeholder || ""}
        class="palette-gradient p-2 rounded-md w-full outline-none font-medium text-[var(--font-color-alt)]"
        value={props.value()}
        onInput={(e) => props.onInput(e.currentTarget.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <Motion.div
        class="absolute bottom-0 left-0 h-[4px] bg-[var(--color-primary)] rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: focused() || props.value() ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </Motion.div>
  );
};

export default Input;
