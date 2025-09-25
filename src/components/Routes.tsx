import { JSX, onMount, Show } from "solid-js";
import { authUser, loadingUser } from "~/auth/GetUser"
import Loading from "./Loading";
import { createEffect } from "solid-js";

interface Props {
    children: JSX.Element
    endpoint: string
}

const Private = (props: Props) => {
    // efecto reactivo: corre cada vez que cambian los signals
    createEffect(() => {
        if (!loadingUser() && !authUser()) {
            window.location.href = props.endpoint;
        }
    });

    return (
        <Show when={!loadingUser()} fallback={<Loading />}>
            {props.children}
        </Show>
    );
};

export const Public = (props: Props) => {
    createEffect(() => {
        if (!loadingUser() && authUser()) {
            window.location.href = props.endpoint;
        }
    });

    return (
        <Show when={!loadingUser()} fallback={<Loading />}>
            {props.children}
        </Show>
    );
};

export default Private;