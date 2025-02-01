import type { Config } from "tailwindcss";

export default {
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F5",
        foreground: "#00BF4F",
      },
    },
  },
  plugins: [],
} satisfies Config;
