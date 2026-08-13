import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },

  plugins: [
    tanstackStart({
      server: {
        entry: "server",
      },
    }),

    imagetools(),

    // React plugin must come after TanStack Start
    viteReact(),
  ],
});