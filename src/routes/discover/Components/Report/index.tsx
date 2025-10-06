import Input from "~/components/Input"
import { createSignal } from "solid-js"
import ExpandedPost from "../Posts/Post/expandedpost";
import Button from "~/components/Button";
import supa from "~/lib/supabase";
import { setModal } from "~/store/modal";
import { AddNotification } from "~/components/Notifications";


type PostProps = {
    avatar_url: string,
    user_name: string,
    text: string,
    title: string,
    id: string
    user_id: string
};

const Thanks = () => {
    return (
        <div class="h-full w-full flex flex-col justify-center items-center">
            <h1 class="text-6xl font-bold text-white text-center">Gracias por tu reporte!</h1>
            <h2 class="text-4xl font-normal text-white text-center">Ya puedes cerrar esta ventana.</h2>
        </div>
    )
}


const Report = (props: PostProps) => {
    const [inputValue, setInputValue] = createSignal("")
    const [processing, setProcessing] = createSignal(false)

    const handleSubmit = async (e: Event) => {

        e.preventDefault()
        if (!inputValue()) {
            AddNotification({ message: "No puedes dejar campos vacios", title: "Oops!", type: "error", duration: 3000 })
            return
        }
        try {
            setProcessing(true)
            const { error } = await supa.from("reports").insert({
                post_id: props.id,
                content: inputValue(),
                status: "pending"
            })
            if (error) {
                console.error(error)
                return
            }
            setInputValue("")
            setProcessing(false)
            setModal({ isOpen: true, content: () => <Thanks /> })

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <ExpandedPost {...props} informative />"
            <form onSubmit={(e: Event) => handleSubmit(e)} class="w-full h-[60%] flex flex-col items-center gap-5">
                <h1 class="text-3xl font-bold text-white">¡Ayuda a que HelpIt sea mejor!</h1>
                <textarea value={inputValue()} class="h-full w-[80%] palette-gradient rounded-2xl p-2 outline-none" onInput={(e) => setInputValue(e.currentTarget.value)} placeholder="¿Qué es lo que quieres reportar?" />
                <Button isLoading={processing()} btnStyle="button-palette" class="w-[10rem] text-3xl" type="submit">Reportar</Button>
            </form>

        </>
    )
}

export default Report