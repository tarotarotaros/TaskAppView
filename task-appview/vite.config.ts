import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        host: true,
        open: true,
    },
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
    build: {
        outDir: 'dist',
    },
    base: '/',
    plugins: [react()],
});