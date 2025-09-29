import { createSignal, createMemo, For } from "solid-js";
import Input from "~/components/Input";
import DynamicBackground from "~/components/DynamicBackground";
import { Motion } from "solid-motionone";
import Button from "~/components/Button";
import brand from "~/assets/branding/brandnegative.png";
import flubber from "~/assets/flubber.png";
import supa from "~/lib/supabase";
import { AddNotification } from "~/components/Notifications";

const Login = () => {
    const [username, setUsername] = createSignal("");

    // Array de signals para cada keyword
    const [keywordsSignals] = createSignal([
        createSignal(""),
        createSignal(""),
        createSignal(""),
        createSignal("")
    ]);

    // Concatenar todas las keywords
    const allKeywords = createMemo(() =>
        keywordsSignals().map(([keyword]) => keyword()).join("")
    );


    const Login = async () => {
        try {
            const { error } = await supa.auth.signInWithPassword({
                email: `${username().toLowerCase()}@helpit.com`,
                password: allKeywords()
            })

            if (error) {
                console.error(error);
                return
            }
        } catch (error) {
            console.error(error);
            return
        }
    }
    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (username() && allKeywords()) {
            Login();
        } else {
            AddNotification({ message: "No puedes dejar campos vacios", title: "Oops!", type: "error", duration: 3000 })
        }
    };

    return (
        <>
            <div
                class="flex justify-between items-center w-screen h-screen gap-5"
            >
                <Motion.div
                    initial={{ width: "100vw" }}
                    animate={{ width: "60vw" }}
                    class="h-full justify-center items-center rounded-2xl p-5 flex flex-col">
                    <h1 class="text-left bg-[var(--color-primary)] p-2 text-4xl my-2 rounded-md font-bold text-[var(--surface)]">¡Bienvenido de vuelta!</h1>
                    <h2 class="text-left text-md font-medium text-[var(--color-secondary)]">
                        Espero recuerdes tus credenciales! 🙌🏻
                    </h2>

                    <form onSubmit={handleSubmit} class="flex items-center w-[29vw] flex-col gap-5 my-2 px-5">
                        <div class="w-full">
                            <label for="username" class="font-medium">Nombre de usuario:</label>
                            <Input
                                placeholder="Ej: flavorousCake28"
                                value={username}
                                onInput={setUsername}
                            />
                        </div>
                        <div>
                            <label for="username" class="font-medium">Palabras clave</label>
                            <div class="flex flex-row items-center gap-2">
                                <For each={keywordsSignals()}>
                                    {([keyword, setKeyword], i) => (
                                        <Input
                                            placeholder={`palabra ${i() + 1}`}
                                            value={keyword}
                                            onInput={setKeyword}
                                            class="w-30"
                                        />
                                    )}
                                </For>
                            </div>
                        </div>

                        <section class="flex flex-col gap-2 justify-center items-center">
                            <Button btnStyle="button-palette" class="w-[14rem] text-xl">
                                Continuar
                            </Button>
                            <a href="/" class="text-[var(--color-primary)] underline">No tengo una cuenta</a>
                        </section>
                    </form>
                </Motion.div>
                <Motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "50vw" }}
                    transition={{ duration: 0.3 }}
                    class="bg-[var(--color-primary)] h-full flex flex-col justify-center items-center">
                    <Motion.section
                        initial={{ opacity: 0, visibility: "hidden" }}
                        animate={{ opacity: 1, visibility: "visible" }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        class="justify-center items-center flex flex-col"
                    >
                        <img alt="brand" height={500} width={500} src={brand}></img>
                        <p class="font-bold text-3xl text-white">De todxs para todxs.</p>
                        <img alt="flubber" height={300} width={300} src={flubber}></img>
                    </Motion.section>

                </Motion.div>
            </div>
        </>
    );
};

export default Login;
