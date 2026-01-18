export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  devServer: { host: "0.0.0.0" },
  nitro: { preset: "static" },
});
