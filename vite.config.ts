import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { getFoldersAbsolutePath, parseTsConfig } from './imports.custom';

parseTsConfig();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: getFoldersAbsolutePath(),
  },
});
