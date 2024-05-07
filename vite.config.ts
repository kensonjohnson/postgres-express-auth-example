import { defineConfig } from "vite";
import { join } from "node:path";
import { cwd } from "node:process";
import react from "@vitejs/plugin-react";

// Read about the Vite config here: https://vitejs.dev/config/
export default defineConfig({
  root: "frontend",
  build: {
    outDir: join(cwd(), "build/frontend"),
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    // Proxy API requests to the backend, to make them appear as if
    // they are coming from the same origin.
    // Read up here: https://vitejs.dev/config/server-options.html#server-proxy
    proxy: {
      // Shorthand syntax
      // http://localhost:5173/ping -> http://localhost:3000/ping
      "/ping": "http://localhost:3000",
      "/auth": "http://localhost:3000",
      "/user": "http://localhost:3000",
      "/list": "http://localhost:3000",

      // Full syntax
      // http://localhost:5173/api/foo -> http://localhost:3000/foo
      // "/api": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    },
  },
});
