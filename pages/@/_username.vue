<template>
  <ViewWrapper class='view'>
    <Container :class='{loading: $store.state.loading, [$store.state.layoutMode]: true}'>
      <div class='header'>
        <Avatar :src='user.avatar_url' class='big'></Avatar>
        <div class='infos'>
          <div class='alpha'>
            {{user.handle}}
          </div>
          <div class='beta'>
            {{user.name}}
          </div>
          <div class='description'>
            <VueMarkdown :source='user.description'></VueMarkdown>
          </div>
        </div>
        <div class='counters'>
          <div v-for='(counter, i) in user.counters' class='counter'>
            <div class='counter-inner'>
              <div class='counter-value'>
                {{counter.value}}
              </div>
              <div class='counter-label'>
                {{counter.label}}
              </div>
            </div>
            <hr v-if='i !== (user.counters.length - 1)'></hr>
          </div>
        </div>
      </div>
      <Grid></Grid>
    </Container>
  </ViewWrapper>
</template>

<script>
import ViewWrapper from '~/components/ViewWrapper'
import Avatar from '~/components/Avatar'
import Container from '~/components/Container'
import VueMarkdown from 'vue-markdown'
import Grid from '~/components/Grid'

export default {
  components: { ViewWrapper, Avatar, Container, VueMarkdown, Grid },
  asyncData ({ app, params, error }) {
    return app.$axios.$get(`users/${params.username}`)
      .then((res) => {
        return {
          user: res
        }
      }).catch((er) => {
        error({ statusCode: 404, message: er.message })
      })
  },

  mounted () {
    this.$store.dispatch('getPosts', {action: 'users#pages', username: this.user.handle})
  }
}
</script>

<style lang='scss' scoped>
  .header {
    padding: $spacing * 5 0;
    display: flex;
    align-items: center;
  }

  .content {
    height: 200vh;
    background: white;
    position: relative;
    margin-top: 200px;
  }

  .infos {
    margin-left: $spacing * 2;
    flex: 1;
  }

  .alpha {
    font-size: 30px;
    font-weight: 200;
    letter-spacing: -1px;
  }

  .beta {
    font-size: 1.3em;
    opacity: .5;
  }

  .description {
    margin-top: $spacing *2;
    max-width: 300px;
    line-height: 1.5;
  }

  .counters {
    display: flex;
    text-align: center;
    align-items: center;
    hr {
      border: none;
      width: 1px;
      background: rgba(3, 42, 60, 0.12);
      margin: 0 $spacing * 2;
      height: $spacing * 2;
    }
  }

  .counter {
    display: flex;
    align-items: center;

    &-value {
      font-size: 1.2em;
      font-weight: bold;
    }

    &-label {
      opacity: .5;
    }
  }
</style>
