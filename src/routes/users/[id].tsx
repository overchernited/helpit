import { useParams } from "@solidjs/router";
import { createSignal, For, onMount, Show } from "solid-js";
import supa from "~/lib/supabase";
import Loading from "~/components/Loading";
import PostLoader from "../discover/Components/Posts/PostLoader";
import Navbar from "~/components/NavBar";
import { authUser } from "~/user/UserHandler";
import Private from "~/components/Routes";

interface User {
    id: string;
    level: number;
    achievments: string[];
    posts: number;
    hearts: number;
    avatar_url: string;
    full_name: string;
}

const User = () => {

    const [hearts, setHearts] = createSignal(0);
    const [achievements, setAchievements] = createSignal([]);
    const [posts, setPosts] = createSignal(0);
    const [user, setUser] = createSignal<User | null>(null);

    const params = useParams();


    const getUser = async () => {
        try {
            const { data, error } = await supa.from("profiles").select("*").eq("id", params.id).single();
            if (error) {
                console.error(error);
                return;
            }
            setUser(data);
        }
        catch (error) {
            throw error
            return
        }
    }

    const getHearts = async () => {
        try {
            const { data, error } = await supa.from("hearts").select("*").eq("owner_id", params.id);
            if (error) {
                console.error(error);
                return;
            }
            setHearts(data.length);
        }
        catch (error) {
            throw error
        }
    }

    const getPosts = async () => {
        try {
            const { data, error } = await supa.from("posts").select("*").eq("user_id", params.id);
            if (error) {
                console.error(error);
                return;
            }
            setPosts(data.length);
        }
        catch (error) {
            throw error
        }
    }

    const getAchievments = async () => {
        try {
            const { data, error } = await supa.from("profiles").select("achievments").eq("id", params.id).single();
            if (error) {
                console.error(error);
                return;
            }
            setAchievements(data.achievments);
        }
        catch (error) {
            throw error
        }
    }

    onMount(async () => {
        await getUser();
        await getHearts();
        await getAchievments();
        await getPosts();
    })


    return (
        <>
            <Private endpoint="/login">
                <Show when={user()} fallback={<Loading />}>
                    <Navbar />
                    <div class="flex items-center text-[var(--font-color)] min-h-screen h-auto w-screen flex-col gap-2 bg-[var(--background-alt)]">
                        <main class="flex flex-col items-center w-[90vw] my-4 gap-2 ">
                            <div class="flex flex-col items-center my-4">
                                <article class="flex flex-row justify-center items-center gap-2">
                                    <img src={user()?.avatar_url} class="w-auto h-32 rounded-xl" alt="User avatar image" />
                                    <section class="flex flex-col">
                                        <h1 class="text-2xl md:text-3xl font-bold line-clamp-2 break-all">{user()?.full_name}</h1>
                                        <h1 class="text-xl font-bold">NIVEL {user()?.level}</h1>
                                    </section>
                                </article>
                                <div class="my-3 text-2xl gap-5 flex ">
                                    <li class="fa-solid fa-heart">
                                        <span class="m-2">{hearts()}</span>
                                    </li>
                                    <li class="fa-solid fa-newspaper"><span class="m-2">{posts()}</span></li>
                                </div>
                            </div>
                            <h2 class="text-2xl font-medium">Logros</h2>
                            <section class="flex flex-col md:flex-row items-center gap-2">

                                <For each={achievements()} fallback={<h1 class="font-bold text-2xl">El usuario no tiene logros</h1>}>
                                    {(achievement) =>
                                        <div class="text-center">
                                            <img src={`/achievements/${achievement}.png`} class="w-auto h-32" />
                                            <label class="font-bold text-xl">{achievement}</label>
                                        </div>
                                    }
                                </For>
                            </section>
                            <h2 class="text-2xl font-medium">Publicaciones</h2>
                            <PostLoader userId={user()?.id} category="general" />
                        </main>
                    </div>
                </Show>
            </Private>
        </>
    );
};

export default User;