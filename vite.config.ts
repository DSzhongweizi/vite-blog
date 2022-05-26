import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown, { link, meta } from 'vite-plugin-md'
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // 需包含 .md 文件
      reactivityTransform: true
    }),
    Unocss({
      /* options */
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head'],
      dts: 'src/auto-imports.d.ts',
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Markdown({
      builders: [
        link(),
        meta({
          routeProps: ['layout', 'requireAuth'],
          defaults: {
            requireAuth: () => false
          }
        })
      ],
      headEnabled: true, // <-- 开启 head 插件
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true
      },
      markdownItSetup(md) {
        md.use(require('markdown-it-anchor')), md.use(require('markdown-it-prism'))
      }
    }),
    Pages({
      dirs: [{ dir: 'docs', baseRoute: '' }],
      extensions: ['vue', 'md'],
      extendRoute(route) {
        route.path = encodeURI(route.path) // 对路径进行编码，处理中文路径问题
        return route
      }
    }),
    Icons({ autoInstall: true }),
    Layouts({ defaultLayout: 'default/index' }),
    Inspect()
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
      doc: './doc'
    }
  }
})
