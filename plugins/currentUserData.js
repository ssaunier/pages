export const currentUserData = {
  mounted () {
    window.onpopstate = (event) => {
      this.$store.commit('closeModal')
    }

    if (this.$route.query.token) {
      window.localStorage.setItem('token', this.$route.query.token)
      this.$router.push({ path: '/' })
    }

    if (localStorage.getItem('layout')) {
      this.$store.state.layoutMode = localStorage.getItem('layout')
    }

    if (localStorage.getItem('token')) {
      this.$store.state.token = localStorage.getItem('token')
      this.$axios.$get(`current_session`)
        .then((res) => {
          this.$store.state.couldBeLoggedIn = false
          this.$store.state.currentUser = res
          console.log(res)
        })
        .catch((res) => {
          // TODO: handle token error
        })
    } else {
      this.$store.state.couldBeLoggedIn = false
    }
  }
}
