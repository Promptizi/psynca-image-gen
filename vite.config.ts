import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: mode === "development",
    minify: mode === "production" ? "esbuild" : false,
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-select"],
          supabase: ["@supabase/supabase-js"],
          utils: ["clsx", "tailwind-merge", "date-fns"],
        },
      },
      external: (id) => {
        // Exclude problematic dependencies from bundling if needed
        return false;
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  define: {
    __DEV__: mode === "development",
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@supabase/supabase-js",
      "@tanstack/react-query",
    ],
  },
}));
