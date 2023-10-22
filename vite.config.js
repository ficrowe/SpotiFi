import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from 'path'

export default () => {
  return defineConfig({
    plugins: [react()],
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".module.scss"],
        // alias: 
        // {'@': path.resolve(__dirname, './src')}
        // [{ find: '@', replacement: path.resolve(__dirname, 'src') }],

        // {
        //     '@screens': './src/ui/screens',
        //     '@components': './src/ui/components',
        //     '@styles': './src/ui/styles',
        //     '@assets': './src/assets',
        //     '@constants': './src/constants',
        //     '@utils': './src/utils',
        //     '@models': './src/models',
        //     '@api': './src/api',
        //     '@myfirebase': './src/firebase',
        //     '@context': './src/context',
        // },
      },
 })
}