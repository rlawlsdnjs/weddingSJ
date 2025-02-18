import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      path: 'path-browserify',
      fs: 'fs-web',
    },
  },
  define: {
    global: 'window', // 'global'을 'window'로 설정
    process: {
      env: {
        NODE_ENV: '"production"',
      },
    },
  },
})
