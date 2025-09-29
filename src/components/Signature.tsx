import { onMount } from "solid-js";

const Signature = () => {
    onMount(() => {
        const comment = document.createComment(`
 _                     _ _           _ 
  _____   _____ _ __ ___| |__   ___ _ __ _ __ (_) |_ ___  __| |
 / _ \\ \\ / / _ \\ '__/ __| '_ \\ / _ \\ '__| '_ \\| | __/ _ \\/ _\` |
| (_) \\ V /  __/ | | (__| | | |  __/ |  | | | | | ||  __/ (_| |
 \\___/ \\_/ \\___|_|  \\___|_| |_|\\___|_|  |_| |_|_|\\__\\___|\\__,_|
                    github.com/overchernited
 `);
        document.body.prepend(comment);
    });

    return null;
};

export default Signature;