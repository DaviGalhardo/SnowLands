import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { unlink } from 'node:fs/promises'
import { resolve } from 'node:path'

// Keep development notes and hosting-specific redirects out of production.
function cleanPublicNotes() {
  let outputDir
  return {
    name: 'clean-public-notes',
    apply: 'build',
    configResolved(config) {
      outputDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      for (const file of ['_redirects', 'images/COLOQUE_AQUI_OS_ITENS.txt', 'images/team/COLOQUE_AQUI_AS_FOTOS.txt', 'images/biomes/COLOQUE_AQUI_AS_IMAGENS.txt']) {
        await unlink(resolve(outputDir, file)).catch((error) => {
          if (error.code !== 'ENOENT') throw error
        })
      }
    },
  }
}

export default defineConfig({
  base: '/tecti/2026/gpec15/snowlands/',
  plugins: [react(), tailwindcss(), cleanPublicNotes()],
})
