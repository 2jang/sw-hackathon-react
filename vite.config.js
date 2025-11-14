import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // ⬇ dev에서도 jsx-dev-runtime(=fileName/lineNumber 주입) 쓰지 않도록 강제
      babel: {
        presets: [
          [
            "@babel/preset-react",
            {
              runtime: "automatic",
              development: false, // ★ 핵심: dev에서도 prod JSX 변환 사용
            },
          ],
        ],
        plugins: [], // (선택) 아무 것도 필요 없음
      },
    }),
  ],
  base: "./",
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "@material-tailwind/react",
            "framer-motion",
            "@stomp/stompjs",
            "@heroicons/react",
            "@fortawesome/fontawesome-free",
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/free-brands-svg-icons",
            "@fortawesome/free-regular-svg-icons",
            "@fortawesome/free-solid-svg-icons",
            "uuid",
          ],
        },
      },
    },
  },
  server: {
    allowedHosts: ["uswai.2jang.dev", "suwonai.2jang.dev"],
  },
});
