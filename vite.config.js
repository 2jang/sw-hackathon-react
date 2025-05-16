import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    allowedHosts: ['notably-sure-hippo.ngrok-free.app', 'dev.2jang.me'],
    proxy: {
      // '/api'로 시작하는 모든 요청을 target으로 전달
      '/api': {
        target: 'http://ahnai1.suwon.ac.kr:5041',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});