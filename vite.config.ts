import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: __dirname,
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
  },
  server: {
    port: 5173,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
  define: {
    __PROD__: JSON.stringify(true),
  },
});