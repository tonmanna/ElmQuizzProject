import { resolve } from "path";
import { defineConfig } from "vite";
// import { plugin } from "vite-plugin-elm";

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { type IMonacoEditorOpts } from "vite-plugin-monaco-editor";
import monacoEditorEsmPlugin from "vite-plugin-monaco-editor-esm";

export default defineConfig({
  plugins: [
    react(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    monacoEditorEsmPlugin(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  build: {
    chunkSizeWarningLimit: 4092,
    outDir: "./dist",
    rollupOptions: {
      input: {
        Main: resolve(__dirname, "index.html"),
      },
    },
  },
});
