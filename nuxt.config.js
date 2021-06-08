export default {
  target: 'static',

  router: {
    linkExactActiveClass: 'active-link',
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    base: '/',
  },

  head: {
    title: 'Jent',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
    ]
  },

  css: [
    '~/assets/scss/styles.scss',
    'element-ui/lib/theme-chalk/index.css',
    '@splidejs/splide/dist/css/themes/splide-default.min.css'
  ],

  plugins: [
    '~/plugins/anime',
    '~/plugins/moment',
    '~/plugins/parallax',
    '~/plugins/element-ui',

    { src: '~/plugins/slider', mode: 'client' },
    { src: '~/plugins/fullpage', mode: 'client' },
    { src: '~/plugins/paginate', mode: 'client' },
  ],

  components: true,

  buildModules: [],

  modules: [
    '@nuxtjs/axios',
    'nuxt-fullpage.js',
    [
      '@rkaliev/nuxtjs-yandex-metrika',
      {
        id: '74138308',
        accurateTrackBounce:true,
        trackLinks:true,
        webvisor: true,
        clickmap: true,
        debug: true,
        noJS: true,
      },
    ]
    
  ],

  axios: {},
  build: {},
  generate: { fallback: true }
}
