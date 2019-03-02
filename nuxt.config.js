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
      { hid: 'description', name: 'description', content: 'The best web pages around' },
      { name: 'twitter:image', content: '/meta.jpeg' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:image', content: '/meta.jpeg' },
      { name: 'twitter:site', content: '@tchret' },
      { name: "og:title", content: "Hall of Fame — Pages"},
      { name: 'og:description', content: 'The best web pages around.'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  env: {
     baseUrl: 'https://pagesxyzapi.herokuapp.com/v1'
   },

  modules: [
    ['@nuxtjs/axios', {
      baseURL: 'https://pagesxyzapi.herokuapp.com/v1'
    }],
    '@nuxtjs/dotenv',
    ['nuxt-sass-resources-loader', resolve(__dirname, 'assets/variables.scss')],
    ['@nuxtjs/google-analytics', {
      id: 'UA-73728274-6'
    }]
  ],

  axios: {
    baseURL: 'https://pagesxyzapi.herokuapp.com/v1'
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
