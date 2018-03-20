<template>
  <div :class='{container: true}'>
    <slot>
    </slot>
  </div>
</template>

<style lang='scss'>
  .container {
    max-width: $container-size;
    padding: 0 $spacing * 2;
    width: 100%;
    margin: 0 auto;
    // transition: max-width .15s ease-in-out;

    &.small {
      max-width: 500px;
    }

    &.digger {
      max-width: 1500px;
      padding: 0 $spacing * 4;

      @media(max-width: 700px) {
        padding: 0 $spacing * 2;
      }
    }

    &.classic {
      max-width: 700px;
    }
  }

  .container.loading {
    height: calc(100vh - 50px);
    display: flex;
    flex-flow: column;
  }
</style>
