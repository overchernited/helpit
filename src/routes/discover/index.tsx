
import brand from "~/assets/branding/brandpublic.png";
import SearchBar from "./Components/SearchBar";
import PostLoader from "./Components/Posts/PostLoader";
import Private from "~/components/Routes";
import Navbar from "~/components/NavBar";
import MyPost from "./Components/Posts/MyPost";
import Button from "~/components/Button";


const Discover = () => {

    return (
        <>
            <Private endpoint="/">
                <Navbar />
                <img src={brand} class="top-0 left-0 m-1" width={120} height={120} alt="" />
                <div class="flex items-center w-screen h-screen flex-col my-4 gap-2 overflow-x-hidden">
                    <SearchBar />
                    <h1 class="text-center font-extrabold text-4xl text-[var(--color-secondary)]">¿Nescecitas mas ayuda?</h1>
                    <div class="flex flex-col justify-center items-center gap-1 w-[90vw] text-[var(--color-secondary)]">
                        Linea 106 (CO) & 300 754 8933
                        <a class="underline" href="https://bogota.gov.co/mi-ciudad/salud/lineas-de-atencion-para-personas-que-sufren-de-ansiedad-y-depresion">Lee más articulos de ayuda aca.
                        </a>
                    </div>

                    <div class="flex justify-center h-auto w-[90vw] md:w-[50vw] " >
                        <MyPost />
                    </div >
                    <h1 class="text-4xl text-center font-bold text-[var(--color-secondary)]">Bienvenidx de vuelta!</h1>
                    <PostLoader />
                </div>
            </Private>
        </>
    )
}

export default Discover