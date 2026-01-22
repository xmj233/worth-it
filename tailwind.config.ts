import type { Config } from "tailwindcss";
export default <Partial<Config>>{
  content: ["./app/**/*.{vue,js,ts,jsx,tsx}", "./nuxt.config.{js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
