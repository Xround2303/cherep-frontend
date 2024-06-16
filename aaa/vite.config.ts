import {defineConfig} from "vite";
import {resolve} from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import pluginChecker from "vite-plugin-checker";

export default defineConfig({
  build: {
    sourcemap: true,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@svyazcom/ui-kit",
      formats: ["cjs", "es"],
      fileName: (format) => `ui-kit.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "pinia", "vue-router", "primevue/usetoast", "vue-i18n"],
      output: {
        globals: {
          pinia: "pinia",
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    vue(),
    pluginChecker({typescript: true}),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
    })
  ],
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  }
});
