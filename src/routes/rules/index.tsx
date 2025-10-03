import brand from "~/assets/branding/brandnegative.png";
import Button from "~/components/Button";

const Rule = (props: { text: string }) => {
    return (
        <div class="w-full h-20 bg-[var(--color-primary)] p-5 rounded-lg my-3 text-left ">
            <p class="text-xl text-[var(--font-color)] font-normal">{props.text}</p>
        </div>
    )
}

const Rules = () => {
    return (

        <div class="justify-between flex flex-row items-center pl-5 gap-5 w-screen h-screen bg-[var(--background)] text-center">
            <section class="w-[50%]">
                <p class="text-4xl font-bold text-[var(--font-color)]">REGLAS DE USO HELPIT</p>
                <Rule text="Respeto y empatia, escuchar y comprender. No burlas o sarcasmo." />
                <Rule text="Anonimato y privacidad, No intentes identificar a otros usuarios ni desvelar informacion." />
                <Rule text="Contenido permitido: Puedes hablar de ansiedad, depresión adicciones, etc siempre con respeto y sin fomentar estas conductas." />
                <Rule text="Contenido prohibido: Insultos, discriminación discursos de odio o bullying. Promociones de autolesines o otras conductas peligrosas y lenguaje sexual explicito o inapropiado" />
                <Rule text="Moderacion, Los moderadores pueden editar, ocultar o eliminar publicaciones que incumplan las reglas. Reincidencias pueden llevar a expulsion y suspension permanente de la cuenta" />
                <Rule text="Objetivo, Este foro pretende ayudar a la comunidad y es de uso libre pero no sustituye la ayuda profesional." />
                <p class="font-black text-white">Al registrate en helpit-eight.vercel.app aceptas las reglas de uso.*</p>
                <Button btnStyle="button-palette" class="w-[10rem] text-2xl m-2" onClick={() => window.location.href = "/"}>Volver</Button>
            </section>
            <section class="flex-col hidden md:flex bg-[#ab5a7f] w-[50%] h-full rounded-2xl items-center justify-center text-[var(--font-color)]">
                <img alt="brand" height={500} width={500} src={brand}></img>
                <p class="font-bold text-3xl">De todxs para todxs.</p>
                <img alt="flubber" height={500} width={500} src="/flubber/flubbermobile.gif"></img>
            </section>
        </div>
    )
}

export default Rules