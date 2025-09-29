import { createSignal, Show } from "solid-js";
import Button from "~/components/Button";
import { Presence, Motion } from "solid-motionone";

interface AvatarProps {
    avatar: () => number;
    setAvatar: (v: number | ((prev: number) => number)) => void;
}

const Avatar = (props: AvatarProps) => {
    const maxAvatars = 5;

    const nextAvatar = () => {
        props.setAvatar((prev) => (prev >= maxAvatars ? 1 : prev + 1));
    };

    const prevAvatar = () => {
        props.setAvatar((prev) => (prev <= 1 ? maxAvatars : prev - 1));
    };


    return (
        <div class="flex flex-row justify-center items-center gap-5">
            <Button
                btnStyle="button-steel"
                class="rounded-full! w-12 h-12 text-lg"
                onClick={prevAvatar}
            >
                <i class="fa-solid fa-arrow-left"></i>
            </Button>

            <Presence exitBeforeEnter>
                <Show when={props.avatar()} keyed>
                    {(current) => (
                        <Motion.img
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.05 }}
                            loading="lazy"
                            class="w-40 h-40 rounded-2xl"
                            src={`/avatars/avatar${current}.jpg`}
                        />
                    )}
                </Show>
            </Presence>

            <Button
                btnStyle="button-steel"
                class="rounded-full! w-12 h-12 text-lg"
                onClick={nextAvatar}
            >
                <i class="fa-solid fa-arrow-right"></i>
            </Button>
        </div>
    );
};

export default Avatar;
