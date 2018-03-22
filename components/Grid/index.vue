<template>
  <div v-if='!$store.state.loading' :style="{position: 'relative'}">
    <PostLoader
      class='pagination-helper'
      v-if='this.$store.state.pagination.next_page'
    ></PostLoader>
    <div
      v-if="$store.state.layoutMode === 'digger'"
      class='grid'
    >

      <div v-for='column in postsInGrid()' class='column'>
        <div v-for='post in column' class='post-container'>
          <Page v-bind='post' v-bind:isItem='true'></Page>
        </div>
      </div>
    </div>
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
  methods: {
    postsInGrid () {
      let posts = this.posts
      let newPosts = [[], [], []]
      let counter = 0

      for (let i = 0; i < posts.length; i++) {
        newPosts[counter].push(posts[i])
        counter += 1
        let columnNumber
        if(window.innerWidth > 1100) {
          columnNumber = 3
        } else if (window.innerWidth > 750) {
          columnNumber = 2
        } else {
          columnNumber = 1
        }

        if (counter === columnNumber) {
          counter = 0
        }
      }
      return newPosts
    }
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

.grid {
  display: flex;
  margin-left: -32px
}

.column {
  flex: 0 0 33.33333%;
  width: 33.33333%;
  box-sizing: border-box;
  background-clip: padding-box;
  border-width: 0px 0px 0px 32px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;

  @media(max-width: 1100px) {
    flex: 0 0 50%;
    &:nth-child(3) {
      display: none
    }
  }

  @media(max-width: 750px) {
    flex: 0 0 100%;
    &:nth-child(2) {
      display: none
    }
  }
}
</style>
