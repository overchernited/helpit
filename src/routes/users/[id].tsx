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
                    <div class="flex items-center w-screen h-screen flex-col overflow-y-scroll gap-2 bg-[var(--color-primary)]">
                        <main class="flex flex-col items-center w-[90vw] h-screen my-4 gap-2">
                            <div class="flex flex-col items-center my-4">
                                <article class="flex flex-row justify-center items-center gap-2">
                                    <img src={user()?.avatar_url} class="w-32 h-32 rounded-full" alt="User avatar image" />
                                    <section class="flex flex-col">
                                        <h1 class="text-2xl md:text-3xl font-bold text-[var(--surface)] line-clamp-2 break-all">{user()?.full_name}</h1>
                                        <h1 class="text-xl font-bold text-[var(--surface)]">NIVEL {user()?.level}</h1>
                                    </section>
                                </article>
                                <div class="text-[var(--surface)] text-2xl gap-5 flex ">
                                    <li class="fa-solid fa-heart">
                                        <span class="m-2">{hearts()}</span>
                                    </li>
                                    <li class="fa-solid fa-newspaper"><span class="m-2">{posts()}</span></li>
                                </div>
                            </div>
                            <h2 class="text-2xl font-bold text-[var(--surface)]">Logros</h2>
                            <section class="flex flex-row items-center gap-2">

                                <For each={achievements()} fallback={<h1>No logros</h1>}>
                                    {(achievement) =>
                                        <img src={`/achievements/${achievement}.png`} class="w-auto h-32" />
                                    }
                                </For>
                            </section>
                            <h2 class="text-2xl font-bold text-[var(--surface)]">Publicaciones</h2>
                            <PostLoader userId={user()?.id} />
                        </main>
                    </div>
                </Show>
            </Private>
        </>
    );
};

export default User;