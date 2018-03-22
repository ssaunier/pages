<template>
  <div class='switcher-container' v-click-outside='() => { popover = false }'>
    <div :class="{'switcher': true, active: popover}" @click='handleMouseEnter'>
      <icon :name='"Grid"'></icon>
    </div>
    <div :class="{'popover': true, active: popover}" v-if='popover'>
      <div class='title'>
        DISPLAY OPTION
      </div>
      <div class='layouts'>
        <div class='layout' v-for='l in layouts'>
          <div
            :class="{[l.slug]: true, active: l.slug === $store.state.layoutMode, item: true}"
            @click="handleClickItem(l.slug);"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import ClickOutside from 'vue-click-outside'

export default {
  components: {
    Icon
  },
  data () {
    return {
      popover: false,
      layouts: [{slug: 'digger'}, {slug: 'classic'}]
    }
  },
  methods: {
    handleMouseEnter () {
      this.popover = true
    },
    handleClickItem (item) {
      this.$store.commit('setLayout', item)
      this.popover = false
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang='scss'>
  .switcher-container {
    position: relative;
  }

  .switcher {
    display: inline-block;
    cursor: pointer;
    padding: 8px;
    margin: -8px;
    border-radius: $radius;

    &:hover {
      background: rgba($text_color, .03);
    }

    &.active {
      border-radius: 3px;
      background: $text_color;

      & /deep/ svg rect { stroke: white; }
    }
  }

  .title {
    color: white;
    padding: 12px;
    padding-bottom: 6px;
    font-weight: bold;
    font-size: 12px;
    opacity: .6;
    letter-spacing: 1px;
  }

  .popover {
    display: none;
    padding-bottom: 12px;
    &.active {
      display: block;
      position: absolute;
      width: 180px;
      background: $text_color;
      top: 24px;
      z-index: 2;
      border-radius: $radius 0 $radius $radius;
      box-shadow: 0 14px 28px rgba(3, 42, 60, .25), 0 10px 10px rgba(3, 42, 60, .22);
      right: -8px;
    }
  }

  .layouts {
    display: flex;
    padding: 0 12px;
  }

  .layout {
    height: 100%;
    flex: 1;
    margin-left: $spacing;

    .item {
      height: $spacing * 5;
      border-radius: $radius;
      background: rgba(white, .1);
      position: relative;
      cursor: pointer;

      &:hover {
        background: rgba(white, .15);
      }

      &.active { &:after { border-color: white !important; } }

      &.digger {
        &:after {
          content: '';
          position: absolute;left: 0; right: 0;bottom: 0; top: 0;
          height: 28px; width: 20px;
          margin: auto;
          border: 3px solid $text_color;
          border-radius: $radius;
        }
      }

      &.classic {
        &:after {
          content: '';
          position: absolute; left: 0; right: 0; bottom: 0; top: $spacing;
          width: 50%;
          border: 3px solid $text_color;
          border-radius: $radius $radius 0 0;
          margin: auto;
          border-bottom: none;
        }
      }

      &.active {
        background: rgba(white, .3);
      }
    }

    &:first-child { margin-left: 0 }
  }

  .layout.digger {

  }
</style>
