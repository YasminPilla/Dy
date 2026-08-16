import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Enquanto o site estiver em github.io/Dy/, precisa do prefixo "/Dy/".
  // Quando o domínio próprio (dynegocios.com.br) estiver ativo, troque para base: "/".
  base: process.env.GITHUB_PAGES ? "/Dy/" : "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
