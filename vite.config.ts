import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import dts from 'vite-plugin-dts'
import ts from 'typescript'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    dts({
      rollupTypes: true,
      compilerOptions: {
        moduleResolution: ts.ModuleResolutionKind.NodeNext, // vue2 是 commonjs，无法通过 esnext 加载
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./lib', import.meta.url)),
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'TeleportVue2',
      // the proper extensions will be added
      fileName: 'teleport-vue2',
    },
    rollupOptions: {
      plugins: [
        /**
         * Running Babel on the generated code:
         *  https://github.com/rollup/plugins/blob/master/packages/babel/README.md#running-babel-on-the-generated-code
         *
         * Transforming ES6+ syntax to ES5 is not supported yet, there are two ways to do:
         *  https://github.com/evanw/esbuild/issues/1010#issuecomment-803865232
         * We choose to run Babel on the output files after esbuild.
         *
         * @vitejs/plugin-legacy does not support library mode:
         *  https://github.com/vitejs/vite/issues/1639
         */
        getBabelOutputPlugin({
          allowAllFormats: true,
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: false, // Default：false
                // Exclude transforms that make all code slower
                exclude: ['transform-typeof-symbol'],
                // https://babeljs.io/docs/en/babel-preset-env#modules
                modules: false,
              },
            ],
          ],
        }),
      ],
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
