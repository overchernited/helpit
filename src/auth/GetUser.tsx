
import supa from "~/lib/supabase";
import type { User } from "@supabase/supabase-js";

import { createEffect, createSignal, on, onMount } from "solid-js";

export const [authUser, setAuthUser] = createSignal<User | null | undefined>(null);
export const [loadingUser, setLoadingUser] = createSignal(true);

const GetUser = () => {
    const exposeUser = async () => {
        try {
            const { data, error } = await supa.auth.getUser();

            if (error) {
                console.error("Supabase getUser error:", error.message);
            }

            // puede venir user o null
            setAuthUser(data?.user ?? null);
        } catch (err) {
            console.error("Unexpected error:", err);
            setAuthUser(null);
        } finally {
            // ✅ esto SIEMPRE corre, pase lo que pase
            setLoadingUser(false);
        }
    };

    onMount(() => {
        exposeUser();
    });

    return null;
};

export default GetUser;