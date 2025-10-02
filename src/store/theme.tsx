import { onMount, createSignal, createEffect } from "solid-js"
export const [theme, setTheme] = createSignal('dark');



const light = {
    '--color-primary': '#ba5087',
    '--color-tertiary': '#61bdff',
    '--font-color': '#fff',
    '--font-color-alt': '#ba5087',
    '--font-color-alt-2': '#393e41',
    '--background': '#ffffff',
    '--background-alt': '#ba5087',
}
const dark = {
    '--color-primary': '#ba5087',
    '--color-tertiary': '#61bdff',
    '--font-color': '#fff',
    '--font-color-alt': '#ba5087',
    '--font-color-alt-2': '#ffffff',
    '--background': '#111111',
    '--background-alt': '#111111',
}

const highContrast = {
    '--color-primary': '#ba5087',
    '--color-tertiary': '#61bdff',
    '--font-color': '#ecfd00',
    '--font-color-alt': '#ecfd00',
    '--font-color-alt-2': '#ecfd00',
    '--background': '#000000',
    '--background-alt': '#000000',
}

const Theme = () => {

    let cacheTheme = ''
    const loadTheme = (selected: string) => {
        const themeObj =
            selected === "highContrast"
                ? highContrast
                : selected === "dark"
                    ? dark
                    : light;

        Object.entries(themeObj).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    };


    onMount(() => {
        let theme = localStorage.getItem('theme')
        cacheTheme = theme ?? 'light'

        if (theme === null) {
            localStorage.setItem('theme', 'light');
        } else {
            setTheme(theme);
        }

        loadTheme(theme ?? 'light');
    });

    createEffect(() => {
        if (theme() !== cacheTheme) {
            loadTheme(theme());
        };
    });

    return null
}

export default Theme