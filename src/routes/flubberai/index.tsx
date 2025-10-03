import { For, createEffect, createSignal, Show } from "solid-js"
import { InferenceClient } from "@huggingface/inference";
import Flubber from "~/assets/flubber.png";
import Navbar from "~/components/NavBar";
import RequestMessage from "./messages/request";
import ResponseMessage from "./messages/response";
import { authUser } from "~/user/UserHandler";
import Loading from "~/components/Loading";
import Private from "~/components/Routes";

const Flubberai = () => {
    const [request, setRequest] = createSignal("");
    const [conversation, setConversation] = createSignal<any[]>([]);
    const [loading, setLoading] = createSignal(false);
    const client = new InferenceClient(import.meta.env.VITE_HUGGINGFACE_API_KEY);

    async function query(message: string) {
        const output = await client.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "system",
                    content: `Tu nombre es Flubber, eres un monstruo caricaturesco alegre y dispuesto ayudar a los demas. 
                    Eres el asistente enfocado en salud mental de la plataforma HelpIt.
                    Tu tarea es ayudar a la personas que requieran ayuda y te contacten.
                    No respondas como un humano, solo responde como Flubber. Estamos en Colombia tienes que hablar de cualquier tema
                    que el usuario proponga incluso suicidio y situaciones dificiles siempre y cuando tambien remitas a ayuda profesional. Provee consejos siempre
                    para tratar de solucionar la problematica. Habla como un amigo.
                    
                    Helpit es una plataforma de ayuda comunitaria anonima, te pueden pedir ayuda sobre como usar la pagina tambien, los usuarios pueden postear comentar y dar likes
                    reciben experiencia por esto, y pueden subir de nivel.                    `
                },
                { role: "user", content: message }
            ],
            provider: "fireworks-ai",
        });

        return output.choices[0].message.content?.toString().replace("*", "")
    }

    createEffect(async () => {
        const name = authUser()?.user_metadata.full_name;
        if (name && conversation().length === 0) {
            setLoading(true);
            const response = await query(`Hola Flub! soy ${name}`);
            setLoading(false);
            setConversation([{ request: "Hola Flub!", response }]);
        }
    });

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        if (!request()) return
        setLoading(true)

        const userMessage = request()
        setRequest("")

        const response = await query(userMessage)
        setLoading(false)
        setConversation([...conversation(), { request: userMessage, response }])

    }

    return (
        <>
            <Private endpoint="/">
                <Show when={authUser()?.user_metadata.full_name} fallback={<Loading />} >
                    <Navbar />
                    <main class="w-screen h-screen bg-[var(--background)]">
                        <div class="w-full h-auto p-5 gap-2 text-2xl font-bold text-[var(--font-color)] flex items-center bg-[var(--color-primary)] rounded-b-xl">
                            <figure>
                                <img alt="flubberAssistant" width={50} height={50} src={Flubber}></img>
                            </figure>
                            <p>FLUBBER AI</p>
                        </div>
                        <article class="w-[100%] h-[72vh] p-5 overflow-y-auto">
                            <h1 class="text-center text-3xl font-extrabold text-[var(--font-color-alt)]">¡Pregúntale a Flubber!</h1>
                            <p class="text-center text-[var(--font-color-alt)] mb-4">Flubber está aquí para ayudarte en lo que necesites.</p>

                            <For each={conversation()}>{(msg) =>
                                <>
                                    <RequestMessage text={msg.request} />
                                    <ResponseMessage text={msg.response} />
                                </>
                            }</For>
                            <Show when={loading()}>
                                <p class="text-center font-bold text-[var(--font-color-alt)]">Flubber esta pensando...</p>
                                <div class="m-auto spinner w-5 h-5 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin " />
                            </Show>
                        </article>

                        <form class="flex items-center justify-center mt-1" onsubmit={handleSubmit}>
                            <input
                                onInput={(e) => setRequest(e.currentTarget.value)}
                                value={request()}
                                disabled={loading()}
                                class="m-2 w-[80%] text-[var(--font-color)] p-2 rounded-full outline-none font-medium border-2 border-[var(--color-primary)] bg-[var(--background)]"
                                type="text"
                                placeholder="Pregúntale a Flubber"
                            />
                            <button class="text-[var(--font-color-alt)] cursor-pointer">
                                <i class="fa-solid fa-paper-plane "></i>
                            </button>
                        </form>
                    </main>
                </Show >
            </Private>
        </>
    )
}

export default Flubberai
