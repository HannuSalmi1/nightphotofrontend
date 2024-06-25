import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
 base: "/",
 plugins: [react(), mkcert()],
 preview: {
  port: 3001,
  strictPort: true,
 },
 server: { 
  https: true ,
  port: 3000,
  strictPort: true,
  host: true,
  origin: "https://0.0.0.0:3000",
  
 },
});
