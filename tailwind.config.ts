import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        serif: ['var(--font-montserrat)', 'serif'],

        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        playfair: ['var(--font-montserrat)', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config