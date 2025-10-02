import { createSignal, onMount, Show } from "solid-js";
import { Motion } from "solid-motionone";
import Button from "~/components/Button";
import Navbar from "~/components/NavBar";
import supa from "~/lib/supabase";
import { setTheme } from "~/store/theme";
import { authUser } from "~/user/UserHandler";



const Settings = () => {
    const [darkTheme, setDarkTheme] = createSignal(false);
    const [highContrast, setHighContrast] = createSignal(false);

    const handleSubmit = (e: Event) => {
        if (darkTheme() || highContrast()) {
            e.preventDefault();
            localStorage.setItem("theme", darkTheme() ? "dark" : "highContrast");
            setTheme(darkTheme() ? "dark" : "highContrast");
        } else {
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    }

    onMount(() => {
        localStorage.getItem("theme") === "dark" ? setDarkTheme(true) : localStorage.getItem("theme") === "highContrast" ? setHighContrast(true) : setDarkTheme(false);
    })



    const toggleDarkTheme = () => {
        setDarkTheme(!darkTheme());
        setHighContrast(false);
    }

    const toggleHighContrast = () => {
        setHighContrast(!highContrast());
        setDarkTheme(false);
    }


    const handleSignOut = async () => {
        try {
            const { error } = await supa.auth.signOut()
            if (error) {
                console.error(error);
                return;
            }
            window.location.href = "/login";
        } catch (error) {
            console.log(error);
            throw error
        }
    }


    return (
        <>
            <Navbar />
            <div class="h-screen w-screen bg-[var(--background-alt)] text-[var(--font-color)] items-center flex flex-col">
                <main class="flex flex-col items-center my-5 gap-5">
                    <h1 class="text-4xl font-bold underline">Ajustes</h1>
                    <section class="flex flex-col items-center">
                        <img width={150} height={150} class="rounded-lg" src={authUser()?.user_metadata.avatar_url}></img>
                        <h1 class="font-bold text-xl">{authUser()?.user_metadata.full_name}</h1>
                        <Button class="my-2" btnStyle="button-palette" onClick={handleSignOut}>Cerrar sesión</Button>
                    </section>

                    <form onsubmit={(e: Event) => handleSubmit(e)} class="text-center">
                        <article>
                            <p class="font-bold text-3xl underline">Apariencia</p>
                            <section class="flex flex-row items-center gap-5 my-5">
                                <div>
                                    <input type="checkbox" checked={darkTheme()} class="hidden" />
                                    <Motion.div
                                        animate={darkTheme() ? { scale: 1.2 } : { scale: 1 }}
                                        onClick={toggleDarkTheme}
                                        class={`w-8 h-8 p-3 cursor-pointer text-[var(--font-color-alt-2)] flex items-center justify-center rounded border-2 border-[var(--color-tertiary)] }`}
                                    >
                                        <Show when={darkTheme()}>
                                            <i class="fa-solid fa-check text-2xl"></i>
                                        </Show>
                                    </Motion.div>
                                </div>
                                <p class="font-regulr text-2xl">Activar modo oscuro</p>
                            </section>
                            <section class="flex flex-row items-center gap-5 my-5">
                                <div>
                                    <input type="checkbox" checked={highContrast()} class="hidden" />
                                    <Motion.div
                                        animate={highContrast() ? { scale: 1.2 } : { scale: 1 }}
                                        onClick={toggleHighContrast}
                                        class={`w-8 h-8 p-3 cursor-pointer flex items-center justify-center rounded border-2 text-[var(--font-color-alt-2)] border-[var(--color-tertiary)] }`}
                                    >
                                        <Show when={highContrast()}>
                                            <i class="fa-solid fa-check text-2xl"></i>
                                        </Show>
                                    </Motion.div>
                                </div>
                                <p class="font-regulr text-2xl">Activar modo de alto contraste</p>
                            </section>

                            <Button btnStyle="button-palette">Aplicar Cambios</Button>
                        </article>
                    </form>
                </main>
            </div >
        </>
    )
}

export default Settings