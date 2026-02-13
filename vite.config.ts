import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  base: '/will-you-be-my-valentine/',
  plugins: [solid()],
})
