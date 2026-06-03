import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'], // cjs (CommonJS), esm (ES Module), iife (direct script tag)
  dts: true,                      // Generate TypeScript declaration (.d.ts) files
  splitting: false,
  sourcemap: true,
  clean: true,                    // Clean dist folder before building
  minify: true,                   // Minify code for production
  globalName: 'ThrivexHelpWidget',// Global variable name for the script tag format
  loader: {
    '.css': 'text',               // Import .css files as raw text strings
  },
});
