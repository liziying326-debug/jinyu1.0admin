import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3001,
      // 代理配置：将请求转发到 Express API 服务器 (3006)
      proxy: {
        '/api': {
          target: 'http://localhost:3006',
          changeOrigin: true,
          rewrite: (path) => path,
        },
        // 代理产品图片请求
        '/product-images': {
          target: 'http://localhost:3006',
          changeOrigin: true,
          rewrite: (path) => path,
        },
      },
    },
  };
});
