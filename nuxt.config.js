import defaultList from './utils/thelist';
import routesToGenerate from './utils/routesToGenerate';

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
  css: ['~/css/main.css'],
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
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/pwa'
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
      families: ['Lato:500,700&display=swap']
    }
  },
  'google-gtag': {
    id: 'UA-303912-6',
    debug: false
  },
  generate: {
    routes: routesToGenerate
  },
  sitemap: {
    hostname: 'https://sebarancovid19.id',
    lastmod: new Date(),
    changefreq: 'daily',
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date()
    },
    routes: defaultList.map(item => {
      if (item.priority) {
        return {
          url: item.link,
          changefreq: 'daily',
          priority: item.priority || 0.2,
          lastmod: new Date()
        };
      } else {
        return item.link;
      }
    }),
    exclude: ['/indonesia', '/negara/indonesia']
  }
};
