import { lazy } from "solid-js";
import brand from "~/assets/branding/brandpublic.png";

const Spinner = lazy(() =>
    import("solid-spinner").then(m => ({ default: m.BallTriangle }))
);

const Loading = () => (
    <div class="flex flex-col items-center justify-center h-screen w-full fixed z-[2000]">
        <img src={brand} width={400} height={400} alt="logo" />
        <Spinner color="#ba5087" height={100} width={100} />
    </div>
);

export default Loading;
