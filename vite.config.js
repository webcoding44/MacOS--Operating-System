import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// import{ resolve , dirname } from 'path';
// import { fileURLToPath } from 'url';




export default defineConfig({
  plugins: [react(), tailwindcss()],
  // resolve : {
  //   alias : {
  //     "#components" : resolve(
  //       dirname(fileURLToPath(import.meta.url)),
  //       "src/components",
  //     ),
  //     "#store" : resolve (dirname(fileURLToPath(import.meta.url)), "src/store"),
  //     "#hos" : resolve (dirname(fileURLToPath(import.meta.url)), "src/hoc"),
  //     "#windows" : resolve (dirname (fileURLToPath(import.meta.url)), "src/windows"),
  //     "#constants": resolve(dirname(fileURLToPath(import.meta.url)), "src/constants"),
  //   },
  // }
})
