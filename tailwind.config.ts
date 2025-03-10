import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flex: {
        full: "0 0 100%",
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;

export default config;
