export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
  devServer: { host: "0.0.0.0" },
  nitro: { preset: "static" },
});
