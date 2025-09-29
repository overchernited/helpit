import { createSignal, JSX, onMount, Show } from "solid-js";


const ExpandedParagraph = (props: { children: JSX.Element }) => {
    const [collapsed, setCollapsed] = createSignal(true);
    const [isClamped, setIsClamped] = createSignal(false);

    let textRef!: HTMLParagraphElement;

    onMount(() => {
        if (textRef.scrollHeight > textRef.clientHeight) {
            setIsClamped(true);
        }
    });

    return (
        <>
            <p class={collapsed() ? "overflow-hidden text-ellipsis line-clamp-3" : ""} ref={textRef}>{props.children}</p>
            <Show when={isClamped()} fallback={<></>}>
                <button class="underline cursor-pointer"
                    onPointerDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onclick={(e) => {
                        e.stopPropagation();
                        setCollapsed(!collapsed());
                    }}>Leer {collapsed() ? "más" : "menos"}</button>
            </Show>
        </>
    )
}

export default ExpandedParagraph