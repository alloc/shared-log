import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/sharedLog.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  noExternal: ['callsites'],
})
