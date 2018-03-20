<template>
  <view-wrapper :class="{'view': true}">
    <PageDetail
      v-if='this.$store.state.pageDetail'
      :page='this.$store.state.pageDetail'
    ></PageDetail>
  </view-wrapper>
</template>

<script>
import ViewWrapper from '~/components/ViewWrapper'
import PageDetail from '~/components/Page/Detail'

export default {
  components: { ViewWrapper, PageDetail },

  mounted () {
    this.$axios.$get(`pages/${this.$nuxt.$route.params.page}`)
      .then((res) => {
        this.$store.state.pageDetail = res
        this.loading = false
        this.uploading = false
      })
      .catch((er) => {
        this.$router.push({path: '/404'})
      })
  }
}
</script>

<style scoped lang='scss'>
.view {

}
</style>
