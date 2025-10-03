import Button from "~/components/Button";
import { uniqueNamesGenerator, adjectives, colors, animals, starWars, names } from "unique-names-generator";
import DynamicBackground from "~/components/DynamicBackground";
import Steps from "~/components/Steps";
import { createSignal, For, onMount, Show } from "solid-js";
import { Motion } from "solid-motionone"
import Avatar from "./index/avatar";
import KeywordTag from "./index/tag";
import QRCode from "qrcode-generator";
import brand from "~/assets/branding/brandnegative.png";
import party from "party-js";

import { Public } from "~/components/Routes";
import { nanoid } from "nanoid";
import SignUp from "~/user/signUp";

import { setSignInLoading, signInLoading } from "~/user/signUp";

const [avatar, setAvatar] = createSignal(1);

const [step, setStep] = createSignal(1);
const [user, setUser] = createSignal({ id: "", full_name: "" });

const FirstStep = ((props: { onNext: () => void }) => {
    const [leaving, setLeaving] = createSignal(false);

    const questions = [
        "¿Alguna vez has sentido miedo o inseguridad en tu vida?",
        "¿Alguna vez te has sentido solo?",
        "¿Has sentido que no podías hablar de lo que realmente te dolía?",
        "¿Alguna vez lloraste en silencio para que nadie lo notara?",
        "¿Has sentido que tus problemas son demasiado grandes para compartirlos?"
    ];

    const [question, setQuestion] = createSignal("");

    onMount(() => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setQuestion(questions[randomIndex]);
    });

    const handleNext = () => {
        setLeaving(true);
        setTimeout(() => {
            props.onNext();
        }, 500);
    }

    onMount(() => {
        const account = localStorage.getItem("account")
        if (account === "true") {
            window.location.href = "/login";
        }
    })

    return (
        <>
            <div
                class=" justify-center md:justify-between flex flex-row w-screen h-screen">
                <DynamicBackground />
                <Motion.div
                    animate={leaving() ? { opacity: 0 } : { opacity: 1 }}
                    class="flex justify-center items-center gap-5 flex-col w-[80%]">
                    <Steps steps={3} completed={step()} />
                    <Motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ easing: [0.34, 1.56, 0.64, 1], duration: 2 }}
                        class="text-3xl w-full md:w-[70%] text-center font-bold text-[var(--font-color-alt)]">{question()}</Motion.p>

                    <Motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ easing: [0.34, 1.56, 0.64, 1], duration: 2, delay: 0.8 }}
                        class="flex flex-row w-full items-center justify-center gap-10">
                        <Button btnStyle="button-palette" class="w-[10rem] text-3xl" onClick={() => { handleNext() }}>Si</Button>
                        <Button btnStyle="button-palette" class="w-[10rem] text-3xl" onClick={() => { }}>No</Button>
                    </Motion.div>
                    <Motion.a
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ easing: [0.34, 1.56, 0.64, 1], duration: 2, delay: 1.3 }}
                        class="text-[var(--font-color-alt)] underline-offset-2 underline" href="/login">Ya soy parte de helpit</Motion.a>
                </Motion.div>
                <Motion.div
                    initial={{ opacity: 0, x: 0 }}
                    exit={{ opacity: 0, x: 0 }}
                    transition={{ duration: 0.5 }}
                    animate={leaving() ? { opacity: 1, x: "-57.1vw" } : { opacity: 1, x: 0 }}
                    class="flex-col hidden md:flex bg-[#ab5a7f] w-[60%] h-full rounded-2xl items-center justify-center text-[var(--font-color)]">
                    <img alt="brand" height={500} width={500} src={brand}></img>
                    <p class="font-bold text-3xl">De todxs para todxs.</p>
                    <img alt="flubber" height={500} width={500} src="/flubber/flubbersad.gif"></img>
                </Motion.div>
            </div>
        </>
    )
})

const SecondStep = (props: { onNext: () => void }) => {
    const [leaving, setLeaving] = createSignal(false);
    const handleNext = () => {
        setLeaving(true);
        setTimeout(() => {
            props.onNext();
        }, 280);
    }

    const regenName = () => {
        const randomName = uniqueNamesGenerator({
            dictionaries: [colors, starWars, adjectives],
            length: 2,
            separator: " ",
        });

        const newName = randomName.split(" ").join("").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        setUser({ id: nanoid(), full_name: newName });
    };

    onMount(() => {
        regenName();
    })
    return (

        <Motion.div
            animate={leaving() ? { justifyContent: "center" } : { opacity: 1 }}
            class="justify-center md:justify-between flex flex-row w-screen h-screen overflow-hidden">
            <DynamicBackground />
            <Motion.div
                animate={leaving() ? { width: "100%", height: "100%" } : { opacity: 1 }}
                class="hidden md:flex flex-col bg-[#ab5a7f] w-[60%] h-screen rounded-2xl items-center justify-center">
                <Motion.section
                    class="justify-center items-center flex flex-col"
                    animate={leaving() ? { opacity: 0 } : { opacity: 1 }}
                >
                    <img alt="brand" height={500} width={500} src={brand}></img>
                    <p class="font-bold text-3xl text-[var(--font-color)]">De todxs para todxs.</p>
                    <img alt="flubber" height={500} width={500} src="/flubber/flubbermobile.gif"></img>
                </Motion.section>
            </Motion.div>

            <Motion.div
                animate={leaving() ? { visibility: "hidden", width: "0vw", opacity: 0 } : { opacity: 1 }}
                class="justify-center items-center flex flex-col gap-2 w-[80%] ">
                <Steps steps={3} completed={step()} />
                <Motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    class="text-2xl w-full md:w-[50%] text-center font-normal text-[var(--font-color-alt)]">
                    <span class="font-bold">helpit</span> es un lugar seguro y abierto a todxs,
                    donde compartir experiencias y recibir orientación es totalmente anónimo.
                    <article class="my-5 justify-center items-center flex flex-col">
                        <p class="text-base font-normal">#{user().id} </p>
                        <Avatar avatar={avatar} setAvatar={setAvatar} />
                        <section class="flex items-center  gap-4">
                            <p class="text-2xl font-extrabold text-[var(--font-color-alt-2)] break-all">{user().full_name}</p>
                            <Button btnStyle="button-palette" class=" text-sm" onclick={regenName}><li class="fa-solid fa-arrows-rotate"></li></Button>
                        </section>
                        <p class="text-xl font-normal mt-5 text-[var(--font-color-alt-2)]">Esta es tu tarjeta de perfil.</p>
                        <p class="text-xl font-normal text-[var(--font-color-alt-2)]">¿Quieres crear esta cuenta anonima?</p>
                    </article>
                    <Button btnStyle="button-palette" class="w-[10rem] text-3xl" onClick={() => { handleNext() }}>Continuar</Button>
                </Motion.p>
            </Motion.div>

        </Motion.div>
    )
}

const ThirdStep = () => {
    let divRef: HTMLDivElement | undefined;
    const throwConfetti = () => {
        if (divRef) {
            party.confetti(divRef, {
                count: party.variation.range(100, 150),
                spread: 200,
                size: party.variation.range(1, 2),
            });
        }
    };

    onMount(() => {
        throwConfetti();
    })

    const [src, setSrc] = createSignal<string>("");

    const randomPassword = uniqueNamesGenerator({
        dictionaries: [colors, adjectives, animals, colors],
        length: 4,
        separator: " ",
    });


    const passwordWordgen = randomPassword.split(' ');


    const handleClick = () => {
        SignUp({ avatar: avatar(), password: passwordWordgen.join("").toLowerCase(), full_name: user().full_name });
    }

    onMount(() => {
        const qr = QRCode(0, "L");
        qr.addData(`${import.meta.env.VITE_START_URL}/login/qrlogin?keywords=${passwordWordgen.join("")}&username=${user().full_name}`);
        qr.make();

        const imgTag = qr.createDataURL(32, 32);
        setSrc(imgTag);
    });



    return (
        <div ref={divRef} class="w-screen h-[100vh] bg-[var(--background-alt)] flex flex-col items-center justify-center">
            <Motion.article
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ easing: [0.34, 1.56, 0.64, 1], duration: 0.45 }}
                class="my-5 flex flex-row justify-between w-auto h-auto items-center gap-5 palette-gradient p-5 rounded-2xl shadow-2xl shadow-zinc-700">
                <div class="hidden md:flex flex-col items-center justify-center gap-5">
                    <img
                        loading="lazy"
                        class="w-32 h-32 rounded-2xl palette-gradient p-1"
                        src={src()}
                    />
                    <img
                        loading="lazy"
                        class="w-32 h-32 rounded-2xl palette-gradient p-1"
                        src={src()}
                    />
                </div>
                <section class="flex flex-col items-center justify-center">
                    <p class="text-base my-3 font-normal text-[var(--font-color-alt)] text-center">#{user().id} </p>
                    <Steps steps={3} completed={step()} />
                    <section class="flex  flex-col md:flex-row items-center gap-5">
                        <img
                            loading="lazy"
                            class="w-auto h-32 rounded-2xl"
                            src={`/avatars/avatar${avatar()}.jpg`}
                        />
                        <section class="flex flex-col items-center justify-center">
                            <p class="text-3xl font-extrabold my-2 text-center text-[var(--font-color-alt-2)] break-all">{user().full_name}</p>
                            <section class="flex flex-col md:flex-row gap-2 items-center">
                                <For each={passwordWordgen}>
                                    {(word, i) =>
                                        <KeywordTag>{i() + 1}. {word.toLowerCase().replace("/[^\\w\\s]/g", "o")}</KeywordTag>
                                    }
                                </For>
                                <img
                                    loading="lazy"
                                    class="visible md:hidden w-16 h-16 rounded-2xl palette-gradient p-1"
                                    src={src()}
                                />
                            </section>
                        </section>
                    </section>
                    <p class="text-xl font-normal mt-5 text-[var(--font-color-alt)] text-center">Vuelve a ingresar con tu nombre y <span class="text-palette-gradient underline decoration-[var(--color-tertiary)] rounded-2xl p-1">palabras clave</span> o
                        escanea tu QR.</p>
                </section>

                <div class="hidden md:flex flex-col items-center justify-center gap-5">
                    <img
                        loading="lazy"
                        class="w-32 h-32 palette-gradient rounded-2xl p-1"
                        src={src()}
                    />
                    <img
                        loading="lazy"
                        class="w-32 h-32 rounded-2xl palette-gradient p-1"
                        src={src()}
                    />
                </div>
            </Motion.article>
            <Button btnStyle="button-palette" class="w-[10rem] text-2xl my-6" onClick={() => { handleClick() }}>Continuar</Button>
            <Show when={signInLoading()}>
                <div class="m-auto spinner" />
                <div class="m-auto spinner w-5 h-5 border-4 border-[var(--color-tertiary)] border-t-transparent rounded-full animate-spin " />
            </Show>
        </div >
    )
}
const Home = () => {

    return (
        <>
            <Public endpoint="/discover">
                <div class="justify-center items-center flex flex-col w-screen h-screen">
                    {step() === 1 && <FirstStep onNext={() => setStep(2)} />}
                    {step() === 2 && <SecondStep onNext={() => setStep(3)} />}
                    {step() === 3 && <ThirdStep />}
                </div>
            </Public>

        </>
    );
}

export default Home