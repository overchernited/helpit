import { createSignal, Show } from "solid-js"
import { twMerge } from "tailwind-merge"
import { Motion } from "solid-motionone"


export const [category, setCategory] = createSignal("general")

interface CategorieProps {
    name: string
    payload: string

}

const Categorie = (Props: CategorieProps) => {

    const handleClick = () => {
        setCategory(Props.payload)
    }


    return (
        <Motion.button
            hover={{ scale: 1.1 }}
            onclick={handleClick} class={twMerge("cursor-pointer text-xs md:text-base justify-center flex w-auto flex-row gap-2 items-center border-2 text-[var(--font-color-alt)] border-[var(--font-color--alt)] rounded-full px-4 py-1", category() === Props.payload && "bg-[var(--font-color-alt)] text-[var(--background)]")}>
            <Show when={category() === Props.payload} fallback={<></>}>
                <li class="fa fa-solid fa-check"></li>
            </Show>
            {Props.name}
        </Motion.button>
    )

}

const Categories = () => {
    return (
        <>
            <p class="font-regular underline text-xl text-center text-[var(--font-color-alt)] my-2">Categorias</p>
            <div class="flex flex-row gap-2 items-center justify-center flex-wrap w-[100vw] md:w-[40vw]">
                <Categorie name="Todas" payload="general" />
                <Categorie name="Discriminación" payload="discrimination" />
                <Categorie name="Discapacidad" payload="disability" />
                <Categorie name="LGBTQ+" payload="lgbtq" />
                <Categorie name="Emergencia" payload="emergency" />
                <Categorie name="Anecdotas" payload="anecdotes" />
                <Categorie name="Desahogo" payload="relief" />
                <Categorie name="Consejos" payload="advice" />
                <Categorie name="Amor" payload="love" />
                <Categorie name="Suicidio" payload="suicide" />
                <Show when={category() == "suicide"}>
                    <h1 class="font-bold text-2xl text-center text-[var(--font-color-alt)]">¡Te recomendamos buscar ayuda profesional, Recuerda que no estas solo! </h1>
                    <p class="text-center text-[var(--font-color-alt-2)]">Linea 106 (CO) & 300 754 8933</p>
                </Show>
            </div>
        </>
    )
}

export default Categories