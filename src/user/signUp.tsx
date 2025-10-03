import supa from "~/lib/supabase";
import { AddNotification } from "~/components/Notifications";
import { createSignal } from "solid-js";

interface UserProps {
    avatar: number,
    password: string
    full_name: string

}
export const [signInLoading, setSignInLoading] = createSignal(false);

const SignUp = async (props: UserProps) => {

    try {
        setSignInLoading(true);
        const { error, data } = await supa.auth.signUp({
            email: props.full_name + '@helpit.com',
            password: props.password,
            options: {
                data: {
                    xp: 1,
                    level: 1,
                    full_name: props.full_name,
                    avatar_url: import.meta.env.VITE_START_SUPABASE_AVATAR_BUCKET + `/avatar${props.avatar}.jpg`,
                }
            },
        });

        if (error) {
            console.error('Error creating anonymous account:', error);
            return;
        }

        localStorage.setItem("account", "true")

        AddNotification({
            message: "Bienvenido a helpit!",
            title: "Iniciaste sesión!",
            type: "success",
            duration: 3000,
        });
    } catch (error) {
        console.error('Error creating anonymous account:', error);
        return;
    } finally {
        setSignInLoading(false);
    }
}

export default SignUp