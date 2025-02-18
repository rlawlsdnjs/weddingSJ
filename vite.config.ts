import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // crypto 모듈을 crypto-browserify로 대체
      crypto: 'crypto-browserify',
    },
  },
  define: {
    // process.env.NODE_ENV나 global 객체를 사용하려면 이렇게 설정해줍니다
    global: {},
  },
})
