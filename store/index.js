import Vuex from 'vuex'
import Vue from 'vue'
import { isEmpty, findIndex } from 'lodash'

const createStore = () => {
  return new Vuex.Store({
    state: {
      menuIsActive: false,
      post: {},
      posts: [],
      pagination: {
        next_page: 1,
        url: 'pages/featured',
        action: 'pages#list',
        loading: false
      },
      token: '',
      modal: null,
      modalSignIn: false,
      loading: true,
      layoutMode: 'digger',
      couldBeLoggedIn: true,
      uploadingScreenshot: false,
      currentUser: {},
      pageDetail: null,
      cropMode: false,
      currentCategory: {
        id: 0,
        name: 'Hall of fame',
        emoji: 'Star'
      },
      currentTab: 'featured'
    },
    mutations: {
      setLayout: (state, slug) => {
        window.localStorage.setItem('layout', slug)
        state.layoutMode = slug
      },
      logout: (state) => {
        state.currentUser = {}
        localStorage.removeItem('token')
      },
      setAccessToken: (state, token) => {
        state.token = token
      },
      setCurrentUserData: (state, data) => {
        state.currentUser = data
      },
      openModal: (state, data) => {
        document.title = data.title
        window.history.pushState(null, data.title, `/${data.slug}`)
        state.modal = data.slug
      },
      closeModal: (state) => {
        if (!state.uploadingScreenshot) {
          document.title = state.currentCategory.name
          state.modal = null
          state.pageDetail = null
        }
      },
      setCropMode: (state, value) => {
        state.cropMode = value
      },
      setCurrentCategory: (state, value) => {
        state.currentCategory = value
      },
      setPosts: (state, posts) => {
        state.posts = posts
      },
      setLoading: (state, value) => {
        state.loading = value
      },
      setPaginationLoading: (state, value) => {
        state.pagination.loading = value
      },
      setPagination: (state, value) => {
        state.pagination = value
      },
      addPosts: (state, posts) => {
        if (posts) {
          const newPosts = state.posts.concat(posts)
          state.posts = newPosts
        }
      },
      removePost: (state, slug) => {
        const index = findIndex(state.posts, {slug})
        Vue.delete(state.posts, index)
      },
      updatePost: (state, post) => {
        if (post) {
          const slug = post.slug
          const index = findIndex(state.posts, {slug})

          Vue.set(state.posts, index, post)

          if (state.pageDetail && state.pageDetail.slug === post.slug) {
            Vue.set(state.pageDetail, 'liked', post.liked)
          }
        }
      }
    },
    getters: {
      userSignedIn: state => {
        return !isEmpty(state.currentUser)
      },
      posts: state => {
        return state.posts
      }
    },
    actions: {
      async deletePage ({commit, state}, slug) {
        await this.$axios.$delete(`https://pagesxyzapi.herokuapp.com/v1/pages/${slug}`)
        commit('removePost', slug)
      },
      async updatePage ({commit, state}, page) {
        const response = await this.$axios.$patch(`https://pagesxyzapi.herokuapp.com/v1/pages/${page.slug}`, { page: page.data })
        commit('updatePost', response)
      },
      async getPosts ({commit, state}, pagination) {
        if (pagination) {
          state.posts = []
          commit('setPagination', {
            ...pagination,
            next_page: 1
          })
          let data = {}

          commit('setLoading', true)

          switch (state.pagination.action) {
            case 'pages#featured':
              data.pageTitle = 'Pages — Hall of fame'
              data.url = '/'
              state.pagination.url = `pages/featured`
              state.currentTab = 'featured'
              break

            case 'pages#upcoming':
              data.pageTitle = 'Pages — Upcoming'
              data.url = '/pages/upcoming'
              state.pagination.url = `pages/upcoming`
              state.currentTab = 'upcoming'
              break

            case 'categories#show':
              data.pageTitle = state.currentCategory.name
              data.url = `/type/${state.currentCategory.slug}`
              state.pagination.url = `category/${state.currentCategory.slug}`
              break

            case 'users#pages':
              if (state.pagination.username === state.currentUser.handle) {
                data.pageTitle = 'My pages'
              } else {
                data.pageTitle = `${state.pagination.username} | Pages`
              }
              data.url = `/@/${state.pagination.username || state.currentUser.handle}`
              state.pagination.url = `users/${state.pagination.username || state.currentUser.handle}/pages`
          }

          window.history.pushState(null, data.pageTitle, data.url)
          document.title = data.pageTitle
        }

        commit('setPaginationLoading', true)

        const response = await this.$axios.$get(state.pagination.url.replace('https://api.pages.xyz/v1/', ''), {
          params: {
            page: state.pagination.next_page
          }
        })

        commit('addPosts', response.pages)
        commit('setPagination', response.pagination)
        commit('setLoading', false)
        commit('setPaginationLoading', false)
      },
      async getUserPosts ({commit, state}, username, page) {
        commit('setLoading', true)
        commit('setCurrentCategory', {id: 'profile', name: username})

        const response = await this.$axios.$get(`https://pagesxyzapi.herokuapp.com/v1/users/${username}/pages`, {
          params: { page: page }
        })
        commit('addPosts', response.pages)
        commit('setLoading', false)
        commit('setPagination', response.pagination)
      },
      async upvote ({ commit, state }, page) {
        if (!isEmpty(state.currentUser)) {
          let data = await this.$axios.$post(`https://pagesxyzapi.herokuapp.com/v1/pages/${page.slug}/upvote`)
          commit('updatePost', data)
        } else {
          state.modalSignIn = true
        }
      },
      async upvoted ({ commit, state }, slug) {
        let data = await this.$axios.$get(`https://pagesxyzapi.herokuapp.com/v1/pages/${slug}/upvoted`)
        commit('updatePost', data)
      },
      async nuxtServerInit ({commit, dispatch}, {store, isClient, isServer, route, params, app}) {
        if (isServer && route.query.token) {
          const token = route.query.token
          commit('setAccessToken', token)

          const currentUser = await app.$axios.$get(`https://pagesxyzapi.herokuapp.com/v1/current_session`)
          commit('setCurrentUserData', currentUser)
        }

        if (isServer) {
          let response
          if (route.path === '/') {
            response = await this.$axios.$get(`https://pagesxyzapi.herokuapp.com/v1/pages/featured`, {
              params: {
                page: 1
              }
            })
            commit('setPosts', response.pages)
            commit('setPagination', response.pagination)
          } else if (route.params.slug) {
            try {
              response = await app.$axios.$get(`https://pagesxyzapi.herokuapp.com/v1/category/${route.params.slug}`, {
                params: {
                  page: 1
                }
              })
            } catch (e) {
              // handle errors
            }
            commit('setCurrentCategory', response.category)
            commit('setPosts', response.pages)
            commit('setPagination', response.pagination)
          }
        }
      }
    }
  })
}

export default createStore
