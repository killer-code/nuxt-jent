export default {
  target: 'static',

  head: {
    title: 'jent-v2',
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
    '~/plugins/element-ui',
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {},

  build: {
  }
}
