import { JSX } from "solid-js";

interface Props {
    children: JSX.Element;
}

const KeywordTag = (props: Props) => {
    return (
        <div class="palette-gradient text-center rounded-lg  p-1">
            {props.children}
        </div>
    )
}

export default KeywordTag