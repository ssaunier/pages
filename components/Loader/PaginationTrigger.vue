<template>
<div
  class='component'
  v-is-in-view="{
    showIfPartial: true,
    callback: isVisible
  }"
>
</div>
</template>

<script>

export default {
  methods: {
    isVisible () {
      if (this.$store.state.pagination.next_page && this.$store.state.pagination.next_page !== 1 && !this.$store.state.pagination.loading) {
        this.$store.dispatch('getPosts')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .component {
    position: absolute;
    height: 300px;
    pointer-events: none;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
