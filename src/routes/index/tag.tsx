import { JSX } from "solid-js";

interface Props {
    children: JSX.Element;
}

const KeywordTag = (props: Props) => {
    return (
        <div class="palette-gradient text-center rounded-lg text-[var(--font-color-alt)] p-1">
            {props.children}
        </div>
    )
}

export default KeywordTag