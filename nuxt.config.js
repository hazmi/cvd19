import defaultList from './utils/thelist';
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: { lang: 'id' },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '100x100',
        href: '/icon-100x100.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '180x180',
        href: '/icon-180x180.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/icon-192x192.png'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/jsonld'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-webfontloader',
    '@nuxt/http',
    '@nuxtjs/google-gtag',
    '@nuxtjs/sitemap'
    //  '@nuxtjs/pwa'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  webfontloader: {
    google: {
      families: ['Lato:500,700']
    }
  },
  'google-gtag': {
    id: 'UA-303912-5',
    debug: false
  },
  generate: {
    routes: defaultList.map(item => item.link)
  },
  sitemap: {
    hostname: 'https://cvd19.pw',
    gzip: true,
    routes: defaultList.map(item => item.link)
  }
};
