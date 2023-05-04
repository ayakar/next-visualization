/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: '#F0A323',
                primaryLight: '#fedca5',

                secondary: '#008eaa',
                secondaryMid: '#8be8f5',
                secondaryLight: '#F1FCFD',
                danger: '#AA0000',

                success: '',

                white: '#fff',

                gray: '#88929e',
                lightGray: '#e7e7e7',
                lightGray2: '#f9f9f9',
            },
            width: {
                sidebar: '200px',
                5: '5%',
                10: '10%',
                20: '20%',
                30: '30%',
                35: '35%',
                40: '40%',
                50: '50%',
                60: '60%',
            },
            maxWidth: {
                900: '900px',
            },
            container: {
                center: true,
                padding: '.5rem',
            },
            boxShadow: {
                DEFAULT: '0 2px 12px 0 #c0c0c0',
            },
            borderRadius: {
                sm: '0.28rem',
                DEFAULT: '1rem',
            },
            borderWidth: {
                1: '1px',
                DEFAULT: '2px',
            },
            borderColor: (theme) => ({
                ...theme('colors'),
                dark: theme('colors.gray', 'currentColor'),
                primary: theme('colors.primary', 'currentColor'),
                secondary: theme('colors.secondary', 'currentColor'),
                DEFAULT: theme('colors.lightGray', 'currentColor'),
            }),
            borderStyle: {
                DEFAULT: 'solid',
            },
            fontSize: {
                xs: '.75rem',
                sm: '.9rem',
            },
        },
    },
    plugins: [],
};
