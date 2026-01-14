import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/vibeBooks/', // GitHub Pages 仓库名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
