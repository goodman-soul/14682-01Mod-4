import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const VALID_CLIENTS = ['client-a', 'client-b', 'client-c'];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const clientId = env.VITE_CLIENT_ID || (VALID_CLIENTS.includes(mode) ? mode : 'default');

  console.log(`Building for client: ${clientId}`);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: `dist/${clientId}`,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    define: {
      __CLIENT_ID__: JSON.stringify(clientId),
    },
  };
});
