export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
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
  plugins: [],
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
    '@nuxtjs/google-gtag'
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
    routes: [
      '/provinsi/aceh',
      '/provinsi/sumatera-utara',
      '/provinsi/sumatera-barat',
      '/provinsi/riau',
      '/provinsi/jambi',
      '/provinsi/sumatera-selatan',
      '/provinsi/bengkulu',
      '/provinsi/kepulauan-bangka-belitung',
      '/provinsi/lampung',
      '/provinsi/kepulauan-riau',
      '/provinsi/dki-jakarta',
      '/provinsi/jawa-barat',
      '/provinsi/jawa-tengah',
      '/provinsi/daerah-istimewa-yogyakarta',
      '/provinsi/jawa-timur',
      '/provinsi/banten',
      '/provinsi/bali',
      '/provinsi/nusa-tenggara-barat',
      '/provinsi/nusa-tenggara-timur',
      '/provinsi/kalimantan-tengah',
      '/provinsi/kalimantan-barat',
      '/provinsi/kalimantan-selatan',
      '/provinsi/kalimantan-timur',
      '/provinsi/kalimantan-utara',
      '/provinsi/sulawesi-utara',
      '/provinsi/sulawesi-tengah',
      '/provinsi/sulawesi-selatan',
      '/provinsi/sulawesi-tenggara',
      '/provinsi/sulawesi-barat',
      '/provinsi/gorontalo',
      '/provinsi/maluku',
      '/provinsi/maluku-utara',
      '/provinsi/papua',
      '/provinsi/papua-barat'
    ]
  }
};
