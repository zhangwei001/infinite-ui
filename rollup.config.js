import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import excludeDependencies from 'rollup-plugin-exclude-dependencies-from-bundle'
import cleaner from 'rollup-plugin-cleaner'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import babel from 'rollup-plugin-babel'
// import visualizer from "rollup-plugin-visualizer";
import * as fs from 'fs'
import * as path from 'path'

const componentsEntry = [
  'src/index.ts',
  'src/components/action-sheet/index.ts',
  'src/components/arise-loading/index.tsx',
  'src/components/button/index.ts',
  'src/components/checkbox/index.ts',
  'src/components/dialog/index.ts',
  'src/components/divider/index.ts',
  'src/components/ellipsis/index.ts',
  'src/components/exposure/index.ts',
  'src/components/icon/index.ts',
  'src/components/image/index.ts',
  'src/components/image-viewer/index.ts',
  'src/components/infinite-scroll/index.ts',
  'src/components/input/index.ts',
  'src/components/list/index.ts',
  'src/components/loading/index.tsx',
  'src/components/mask/index.ts',
  'src/components/message/index.ts',
  'src/components/page-indicator/index.tsx',
  'src/components/picker/index.ts',
  'src/components/popover/index.ts',
  'src/components/popup/index.ts',
  'src/components/progress-bar/index.ts',
  'src/components/radio/index.ts',
  'src/components/rate/index.ts',
  'src/components/safe-area/index.tsx',
  'src/components/scroll/index.ts',
  'src/components/slider/index.ts',
  'src/components/slipbar/index.ts',
  'src/components/space/index.ts',
  'src/components/stepper/index.ts',
  'src/components/steps/index.ts',
  'src/components/swipe-cell/index.ts',
  'src/components/switch/index.ts',
  'src/components/tab-swiper/index.tsx',
  'src/components/tabs/index.ts',
  'src/components/text-area/index.ts',
  'src/components/toast/index.ts',
  'src/components/video/index.ts',
]

const esmOutput = {
  preserveModules: true,
  // preserveModulesRoot: 'src',
  // exports: 'named',
  assetFileNames: ({ name }) => {
    const { ext, dir, base } = path.parse(name)
    if (ext !== '.css') return '[name].[ext]'
    return path.join(dir, 'style', base)
  },
}

export default [
  // handle es
  {
    input: [...componentsEntry],
    output: [
      {
        dir: 'lib/es',
        format: 'es',
        ...esmOutput,
      },
    ],
    external: ['react', 'react-dom'],
    plugins: [
      cleaner({
        targets: ['./lib/'],
      }),
      excludeDependencies(),
      resolve(),
      commonjs(),
      typescript(),
      postcss({
        extract: 'style/infinite-ui.css',
        plugins: [autoprefixer(), cssnano()],
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      terser(),
      copy({
        targets: [
          { src: 'src/components/icon/font/*', dest: 'lib/es/style/font' },
          { src: './README.md', dest: 'lib' },
          { src: './LICENSE.txt', dest: 'lib' },
          {
            src: './package.json',
            dest: 'lib',
            transform: contents => {
              const parsedJson = JSON.parse(contents.toString())
              delete parsedJson.scripts
              delete parsedJson.devDependencies
              delete parsedJson.publishConfig
              return JSON.stringify(parsedJson, null, 2)
            },
          },
        ],
      }),
      // visualizer({
      //   filename: 'report.html',
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true,
      // }),
    ],
  },
  // handle cjs and umd mode
  {
    input: ['./src/index.ts'],
    output: [
      {
        dir: 'lib/cjs',
        format: 'cjs',
        entryFileNames: '[name].cjs.js',
      },
      {
        dir: 'lib/umd',
        format: 'umd',
        name: 'infinite-ui.umd.js',
      },
    ],
    external: ['react', 'react-dom'],
    plugins: [
      excludeDependencies(),
      resolve(),
      commonjs(),
      typescript(),
      postcss({
        extract: 'style/infinite-ui.css',
        plugins: [autoprefixer(), cssnano()],
      }),
      terser(),
      copy({
        targets: [
          { src: 'src/components/icon/font/*', dest: 'lib/umd/style/font' },
          { src: 'src/components/icon/font/*', dest: 'lib/cjs/style/font' },
        ],
      }),
    ],
  },
  // only handle arise style theme
  {
    input: ['./src/arise.ts'],
    output: [
      {
        dir: 'lib/es/style',
        format: 'es',
        entryFileNames: 'arise.css',
      },
      {
        dir: 'lib/cjs/style',
        format: 'cjs',
        entryFileNames: 'arise.css',
      },
      {
        dir: 'lib/umd/style',
        format: 'umd',
        name: 'arise.css',
      },
    ],
    external: ['react', 'react-dom'],
    plugins: [
      excludeDependencies(),
      resolve(),
      commonjs(),
      typescript(),
      postcss({
        extract: 'arise.css',
        plugins: [autoprefixer(), cssnano()],
      }),
    ],
  },
]
