import Navbar from "~/components/NavBar"
import LevelCard from "./Components/LevelCard"
import Private from "~/components/Routes"


const Levels = () => {
    return (
        <>
            <Private endpoint="/login">
                <Navbar />
                <div class="h-screen overflow-y-scroll items-center justify-center  w-screen bg-[var(--color-primary)] p-2">
                    <h1 class="text-4xl font-bold fixed top-0 left-0  m-5 text-[var(--surface)]">Levels</h1>
                    <div class="flex flex-wrap items-center justify-center gap-20 h-full w-[85vw] pb-10">
                        <LevelCard levelName="Level 1" minLVL={1}>
                            <p class="text-2xl text-center font-bold">¡Aca comienza tu aventura!</p>
                            <ul>
                                <li>Bienvenido a helpit, disfruta de tu estancia</li>
                            </ul>

                        </LevelCard>
                        <LevelCard levelName="Level 2" achievmentMedal="friendly" minLVL={2}>
                            <ul>
                                <li>Nescecitas 150XP para llegar aca.</li>
                                <li>El inicio del viaje, donde los usuarios dan sus primeros pasos como criaturas que ayudan a la comunidad.</li>
                            </ul>
                        </LevelCard>
                        <LevelCard levelName="Level 3" achievmentMedal="partnerly" minLVL={3}>
                            <ul>
                                <li>Nescecitas 350XP para llegar aca.</li>
                                <li>Usuarios que empiazan a conectar y apoyar a otros.</li>
                            </ul>
                        </LevelCard>
                        <LevelCard levelName="Level 4" achievmentMedal="listener" minLVL={4}>
                            <ul>
                                <li>Nescecitas 750XP para llegar aca.</li>
                                <li>Criaturas que escuchan con atencion y aportan empatia a la comunidad</li>
                            </ul>
                        </LevelCard>
                        <LevelCard levelName="Level 5" achievmentMedal="guardian" minLVL={5}>
                            <ul>
                                <li>Nescecitas 1550XP para llegar aca.</li>
                                <li>Criaturas que protegen y cuidan el espacio de la comunidad</li>
                            </ul>
                        </LevelCard>
                        <LevelCard levelName="Level 6" achievmentMedal="king" minLVL={6}>
                            <ul>
                                <li>Nescecitas 3150XP para llegar aca.</li>
                                <li>El nivel mas alto, donde los usuarios son lideres activos de la comunidad.</li>
                            </ul>
                        </LevelCard>

                    </div>
                </div>
            </Private>
        </>
    )
}

export default Levels