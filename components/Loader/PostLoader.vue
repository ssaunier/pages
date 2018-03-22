<template>
  <div :class='{[`posts-loader-${$store.state.layoutMode} posts-loader`]: true}'>
    <figure></figure>
    <figure></figure>
    <figure></figure>
  </div>
</template>

<style lang='scss' scoped>
.posts-loader {
  flex: 1;

  figure {
    background: $text_color;
    border-radius: 5px 5px 0 0;
    opacity: .05;
    height: 100%;
  }

  &.pagination-helper { position: absolute; top: 0; bottom: 0; left: 0; right: 0 }

  &-digger {
    display: flex;
    height: 100%;

    figure {
      flex: 1;
      margin-right: $spacing * 4;

      &:last-child { margin-right: 0 }

      &:first-child {
        @media (max-width: 1100px) {
          display: none;
        }
      }
    }
  }

  &-classic {
    figure {
      &:last-child { display: none }
      &:first-child { display: none }
    }
  }
}
</style>
