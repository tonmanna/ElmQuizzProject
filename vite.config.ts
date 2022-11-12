import { resolve } from "path";
import { defineConfig } from "vite";
import { plugin } from "vite-plugin-elm";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

export default defineConfig({
  plugins: [plugin(), monacoEditorPlugin({})],
  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
        Main: resolve(__dirname, "index.html"),
      },
    },
  },
});
