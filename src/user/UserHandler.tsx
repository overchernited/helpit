import { onMount, onCleanup, createSignal } from "solid-js";
import type { User, Session } from "@supabase/supabase-js";
import { AddNotification } from "~/components/Notifications";
import supa from "~/lib/supabase";

export const [authUser, setAuthUser] = createSignal<User | null>(null);
export const [loadingUser, setLoadingUser] = createSignal(true);
export const [level, setLevel] = createSignal<number>(1);
export const [userMeta, setUserMeta] = createSignal<Record<string, any>>({});

export const calculateLevel = (xp: number): number => {
    let lvl = 1;
    let xpNeeded = 50;
    let totalNeeded = xpNeeded;
    while (xp >= totalNeeded) {
        lvl++;
        xpNeeded *= 2;
        totalNeeded += xpNeeded;
    }
    return lvl;
};

const achievements = [null, null, "friendly", "partnerly", "listener", "guardian", "king"];
const getAchievement = (lvl: number): string | null => achievements[lvl] ?? null;

export const refreshUser = async () => {
    const { data: { session } } = await supa.auth.getSession();
    const user = session?.user ?? null;
    setAuthUser(user);
    setUserMeta(user?.user_metadata ?? {});
    setLevel(user?.user_metadata?.level ?? 1);
};

export const giveXp = async (amount: number) => {
    if (Math.random() > 0.40) return
    const userId = authUser()?.id;
    if (!userId) return;

    try {
        const { data: profile, error: fetchError } = await supa
            .from("profiles")
            .select("xp, level, achievments")
            .eq("id", userId)
            .single();
        if (fetchError) throw fetchError;

        const currentXp = profile?.xp ?? 0;
        const newXp = currentXp + amount;
        const newLvl = calculateLevel(newXp);

        const currentAchievements = profile?.achievments ?? [];
        const achievement = getAchievement(newLvl);
        const newAchievements = achievement ? [...new Set([...currentAchievements, achievement])] : currentAchievements;

        await supa.from("profiles").update({ xp: newXp, level: newLvl, achievments: newAchievements }).eq("id", userId);
        await supa.auth.updateUser({ data: { xp: newXp, level: newLvl, achievments: newAchievements } });

        await refreshUser();

        AddNotification({
            message: `Has ganado ${amount} XP`,
            title: "Felicidades",
            type: "success",
            duration: 3000
        });
        console.log(`✅ XP dado: ${amount}, Total XP: ${newXp}, Nivel: ${newLvl}`);
    } catch (err) {
        console.error("Error en giveXp:", err);
    }
};

const UserHandler = () => {
    const handleAuth = async (_event: string, session: Session | null) => {
        const user = session?.user ?? null;
        setAuthUser(user);
        setUserMeta(user?.user_metadata ?? {});
        setLevel(user?.user_metadata?.level ?? 1);
        setLoadingUser(false);

        if (_event === "SIGNED_IN" && user) {
            try {
                const { data: existing } = await supa.from("profiles").select("id").eq("id", user.id).maybeSingle();
                if (!existing) {
                    const meta = user.user_metadata ?? {};
                    await supa.from("profiles").insert({
                        id: user.id,
                        avatar_url: meta.avatar_url,
                        full_name: meta.full_name ?? "Nuevo usuario",
                        level: meta.level ?? 1,
                        xp: meta.xp ?? 0,
                        achievments: meta.achievments ?? []
                    });
                    console.log("Perfil creado ✅");
                }
                await refreshUser();
            } catch (err) {
                AddNotification({ message: "Error creando perfil", title: "Algo salió mal.", type: "error", duration: 3000 });
            }
        }
    };

    onMount(async () => {
        setLoadingUser(true);
        const { data: { session }, error: sessionError } = await supa.auth.getSession();
        if (sessionError) {
            console.error("Error obteniendo sesión:", sessionError);
            setLoadingUser(false);
            return;
        }

        await handleAuth("SIGNED_IN", session ?? null);

        const { data } = supa.auth.onAuthStateChange(async (event, session) => {
            await handleAuth(event, session);
        });

        onCleanup(() => data.subscription.unsubscribe());
    });

    return null;
};

export default UserHandler;
