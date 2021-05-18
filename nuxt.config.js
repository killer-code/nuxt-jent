export default {
  target: 'static',

  router: {
    linkExactActiveClass: 'active-link'
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
    '~/assets/scss/styles',
    'element-ui/lib/theme-chalk/index.css',
  ],

  plugins: [
    '~/plugins/anime',
    '~/plugins/moment',
    '~/plugins/parallax',
    '~/plugins/element-ui',
    
    { src: '~/plugins/pixi', mode: 'client' },
    { src: '~/plugins/fullpage', mode: 'client' },
  ],

  components: true,

  buildModules: [],

  modules: [
    '@nuxtjs/axios',
    'nuxt-fullpage.js',
  ],

  axios: {},

  build: {}
}
