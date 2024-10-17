import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    manifest: true,
    rollupOptions: {
      external: [fileURLToPath(new URL("screenshot.js", import.meta.url))],
    },
  },
  server: {
    cors: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000/",
      },
    },
  },
});
