import type { Config } from 'tailwindcss';

export default {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      colors: {
        background: '#F5F5F5',
        primary: '#00a651',
        destructive: '#dc2626',
        primaryDark: '#008742',
        primaryLight: '#287F71',
        ring: '#4ade80',
        secondary: '#EB862A',
        accent: '#ABBDD3',
        colorGray: '#9ca3af',
        'accent-foreground': '#334155',
      },
    },
  },
  plugins: [],
} satisfies Config;
