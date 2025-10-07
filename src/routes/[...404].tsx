import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="flex flex-col text-center items-center justify-center font-extrabold h-screen gap-5 w-full text-4xl text-[var(--font-color-alt)]">

      <div class="flex-col md:flex flex items-center gap-2">
        <img class="h-[45vh] w-[45vh]" src="/404.png" alt="404" />
        <p class="text-9xl">404</p>
      </div>
      <p >Flubber se esta rascando la cabeza...</p>
      <p class="text-xl font-medium text-[var(--font-color-alt-2)]">Esta pagina no existe</p>
      <a class="underline text-xl font-light" href="/discover">Volver al inicio</a>
    </main>
  );
}
