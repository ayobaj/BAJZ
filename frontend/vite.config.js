import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api':{
        target: 'http://localhost:5000',
        secure: false, // secure is set to false because of http without the (s)
      }
    }
  },
  plugins: [react()],
})
