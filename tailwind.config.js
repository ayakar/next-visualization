/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        extend: {
            colors: {
                // shadcn tokens (drive the ui/* primitives)
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    dark: 'hsl(var(--primary-dark))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },

                // design palette (see specs/design-rules.html)
                ink: { DEFAULT: '#202529', soft: '#475569', muted: '#6b7686' },
                brand: { DEFAULT: '#7c3aed', dark: '#6d28d9', soft: '#a78bfa', light: '#ede9fe', lighter: '#f5f3ff' },
                onyx: { DEFAULT: '#1c1c22', deep: '#09090b', raised: '#2a2a34' },
                risk: {
                    low: '#10b981',
                    'low-tint': '#d1fae5',
                    'low-text': '#047857',
                    medium: '#f59e0b',
                    'medium-tint': '#fef3c7',
                    'medium-text': '#b45309',
                    high: '#ef4444',
                    'high-tint': '#fee2e2',
                    'high-text': '#b91c1c',
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                '2xs': ['0.625rem', '1rem'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                card: '14px',
            },
            spacing: {
                sidebar: '232px',
                header: '56px',
                chart: '300px',
            },
            maxWidth: {
                content: '1180px',
            },
            gridTemplateColumns: {
                dashboard: '1.4fr 1fr',
            },
            minWidth: {
                control: '8.5rem',
                table: '40rem',
            },
            zIndex: {
                header: '60',
                overlay: '65',
                drawer: '70',
            },
            boxShadow: {
                subtle: '0 1px 2px rgba(17, 24, 39, 0.04), 0 6px 18px rgba(17, 24, 39, 0.05)',
                primary: '0 4px 14px rgba(124, 58, 237, 0.22)',
                bubble: '0 8px 20px rgba(0, 0, 0, 0.28)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
