<template>
<div class='navbar-border' v-if='!loading'>
</div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  },
  watch: {
    loading: (val) => {
      this.fullName = val + ' ' + this.lastName
    }
  }
}
</script>

<style lang='scss'>
.navbar-border {
  background-image: linear-gradient(to left, #54FCD4 0%, $brand_color 50%);
  height: 3px;
}
</style>
