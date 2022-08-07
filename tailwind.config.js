/** @type {import('tailwindcss').Config} */
const colors = require("./node_modules/tailwindcss/colors")

module.exports = {
    mode: "jit",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                // add new font family
                montserrat: ["Quicksand", "Open Sans", "sans-serif"],
            },
            colors: {
                orange: colors.orange,
                rose: colors.rose,
            },
            blur: {
                xs: "2px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@vechaiui/core")({
            colors: ["orange", "rose"],
        }),
    ],
    corePlugins: {
        preflight: true, // <== disable this!
    },
}
