import Vue from 'vue'

export const apiUrl = process.env.NODE_ENV === 'development' ? 'http://lvh.me:3000/v1' : 'https://api.pages.xyz/v1'

Vue.mixin({
  data () {
    return {
      apiUrl: apiUrl
    }
  }
})
