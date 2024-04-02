import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
// import vitePluginImp from "vite-plugin-imp";
// import { getThemeVariables } from "ant-design-vue/dist/theme";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression(),
    VitePWA({
      selfDestroying: true,
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/scss/main.scss";`,
      },
      // less: {
      //   // modifyVars: { 'primary-color': '#13c2c2' },
      //   modifyVars: getThemeVariables({
      //     "screen-xl": "1440px",
      //     screenXl: "1440px",
      //   }),
      //   javascriptEnabled: true,
      // },
    },
  },
  base: "/extension-test/",
  build: {
    outDir: "docs",
  },

  devtool: "nosources-source-map",
});
