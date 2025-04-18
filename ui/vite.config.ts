import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
import dts from 'vite-plugin-dts'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts()],
  base: '/amaru-js/',
  build: {
    lib: {
      //Defines the entry point for the library build. It resolves 
      //to src/index.ts,indicating that the library starts from this file.
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "amaru-ui",
      fileName: () => `index.js`,
      formats: ['es'],
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // your custom rules
        '../lib/pkg/',
      ],
    },
  },
})
