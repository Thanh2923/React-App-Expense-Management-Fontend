import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://react-app-expense-management.vercel.app/',
  build: {
    outDir: 'dist', // Đảm bảo đường dẫn mặc định khi build
  },
})
