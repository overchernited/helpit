import { createSignal } from "solid-js"
import { Motion } from "solid-motionone"

const SearchBar = () => {
    const [isFocused, setFocus] = createSignal(false);

    return (
        <Motion.div
            animate={{
                scale: isFocused() ? 1.2 : 1,
            }}
            id="searchBar"
            class="palette-gradient rounded-2xl h-[5vh] w-[50vw] my-5 p-5 flex flex-row items-center gap-2" >
            <i class="fa-solid fa-magnifying-glass text-palette-gradient"></i>
            <input type="text" onblur={() => { setFocus(false) }} onfocus={() => { setFocus(true) }} placeholder="Buscar..." class="outline-none w-full text-[var(--color-primary)] font-bold" />
        </Motion.div >
    )
}

export default SearchBar