<template>
  <div class='sidebar' @click='handleClick'>
    <div class='infos'>
      <div class='title'>
        {{title}}
      </div>
      <div class='description'>
        {{description}}
      </div>
    </div>

    <Like
      :post='this.$props'
      class='detail'
      :detail='true'
    ></Like>
    <div class='author-mention'>
      <Avatar
        :src='$store.state.pageDetail.user.avatar_url'
        class='small'
      />
      {{$store.state.pageDetail.user.handle}} posted this
    </div>
  </div>
</template>
<script>
import Icon from '~/components/Icon'
import Avatar from '~/components/Avatar'
import Like from '~/components/Button/Like'

export default {
  components: { Icon, Avatar, Like },
  props: ['title', 'description', 'slug', 'likes', 'liked'],
  methods: {
    handleClick (e) {
      e.stopPropagation()
    }
  }
}
</script>

<style lang='scss' scoped>

.author-mention {
  padding: $spacing;
  display: flex;
  align-items: center;
  color: rgba($black, .5);

  .avatar {
    margin-right: $spacing;
  }
}
.infos {
  padding: $spacing * 2;
  border: 1px solid rgba($text_color, .15);
  border-radius: $radius;
  background: white;

  .title {
    font-size: 1.1em;
    line-height: 1.4;
  }

  .description {
    opacity: .4;
    margin-top: $spacing;
  }
}

.message {
  background: rgba(darken($brand_color, 30%), 0.05);
  border: 1px solid rgba($text_color, .3);
  border-radius: $radius;
  padding: $spacing;
  display: flex;

  .avatar {margin-right: $spacing;}

  textarea {
    font-size: 1em;
    outline: 0;
    background: none;
    border: none;
    resize: none;
    width: 100%;
    height: 24px;
    padding: 0;
    line-height: 24px;
  }
}
</style>
