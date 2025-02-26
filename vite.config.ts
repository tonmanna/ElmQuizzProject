import { resolve } from "path";
import { defineConfig } from "vite";
// import { plugin } from "vite-plugin-elm";

import monacoEditorPlugin from "vite-plugin-monaco-editor";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [
    react(),
    monacoEditorPlugin({}),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
        Main: resolve(__dirname, "index.html"),
      },
    },
  },
});
