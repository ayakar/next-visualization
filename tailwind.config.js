/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: '#F0A323',
                primaryLight: '#fedca5',
                // primaryLight2: '#ffe4b8',
                secondary: '#008eaa',
                secondaryLight: '#F1FCFD',
                danger: '#AA0000',
                success: '',
                // black: '#000',
                white: '#fff',
                // darkGray: '#668586',
                gray: '#88929e',
                lightGray: '#e7e7e7',
                lightGray2: '#f9f9f9',
                // lightGray: '#c4cfde',
                // yellow: '#e2e663',
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
            container: {
                center: true,
                padding: '.5rem',
                // screens: {
                //     sm: '100%',
                //     md: '640px',
                //     lg: '768px',
                //     xl: '1280px',
                //     // xl: '1024px',
                //     '2xl': '1280px',
                // },
            },
            boxShadow: {
                // sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                DEFAULT: '0 2px 12px 0 #c0c0c0',
                // md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                // lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                // xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                // '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                // '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
                // inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                // none: 'none',
            },
            borderRadius: {
                sm: '0.28rem',
                DEFAULT: '1rem',
                // md: '0.375rem',
                // lg: '0.5rem',
                // xl: '0.75rem',
                // '2xl': '1rem',
                // '3xl': '1.5rem',
                // full: '9999px',
                // large: '12px 30px 12px 28px'
            },
            borderWidth: {
                1: '1px',
                DEFAULT: '2px',

                // '4': '4px',
                // '8': '8px',
            },
            borderColor: (theme) => ({
                ...theme('colors'),
                dark: theme('colors.gray', 'currentColor'),
                primary: theme('colors.primary', 'currentColor'),
                DEFAULT: theme('colors.lightGray', 'currentColor'),
            }),
            borderStyle: {
                DEFAULT: 'solid',
            },
            fontSize: {
                // xs: '.75rem',
                sm: '.9rem',
                // 'base': '1rem',
                // 'lg': '1.125rem',
                // 'xl': '1.25rem',
                // '2xl': '1.5rem',
                // '3xl': '1.875rem',
                // '4xl': '2.25rem',
                // '5xl': '3rem',
            },
        },
    },
    plugins: [],
};
