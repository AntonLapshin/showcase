import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Library-mode build for the `showcase` package (npm publishing prep).
 *
 * Relies on the shared source (core engine + thin React gallery) and emits the
 * distributable ESM bundle + type declarations under `dist/`. `react` and
 * `react-dom` are externalized (declared as peerDependencies) so consumers
 * provide their own React. Run via `npm run build:lib` — this is only used for
 * the future npm publish path, not the GitHub Pages demo (`npm run build`).
 */
export default defineConfig({
  plugins: [react()],
  // No demo assets to copy; produce a clean, library-only `dist/` (wipes any
  // prior demo build output first). Type declarations are emitted afterwards by
  // `tsc -p tsconfig.lib.json` (ordered after this build in the `build:lib`
  // script) so they survive Vite's empty-out.
  publicDir: false,
  build: {
    emptyOutDir: true,
    lib: {
      // The public entry re-exported from `package.json` `exports`/`types`.
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "showcase",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        // Keep href/src relative paths out; declarations emitted separately.
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
