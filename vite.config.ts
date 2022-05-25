import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown, { link, meta } from 'vite-plugin-md'
import Pages from 'vite-plugin-pages'
import prism from 'markdown-it-prism'
import anchor from 'markdown-it-anchor'

// import MarkdownPreview, { transformer } from 'vite-plugin-md-preview'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // 需包含 .md 文件
      reactivityTransform: true,
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head'],
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    Markdown({
      builders: [link(), meta({
        routeProps: ['layout', 'requireAuth'],
        defaults: {
          requireAuth: () => false,
        },
      })],
      // transforms: {
      //   before: transformer // -> 1. 为 vite-plugin-md 添加 transformer
      // },
      headEnabled: true, // <-- 开启 head 插件
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        // add anchor links to your H[x] tags
        md.use(anchor)
        // add code syntax highlighting with Prism
        md.use(prism)
      },
    }),
    Pages({
      dirs: [
        { dir: 'docs', baseRoute: '' },
      ],
      extensions: ['vue', 'md'],
      extendRoute(route) {
        route.path = encodeURI(route.path)
        return route
      },
    }),
    Layouts(),
    Inspect(),
  ],
  // server: {
  //   port: process.env.VITE_PORT,
  //   // 是否自动在浏览器打开
  //   open: true,
  //   // 是否开启 https
  //   https: false,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3333/',
  //       changeOrigin: true,
  //       rewrite: pathStr => pathStr.replace('/api', '')
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@': './src',
      'doc': './doc'
    }
  }
})
