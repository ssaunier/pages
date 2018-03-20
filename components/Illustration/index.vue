<template>
<span class='illustration'>
  <img :src='src' />
</span>
</template>

<script>
export default {
  props: ['src']
}
</script>

<style lang='scss' scoped>
.illustration {
  display: inline-block;
  text-align: center;
}
img { width: 50% }
</style>
