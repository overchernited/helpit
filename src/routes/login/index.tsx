
import { authUser, setAuthUser } from "~/auth/getUser"
import DynamicBackground from "~/components/DynamicBackground"
import Private from "~/components/Routes"
import { Motion } from "solid-motionone"


const Login = () => {
    return (
        <>
            <DynamicBackground />
            <div
                class="flex justify-center items-center w-screen h-screen ">
                <Motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ easing: [0.34, 1.56, 0.64, 1], duration: 0.5 }}
                    class="flex justify-center items-center flex-col gap-5">
                    <div
                        class="palette-gradient rounded-2xl shadow-2xl shadow-zinc-700 p-5">
                        <h1 class="text-4xl text-center font-bold text-[var(--color-primary)]" >
                            Bienvenido de vuelta!
                        </h1>
                    </div>
                    <div
                        class="palette-gradient rounded-2xl shadow-2xl shadow-zinc-700 p-5">
                        
                    </div>
                </Motion.div>
            </div>
        </>
    )
}

export default Login