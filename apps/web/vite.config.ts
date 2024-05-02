import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [
    react(),
    env.mode !== "test" && eslintPlugin(),
    checker({
      typescript: true,
    }),
    tsconfigPaths(),
  ],
}));
