import path from 'path'
import fs from 'fs'
const axios = require('axios');

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/animate.css',
    '@/assets/css/vue-croppie.css',
    '@/assets/css/vue-range-slider.min.css',
    '@/assets/sass/reset.sass',
    '@/assets/sass/core.sass',
    '@/assets/sass/fonts.sass',
    '@/assets/sass/layouts.sass',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vue-range-component.client.js',
    '@/plugins/vue-croppie.client.js',
    '@/plugins/chart.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '87920560',
        webvisor: true,
        clickmap: false,
        useCDN: false,
        trackLinks: false,
        accurateTrackBounce: false
      }
    ],
    'bootstrap-vue/nuxt',
    '@nuxtjs/toast'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/account/token/',
            method: 'post',
            propertyName: 'token',
          },
          logout: false,
          user: {
            url: '/account/get/',
            method: 'get'
          },
        },
        tokenType: '',
        tokenName: 'token',
        autoFetchUser: true
      },
    },
    redirect: {
      login: '/auth/',
      logout: '/',
      home: '/'
    },
  },
  robots: {
    UserAgent: '*',
    Allow: '/',
    Disallow: '/cabinet/',
    Disallow: '/admin/',
    Disallow: '/auth/password-recovery/',

    Sitemap: (req) => process.env.NODE_ENV === 'production' ? 'https://goodminecraft.com/sitemap.xml' : 'https://localhost:3006/sitemap.xml'
  },
  sitemap: {
    hostname: `https://goodminecraft.com`,
    exclude: [
      '/cabinet',
      '/cabinet/history',
      '/cabinet/privileges',
      '/cabinet/rent',
      '/cabinet/settings',
      '/cabinet/shop',
      '/cabinet/',
      '/payment_success',
      '/regist/succsess',
      '/cabinet/rent/control',
      '/payment_fail'
    ],
    routes: async () => {
      const staticPage = [
        '/',
        '/auth/',
        '/news/',
        '/regist/',
        '/vote/',
        '/servers/',
        '/start/',
        '/servers/rating/',
        '/donate/'
      ];
      const serversRaw = await axios.get(process.env.NODE_ENV === 'production' ? 'https://goodminecraft.com/express/servers/get/' : 'https://localhost:3005/servers/get/');
      let servers = [];
      for (let i = 0; i < serversRaw.data.list.length; i++) {
        if (!serversRaw.data.list[i].hide) {
          servers.push(`/servers/${serversRaw.data.list[i].id}/`)
        }
      }
      console.log(servers);
      return [...staticPage,...servers];
    }
  },
  router: {
    trailingSlash: true
  },
  server: {
    host: '0.0.0.0',
    port: 3006,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ssl/privkey.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'ssl/fullchain.pem'))
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.NODE_ENV === 'production' ? 'https://goodminecraft.com/express/' : 'https://localhost:3005/'
  },
  toast: {
    position: 'bottom-right',
    duration : 5000
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
