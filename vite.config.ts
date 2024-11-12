import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
    proxy: {
      '/api': {
        target: 'https://localhost:8082', // Replace with your API base URL
        changeOrigin: true,
        secure: false, // Disable SSL verification
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Additional proxy configuration if needed
          });
        },
      },
    },
  },
});
