<template>
  <ViewWrapper>
    <Container class='small'>
      <div class='content'>
        <Headline :tag='"h1"'>How it's going, {{user.handle}}?</Headline>
        <Tagline>
          One little thing and you are all set!
        </Tagline>
      </div>
      <form>
        <Input
          :label='"Email"'
          :placeholder="'your@email.com'"
          :iconName='"Inbox"'
          :value='this.user.email'
          :error='this.errors.email'
          @keyup.native='onKeyUp($event)'
          :disabled='loading'
        ></Input>
      </form>
      <div class='btn-container'>
        <btn
          class='big brand'
          v-on:click.native='onSubmit($event)'
          :loading='loading'
        >Submit</btn>
      </div>
    </Container>
  </ViewWrapper>
</template>
<script>
import ViewWrapper from '~/components/ViewWrapper'
import Container from '~/components/Container'
import Input from '~/components/Form/Input'
import Headline from '~/components/Headline'
import Tagline from '~/components/Tagline'

import Btn from '~/components/Btn'

export default {
  components: { ViewWrapper, Container, Input, Headline, Tagline, Btn },
  asyncData ({ app, params }) {
    return app.$axios.$get(`users/${params.handle}`)
      .then((res) => {
        return {
          user: res
        }
      })
  },
  data () {
    return {
      errors: {},
      loading: false
    }
  },
  methods: {
    onSubmit (e) {
      this.loading = true

      this.$axios({method: 'PATCH', url: `${this.apiUrl}/users/${this.user.handle}`, data: {email: this.user.email}})
        .then((response) => {
          window.location = '/'
        })
        .catch((error) => {
          this.errors = error.response.data
          this.loading = false
        })
    },
    onKeyUp (e) {
      this.user.email = e.target.value
    }
  }
}
</script>

<style scoped lang='scss'>
  .content {
    text-align: center;
    margin: $spacing * 5;
  }
  .btn-container {
    text-align: center;
  }
</style>
