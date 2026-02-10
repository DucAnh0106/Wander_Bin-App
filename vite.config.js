import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Change this to your repo name for GitHub Pages deployment
  base: '/Wander_Bin-App/',
})
