import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setup-test-env.ts'],
    includeSource: ['app/**/*.{ts,tsx}'],
    exclude: ['node_modules'],
  },
  plugins: [react(), tsconfigPaths()],
});
