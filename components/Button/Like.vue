<template>
  <a @click='handleClick' :class='{liked: post.liked || betaLiked, detail}'>
    <span v-if='detail' class='content'>
      <Icon :name="'Heart'"/> <span>{{ post.liked || betaLiked ? 'In favorites' : 'Add to favorites'}}</span> <i class='counter'></i>
    </span>
    <span v-else>
      <Icon :name="'Heart'"/>
    </span>
  </a>
</template>

<script>
import Icon from '~/components/Icon'
import { isEmpty } from 'lodash'

export default {
  components: { Icon },
  props: ['post', 'detail'],
  methods: {
    handleClick () {
      this.$store.dispatch('upvote', this.post)
      if(this.post.liked) {
        this.betaLiked = false
      } else {
        this.betaLiked = true
      }
    }
  },
  mounted () {
    let interval = setInterval(() => {
       if (!this.$store.getters.couldBeLoggedIn) {
        if (this.$store.getters.userSignedIn) {
          this.$store.dispatch('upvoted', this.post.slug)
          clearInterval(interval)
        }
      }
    }, 200)
  },
  data () {
    return {
      betaLiked: this.post.liked
    }
  }
}
</script>

<style lang='scss' scoped>
  a.liked {
    // background: $pink !important;
    & /deep/ svg path { transition: .15s ease-in-out fill; }
    & /deep/ svg path { fill: $pink !important; stroke: $pink !important }
  }

  a.detail {
    height: $spacing * 5;
    background: $pink;
    display: inline-block;
    width: 100%;
    margin: $spacing 0;
    border-radius: $radius;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 1px rgba(darken($pink, 20%), 1), 0 1px 2px rgba(3,42,60,.12);
    cursor: pointer;
    transition: background .15s ease-in-out;

    &.liked {
      background: white;
      span {
        color: $pink;
      }

      &:hover {
        background: white;
      }
    }

    .content {
      display: flex;
      align-items: center;
    }

    &:hover {
      background: darken($pink, 10%);
    }

    span {
      color: white;
      font-weight: 500;
      margin: 0 $spacing;
    }

    i {
      font-style: normal;
      opacity: .5;
      color: darken($pink, 50%);
      font-weight: bold;
      font-size: .9em;
    }

    & /deep/ svg {
      width: 18px;
      stroke-width: 1.2;
      fill: rgba(white, .15);
      stroke: white !important;
    }
  }

</style>
