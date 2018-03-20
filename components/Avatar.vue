<template>
  <div class='avatar' :style='{backgroundImage: `url(${src})`}'>
  </div>
</template>

<script>
export default {
  props: ['src']
}
</script>

<style lang='scss'>
  .avatar {
    height: $spacing * 4;
    width: $spacing * 4;
    flex: 0 0 $spacing * 4;
    border-radius: 50%;
    background-size: cover;
    display: block;
    position: relative;

    &:after {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      border: 0.5px solid rgba($text_color, .1);
      border-radius: 50%;
    }

    &.small {
      height: $spacing * 3;
      width: $spacing * 3;
      flex: 0 0 $spacing * 3;
    }

    &.big {
      height: $spacing * 17;
      width: $spacing * 17;
      flex: 0 0 $spacing * 17;
    }

    &.medium {
      height: $spacing * 6;
      width: $spacing * 6;
      flex: 0 0 $spacing * 6;
    }
  }
</style>
