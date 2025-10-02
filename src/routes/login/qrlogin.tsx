import { useSearchParams } from "@solidjs/router";
import { onMount, Show } from "solid-js";
import Loading from "~/components/Loading";
import { Public } from "~/components/Routes";
import supa from "~/lib/supabase";


const loginKeywords = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let keywordslist = "";
    let username = ""

    if (searchParams.keywords && searchParams.username) {
        keywordslist = searchParams.keywords.toString().toLowerCase();
        username = searchParams.username.toString().toLowerCase();
    }

    const Login = async () => {
        try {
            const { error } = await supa.auth.signInWithPassword({
                email: `${username.toLowerCase()}@helpit.com`,
                password: keywordslist
            })

            if (error) {
                console.error(error);
                return
            }
            window.location.href = "/discover";
        } catch (error) {
            throw error
            return
        }
    }

    onMount(() => {
        Login();
    })


    return (
        <Public endpoint="/discover">
            <Loading />
        </Public>
    )
}

export default loginKeywords