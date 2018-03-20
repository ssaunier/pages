<template>
  <div class='modal-overlay' @click="this.close">
    <div class='close' v-if='this.$store.state.pageDetail'>
      <Cross></Cross>
    </div>
    <div v-if='this.$store.state.pageDetail'>
      <Detail :page='this.$store.state.pageDetail'></Detail>
    </div>
    <div v-else class='spinner-container'>
      <Spinner class='big'></Spinner>
    </div>
  </div>
</template>

<script>
import Detail from '../Page/Detail'
import Spinner from '../Spinner'
import Cross from '../Icon/Cross'

export default {
  components: { Detail, Spinner, Cross },
  mounted () {
    this.$axios.$get(`pages/${this.$store.state.modal}`)
      .then((res) => {
        this.$store.state.pageDetail = res
      })
  },
  methods: {
    close: function () {
      if (this.$store.state.pageDetail) {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background: rgba(white, .96);
  overflow: scroll;
}

.close {
  margin-top: $spacing * 5;
  border-radius: 0 20em 20em 0;
  font-size: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 5px;
  padding-bottom: 1px;
  position: fixed;
  z-index: 99;
  left: 0;
  height: 40px; width: 40px;
  background: rgba($text_color, .1);
  color: rgb(69, 97, 110);
  cursor: pointer;

  svg {
    width: 20px;
  }

  &:hover {
    color: darken(rgb(69, 97, 110), 20%);
    background: rgba($text_color, .15);
  }
}

.spinner-container {
  position: absolute; left: 0; right: 0; top: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
