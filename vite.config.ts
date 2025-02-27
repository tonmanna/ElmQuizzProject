import { resolve } from "path";
import { defineConfig } from "vite";
// import { plugin } from "vite-plugin-elm";

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import MarkdownIt from "markdown-it";

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  build: {
    chunkSizeWarningLimit: 3072,
    outDir: "./dist",
    rollupOptions: {
      input: {
        Main: resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: {
          mermaid: ["mermaid"],
          monacoEditor: ["monaco-editor"],
          prismjs: ["prismjs"],
          markdownIt: ["markdown-it"],
          react: ["react"],
          reactDom: ["react-dom"],
        },
      },
    },
  },
});
