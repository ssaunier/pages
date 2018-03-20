<template>
  <div :is='tag'>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['tag']
  }
</script>

<style scoped lang='scss'>
h1, h2, h3 {
  margin: 0;
  color: $text_color;
}

h1 {
  font-size: 2.5em;
  font-weight: 100;
  letter-spacing: -1px;
  @media(max-width: 750px) {
    font-size: 2em;
  }
}

h2 {
  font-size: 2.5em;
  font-weight:300;
}
</style>


