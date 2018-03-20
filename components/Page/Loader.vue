<template>
  <div class='loader' :style="{width: `${counter}%`}">
  </div>
</template>

<script>
export default {
  data () {
    return {
      counter: 0
    }
  },
  mounted () {
    setInterval(() => {
      if (this.counter < 100) {
        this.counter += Math.random()
      }
    }, 200)
  }
}
</script>

<style lang='scss'>
.loader {
  height: 2px;
  background: white;
  position: absolute;
  left: 0;
  top: 0;
  transition: width ease-in-out .5s;
}
</style>
