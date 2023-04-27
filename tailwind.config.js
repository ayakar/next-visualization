/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: '#F0A323',
                primaryLight: '#fedca5',
                secondary: '#008eaa',
                danger: '',
                success: '',
                // black: '#000',
                // white: '#fff',
                // gray: '#88929e',
                // lightGray: '#c4cfde',
                // yellow: '#e2e663',
            },
        },
    },
    plugins: [],
};
