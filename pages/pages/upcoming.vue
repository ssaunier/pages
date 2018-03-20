<template>
  <Layout />
</template>

<script>
import Layout from '~/components/Layout'

export default {
  components: { Layout },
  mounted () {
    this.$store.dispatch('getPosts', {action: 'pages#upcoming'})
  }
}
</script>
