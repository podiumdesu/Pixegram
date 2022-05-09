import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    },
  },
  plugins: [reactRefresh()],
  optimizeDeps: {
    exclude: ['ipfs-http-client', 'electron-fetch']
  }
})
