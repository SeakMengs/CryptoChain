/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            animation: {
                mining: "mining .8s ease-in-out infinite",
            },
            keyframes: {
                mining: {
                    "0%, 100%": {
                        transform:
                            "rotate(-15deg) translateX(-50%) translateY(-50%)",
                    },
                    "50%": {
                        transform:
                            "rotate(75deg) translateX(-50%) translateY(-50%)",
                    },
                },
            },
        },
    },
    plugins: [],
};
