
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Baikal Mining Company',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: 'plugins/owl.js',
      ssr: false
    },
    {
      src: 'plugins/timeout.js',
      ssr: false
    },
    {
      src: 'plugins/mask.js',
      ssr: false
    },
    {
      src: 'plugins/map.js',
      ssr: false,
      mode: 'client'
    },
    {
      src: 'plugins/modal.js',
      ssr: false
    },
    {
      src: '~/plugins/axios.js',
      ssr: true
    },
    {
      src: '~/plugins/chart.js',
      ssr: true
    },
    {
      src: '~/plugins/route.js',
    }
    // {
    //   src: '~/plugins/cookie.js', ssr: false, injectAs: 'cookie'
    // }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    // '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    prefix: '/api',
    proxyHeaders: true,
    credentials: true
  },
  proxy: {
    '/users': {
      target: ' https://core.bmc.ai/users',
        changeOrigin: true,
        pathRewrite: {
        '^/users': ''
      }
    },
    '/api/login': {
      target: 'https://core.bmc.ai/api/login',
      changeOrigin: true,
      pathRewrite: {
        '^/api/login': ''
      }
    },
    '/api/register': {
      target: 'https://core.bmc.ai/api/register',
      changeOrigin: true,
      pathRewrite: {
        '^/api/register': ''
      }
    },
    '/api/user': {
      target: 'https://core.bmc.ai/api/user',
      changeOrigin: true,
      pathRewrite: {
        '^/api/user': ''
      }
    },
    '/api/password/email': {
      target: 'https://core.bmc.ai/api/password/email',
      changeOrigin: true,
      pathRewrite: {
        '^/api/password/email': ''
      }
    },
    '/api/password/reset': {
      target: 'https://core.bmc.ai/api/password/reset',
      changeOrigin: true,
      pathRewrite: {
        '^/api/password/reset': ''
      }
    },
    '/users/set/': {
      target: 'https://core.bmc.ai/users/set/',
      changeOrigin: true,
      pathRewrite: {
        '^/users/set/': ''
      }
    },
    'api/login/google': {
      target: 'https://core.bmc.ai/api/login/google',
      changeOrigin: true,
      pathRewrite: {
        '^api/login/google': ''
      }
    },
    'api/login/facebook': {
      target: 'https://core.bmc.ai/api/login/facebook',
      changeOrigin: true,
      pathRewrite: {
        '^api/login/facebook': ''
      }
    },
    'https://hashratecost.com/json/get_data_day_avg_sha256x2.json': {
      target: 'https://hashratecost.com/json/get_data_day_avg_sha256x2.json',
      changeOrigin: true,
      pathRewrite: {
        'https://hashratecost.com/json/get_data_day_avg_sha256x2.json': ''
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: '/login', method: 'post', propertyName: 'token' },
  //         logout: { url: '/logout', method: 'post' },
  //         user: { url: '/user', method: 'get', propertyName: false }
  //       },
  //       tokenRequired: true
  //       // globalToken: true
  //       // autoFetchUser: true
  //     }
  //   }
  // }
}
