export default {
  target: 'static',

  router: {
    base: '/',
    linkExactActiveClass: 'active-link',
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    trailingSlash: true,
  },

  head: {
    title: 'Спрей для улучшения мужской потенции джент | Jent',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 
        hid: 'description', 
        name: 'description', 
        content: 'Джент — это инновационное средство для усиления потенции в удобном ' +
        'формате спрея для приема внутрь. Джент воздействует на естественные механизмы ' + 
        'возникновения эрекции и начинаетдействовать уже через 10 минут.'
      },
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

    { src: '~/plugins/slider',   mode: 'client' },
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
        debug: false,
        noJS: true,
      },
    ],
  ],

  axios: {},
  build: {},
  generate: { fallback: true }
}
