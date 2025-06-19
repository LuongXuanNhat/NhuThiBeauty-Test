import { Playfair_Display } from 'next/font/google'

export const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair-display',
  display: 'swap',
})


export const playfairClassName = playfairDisplay.className

export const playfairVariable = playfairDisplay.variable