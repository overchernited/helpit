import { JSX, onMount, Show } from "solid-js";
import { authUser, loadingUser } from "~/user/UserHandler"
import Loading from "./Loading";
import { createEffect } from "solid-js";

interface Props {
    children: JSX.Element
    endpoint: string
}

const Private = (props: Props) => {

    createEffect(() => {
        console.log(authUser(), loadingUser())
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
        console.log(authUser(), loadingUser())
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