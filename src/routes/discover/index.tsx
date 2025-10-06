
import brand from "~/assets/branding/brandpublic.png";
import SearchBar from "./Components/SearchBar";
import PostLoader from "./Components/Posts/PostLoader";
import Private from "~/components/Routes";
import Navbar from "~/components/NavBar";
import MyPost from "./Components/Posts/MyPost";
import Categories from "./Components/Posts/Categories";
import { category } from "./Components/Posts/Categories";
import { createSignal, onMount, Show } from "solid-js";
import { userSignUpState } from "~/user/UserHandler";
import { authUser } from "~/user/UserHandler";
import NotificationsButton from "../Notifications/NotificationButton";
import { useParams, useSearchParams } from "@solidjs/router";
import supa from "~/lib/supabase";
import ExpandedPost from "./Components/Posts/Post/expandedpost";
import { openModal } from "~/store/modal";


const Discover = () => {


    const [refetchSignal, setRefetchSignal] = createSignal(0);
    const [params, setParams] = useSearchParams()



    const getParamPost = async () => {
        console.log(params.post_id);
        if (!params.post_id) {
            return;
        }
        try {
            const { data, error } = await supa.from("posts").select("*").eq("id", params.post_id).single();
            if (error) {
                console.error(error);
                return;
            }

            openModal({ content: () => <ExpandedPost {...data} /> })
        }
        catch (error) {
            throw error
        }
    }

    onMount(() => {
        getParamPost();
    })

    return (
        <>
            <Private endpoint="/">
                <NotificationsButton />
                <p class="absolute top-0 left-0 text-[var(--font-color-alt)] text-xs m-2 font-extralight">HELPIT V1.0</p>
                <Navbar />
                <div class=" flex items-center flex-col my-4 gap-2 bg-[var(--background)]">
                    <SearchBar />
                    <Show when={userSignUpState() === "FIRST_TIME"}>
                        <div class="mt-5 text-center">
                            <p class="text-[var(--font-color-alt)] font-bold text-2xl">¿Primera vez acá? </p>
                            <p class="text-[var(--font-color-alt)] font-bold text-md">¡Visita estas secciones! </p>
                        </div>
                        <div class="flex items-center justify-center gap-2 text-[var(--font-color-alt)]">
                            <a href="/levels" class="cursor-pointer rounded-full text-center border-2 border-[var(--font-color-alt)] px-2">Niveles <i class="fa-solid fa-up-right-from-square"></i></a>
                            <a href="/settings" class="cursor-pointer rounded-full text-center border-2 border-[var(--font-color-alt)] px-2">Configuraciones <i class="fa-solid fa-up-right-from-square"></i></a>
                            <a href={`/users/${authUser()?.id}`} class="cursor-pointer rounded-full text-center border-2 border-[var(--font-color-alt)] px-2">Tu usuario <i class="fa-solid fa-up-right-from-square"></i></a>
                        </div>
                        <p class="text-[var(--font-color-alt-2)] font-bold text-md">O también puedes:</p>
                        <a href="/flubberai" target="_blank" class=" cursor-pointer rounded-lg text-md text-center text-[var(--font-color-alt)] border-2 border-[var(--font-color-alt)] p-3">Hablar con Flubber AI <i class="fa-solid fa-up-right-from-square"></i></a>
                    </Show>
                    <h1 class="text-center font-extrabold text-3xl  text-[var(--font-color-alt)]">¿Nesecitas más ayuda?</h1>
                    <div class="flex flex-col justify-center items-center gap-1 w-[90vw] text-[var(--font-color-alt-2)]">
                        Linea 106 (CO) & 300 754 8933
                        <a class="underline" href="https://bogota.gov.co/mi-ciudad/salud/lineas-de-atencion-para-personas-que-sufren-de-ansiedad-y-depresion">Lee más articulos de ayuda aca.
                        </a>
                    </div>

                    <div class="flex justify-center h-auto w-[90vw] md:w-[50vw] " >
                        <MyPost onCreate={() => setRefetchSignal((prev) => setRefetchSignal(prev + 1))} />
                    </div >
                    <h1 class="text-4xl text-center font-bold text-[var(--font-color-alt)] mt-2">Bienvenidx de vuelta!</h1>
                    <Categories />
                    <PostLoader category={category()} signal={refetchSignal()} />
                </div>
            </Private >
        </>
    )
}

export default Discover