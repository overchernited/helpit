
import brand from "~/assets/branding/brandpublic.png";
import DynamicBackground from "~/components/DynamicBackground";
import MyPost from "./Components/MyPost";
import SearchBar from "./Components/SearchBar";
import PostLoader from "./Components/Posts/PostLoader";
import Private from "~/components/Routes";
import Navbar from "~/components/NavBar";


const Discover = () => {
    return (
        <>
            <Private endpoint="/home">
                <Navbar />
                <img src={brand} class="fixed top-0 left-0 m-2" width={120} height={120} alt="" />
                <div class="flex items-center w-screen h-screen flex-col gap-2 overflow-x-hidden">
                    <SearchBar />
                    <h1 class="text-4xl text-center font-bold text-[var(--color-secondary)]">Bienvenido de vuelta!</h1>
                    <PostLoader />
                </div>
            </Private>
        </>
    )
}

export default Discover