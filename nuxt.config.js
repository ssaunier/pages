 const resolve = require('path').resolve
 require('dotenv').config()

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Hall of Fame — Pages',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The best web pages around' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    ['nuxt-sass-resources-loader', resolve(__dirname, 'assets/variables.scss')]
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'https://api.pages.xyz/v1'
  },

  loading: false,
  plugins: [
    { src: '~/plugins/globale.js' },
    { src: '~/plugins/masonry.js',    ssr: false },
    { src: '~/plugins/visibility.js', ssr: false },
    { src: '~/plugins/algolia.js' },
    { src: '~/plugins/tweet.js', ssr: false },
    { src:  '~/plugins/axios.js' }
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
    }
  }
}
