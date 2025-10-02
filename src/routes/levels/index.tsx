import Navbar from "~/components/NavBar"
import LevelCard from "./Components/LevelCard"
import Private from "~/components/Routes"
import { authUser } from "~/user/UserHandler"


const Levels = () => {
    return (
        <>
            <Private endpoint="/login">
                <Navbar />
                <main class="overflow-y-scroll items-center justify-center w-screen  text-[var(--font-color)] bg-[var(--background-alt)] p-2">
                    <h1 class="text-4xl font-bold fixed top-0 left-0  z-[50] m-5">Levels</h1>
                    <section class="flex flex-col items-center justify-center p-2">
                        <img class="rounded-full" width={150} height={150} src={authUser()?.user_metadata.avatar_url}></img>
                        <h1 class="text-center font-extrabold text-3xl">{authUser()?.user_metadata.full_name}</h1>
                        <h1 class="text-center font-bold text-2xl">LVL {authUser()?.user_metadata.level}</h1>
                        <h2 class="text-center font-medium text-lg">XP: {authUser()?.user_metadata.xp}</h2>
                        <p class="text-xl font-extralight">¡Gana experencia interactuando en helpIt con likes, comentarios y publicaciones!</p>

                    </section>

                    <article class="flex flex-wrap items-center justify-center gap-20 h-full w-full my-20 pb-10">
                        <LevelCard levelName="Nivel 1" minLVL={1}>
                            <p class="text-2xl text-center font-bold">¡Aca comienza tu aventura!</p>
                            <ul>
                                <li>Bienvenido a helpit, disfruta de tu estancia</li>
                            </ul>

                        </LevelCard>
                        <LevelCard levelName="Nivel 2" achievmentMedal="friendly" minLVL={2}>
                            <ul>
                                <li>Nescecitas 150XP para llegar aca.</li>
                                <li>El inicio del viaje, donde los usuarios dan sus primeros pasos como criaturas que ayudan a la comunidad.</li>
                            </ul>
                        </LevelCard>
                        <LevelCard levelName="Nivel 3" achievmentMedal="partnerly" minLVL={3}>
                            <ul>
                                <li>Nescecitas 350XP para llegar aca.</li>
                                <li>Usuarios que empiazan a conectar y apoyar a otros.</li>
                            </ul>
                        </LevelCard>
                        <LevelCard levelName="Nivel 4" achievmentMedal="listener" minLVL={4}>
                            <ul>
                                <li>Nescecitas 750XP para llegar aca.</li>
                                <li>Criaturas que escuchan con atencion y aportan empatia a la comunidad</li>
                            </ul>
                        </LevelCard>
                        <LevelCard levelName="Nivel 5" achievmentMedal="guardian" minLVL={5}>
                            <ul>
                                <li>Nescecitas 1550XP para llegar aca.</li>
                                <li>Criaturas que protegen y cuidan el espacio de la comunidad</li>
                            </ul>
                        </LevelCard>
                        <LevelCard levelName="Nivel 6" achievmentMedal="king" minLVL={6}>
                            <ul>
                                <li>Nescecitas 3150XP para llegar aca.</li>
                                <li>El nivel mas alto, donde los usuarios son lideres activos de la comunidad.</li>
                            </ul>
                        </LevelCard>

                    </article>
                </main>
            </Private>
        </>
    )
}

export default Levels