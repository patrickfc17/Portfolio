import { resolve } from 'path'
import { defineConfig } from 'vite'
import dynamicImport from 'vite-plugin-dynamic-import'

export default defineConfig({
  plugins: [dynamicImport()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
