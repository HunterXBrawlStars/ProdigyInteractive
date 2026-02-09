import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }

          if (id.includes('node_modules/@mui/')) {
            return 'vendor-mui';
          }

          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion';
          }

          if (id.includes('node_modules/react-icons/')) {
            return 'vendor-icons';
          }

          return undefined;
        }
      }
    }
  }
});
