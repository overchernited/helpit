
import brand from "~/assets/branding/brandpublic.png";
import SearchBar from "./Components/SearchBar";
import PostLoader from "./Components/Posts/PostLoader";
import Private from "~/components/Routes";
import Navbar from "~/components/NavBar";
import MyPost from "./Components/Posts/MyPost";
import Categories from "./Components/Posts/Categories";
import { category } from "./Components/Posts/Categories";
import { Show } from "solid-js";
import { userSignUpState } from "~/user/UserHandler";
import { authUser } from "~/user/UserHandler";


const Discover = () => {

    return (
        <>
            <Private endpoint="/">
                <p class="text-[var(--font-color-alt)] text-xs m-2 font-extralight">HELPIT V1.0</p>
                <Navbar />
                <div class=" flex items-center flex-col my-4 gap-2 bg-[var(--background)]">
                    <SearchBar />
                    <h1 class="text-center font-extrabold text-4xl  text-[var(--font-color-alt)]">¿Nescecitas mas ayuda?</h1>
                    <div class="flex flex-col justify-center items-center gap-1 w-[90vw] text-[var(--font-color-alt-2)]">
                        Linea 106 (CO) & 300 754 8933
                        <a class="underline" href="https://bogota.gov.co/mi-ciudad/salud/lineas-de-atencion-para-personas-que-sufren-de-ansiedad-y-depresion">Lee más articulos de ayuda aca.
                        </a>
                    </div>
                    <Show when={userSignUpState() === "FIRST_TIME"}>
                        <div class="mt-5 text-center">
                            <p class="text-[var(--font-color-alt)] font-bold text-2xl">¿Primera vez aca? </p>
                            <p class="text-[var(--font-color-alt)] font-bold text-md">¡Visita estas secciones! </p>
                        </div>
                        <div class="flex items-center justify-center gap-2 text-[var(--font-color-alt)]">
                            <a href="/levels" class="cursor-pointer rounded-full text-center border-2 border-[var(--font-color-alt)] px-2">Niveles <i class="fa-solid fa-up-right-from-square"></i></a>
                            <a href="/settings" class="cursor-pointer rounded-full text-center border-2 border-[var(--font-color-alt)] px-2">Configuraciones <i class="fa-solid fa-up-right-from-square"></i></a>
                            <a href={`/users/${authUser()?.id}`} class="cursor-pointer rounded-full text-center border-2 border-[var(--font-color-alt)] px-2">Tu usuario <i class="fa-solid fa-up-right-from-square"></i></a>
                        </div>
                        <p class="text-[var(--font-color-alt-2)] font-bold text-md">O tambien puedes:</p>
                        <a href="/levels" target="_blank" class=" cursor-pointer rounded-lg text-md text-center text-[var(--font-color-alt)] border-2 border-[var(--font-color-alt)] p-3">Mirar nuestro tutorial <i class="fa-solid fa-up-right-from-square"></i></a>
                    </Show>

                    <div class="flex justify-center h-auto w-[90vw] md:w-[50vw] " >
                        <MyPost />
                    </div >
                    <h1 class="text-4xl text-center font-bold text-[var(--font-color-alt)]">Bienvenidx de vuelta!</h1>
                    <Categories />
                    <PostLoader category={category()} />
                </div>
            </Private >
        </>
    )
}

export default Discover