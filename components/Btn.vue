<template>
  <button :class="{btn: true, loading: loading}">
    <span><slot></slot></span>
    <Spinner v-if='loading'></Spinner>
  </button>
</template>

<script>
  import Spinner from '~/components/Spinner'

  export default {
    components: { Spinner },
    props: ['href', 'loading']
  }
</script>

<style lang='scss' scoped>
.btn {
  display: inline-block;
  box-shadow: $shadow-0;
  font-weight: 500;
  padding: 0 $spacing * 1.3;
  line-height: $spacing * 4;
  color: $text_color_light;
  border-radius: $radius;
  cursor: pointer;
  border: none;
  font-size: 1em;
  background: white;
  outline: 0;
  position: relative;

  &.loading {
    /deep/ .spinner {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
    }

    span {
      opacity: 0;
    }
  }

  &:hover {
    background: white !important;
    box-shadow: $shadow-0-hover;
    color: $text_color_light_hover;
  }

  &.big {
    line-height: $spacing * 5;
    padding: 0 $spacing * 2;
  }

  &.brand {
    color: darken($brand_color, 13%);
    background: rgba($brand_color, .07);
    font-weight: 600;
    box-shadow: 0 0 0 1px rgba(darken($brand_color, 20%),.35), 0 1px 2px rgba(3,42,60,.12);

    &:hover {
      background: rgba($brand_color, .1) !important;
      box-shadow: 0 0 0 1px rgba(darken($brand_color, 35%),.3), 0 1px 2px rgba(3,42,60,.12);
    }
  }
}
</style>
