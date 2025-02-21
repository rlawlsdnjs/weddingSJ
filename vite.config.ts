import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/weddingSJ/', // GitHub 저장소 이름으로 설정
  plugins: [react()],
})
