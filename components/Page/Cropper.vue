<template>
  <div class='cropper'>
    <div v-if='loading || done' class='footer'>
      <Spinner v-if='loading'></Spinner>
      <span>{{footerValue}}</span>
    </div>
    <img :src='screenshot_url' ref='img' @mousemove='this.handleMouseMove' @click='this.handleClick'>
    <div class='helper' :style='{height: helperHeight}'>
    </div>
  </div>
</template>
<script>
  import Spinner from '~/components/Spinner'

  export default {
    props: ['screenshot_url', 'screenshot_width', 'screenshot_height', 'screenshot_id'],
    components: { Spinner },
    methods: {
      handleMouseMove (e) {
        if (!(this.loading || this.done)) {
          const imageHeight = this.$refs.img.clientHeight
          this.helperHeight = `${imageHeight - e.offsetY}px`
        }
      },
      handleClick (e) {
        e.stopPropagation()
        this.loading = true
        const breakPoint = this.screenshot_height / (this.$refs.img.clientHeight / e.offsetY)
        const data = {
          screenshot: {
            crop_h: Math.round(breakPoint),
            crop_w: Math.round(this.screenshot_width),
            crop_x: 0,
            crop_y: 0
          }
        }
        this.$axios.$put(`screenshots/${this.screenshot_id}/crop`, data)
          .then((res) => {
            this.done = true
            this.loading = false

            setTimeout(() => {
              this.$store.commit('setCropMode', false)
            }, 1000)
          })
      }
    },
    data () {
      return {
        helperHeight: '70%',
        loading: false,
        done: false,
        footerValue: 'Cropping, please wait'
      }
    },

    watch: {
      done (newVal) {
        if (newVal) {
          this.footerValue = 'Done!'
        }
      }
    }
  }
</script>

<style scoped lang='scss'>
img {
  display: block;
  margin: auto;
  width: 100%;
  cursor: row-resize;
  box-shadow:
    0px 0px 0px .5px rgba($text_color, .2),
    0px 0px 0px 1px  rgba($text_color, .1),
    0 14px 28px rgba($text_color, 0.25),
    0 10px 10px rgba($text_color, 0.22);
}

.cropper {
  position: relative;
  display: block;
  margin: auto;
}

.helper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($text_color, .9);
  pointer-events: none;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 99;
  padding: $spacing;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 2px rgba($text_color, .2);
  height: 56px;
  padding-left: $spacing * 2;

  .spinner {
    margin-left: -($spacing);
  }

  span {
    font-size: 1.2em;
    opacity: .5;
  }
}
</style>
