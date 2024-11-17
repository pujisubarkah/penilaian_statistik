import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Pastikan Vite mengenali .jsx
  },
  define: {
    global: 'globalThis' // Add this line to replace "global" with "globalThis"
  }
});



