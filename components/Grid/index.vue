<template>
  <div v-if='!$store.state.loading' :style="{position: 'relative'}">
    <PostLoader
      class='pagination-helper'
      v-if='this.$store.state.pagination.next_page'
    ></PostLoader>
    <masonry
      ref='grid'
      :cols="{default: 3, 1200: 2, 700: 1}"
      :style="{position: 'relative'}"
      :gutter="{default: 32, 700: '16px'}"
      v-if="$store.state.layoutMode === 'digger'"
    >

      <div v-for="(item, index) in posts" class='post-container'>
        <Page v-bind='item' v-bind:isItem='true'></Page>
      </div>
    </masonry>
    <div v-else>
      <div v-for="(item, index) in posts" class='post-container classic'>
        <Page v-bind='item' v-bind:isItem='true'></Page>
      </div>
    </div>
    <PaginationTrigger>
    </PaginationTrigger>
  </div>
  <PostLoader v-else></PostLoader>
</template>

<script>
import PaginationTrigger from '~/components/Loader/PaginationTrigger'
import PostLoader from '~/components/Loader/PostLoader'
import Page from '~/components/Page'
import { mapState } from 'vuex'

export default {
  components: {
    PaginationTrigger,
    PostLoader,
    Page
  },
  props: ['category'],
  data () {
    return {
      mounted: false
    }
  },
  mounted () {
    this.$store.commit('setLoading', false)
  },
  computed: mapState({
    posts: state => state.posts
  })

}
</script>

<style lang='scss' scoped>
.post-container {
  padding-bottom: $spacing * 4;
  background: white;
  position: relative;

  &.classic {
    padding-bottom: $spacing * 8;
  }

  & /deep/ {
    .body { cursor: zoom-in }
    .page {
      transition: box-shadow .15s ease-in-out;
    }
    .page:hover {
      box-shadow:
        0px 0px 0px 0.5px rgba(3, 42, 60, .2),
        0px 0px 0px 1px rgba(3, 42, 60, .1),
        0 19px 38px rgba($text_color,0.30),
        0 15px 12px rgba($text_color,0.22);
    }
  }
}
</style>
