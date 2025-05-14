import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    allowedHosts: ['notably-sure-hippo.ngrok-free.app', 'dev.2jang.me'],  // ngrok 도메인 주소
  },
});
