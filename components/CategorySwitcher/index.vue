<template>
  <div class='switcher-container'>
    <div
      :class='{switcher: true, loading: _isEmpty(categories), active: active}'
      @click='displayPopover'
    >
      <Icon
        :name='$store.state.currentCategory.emoji'
        :class="{gradient: true, active: true}"
      ></Icon>
      <div class='switcher-label'>
        {{$store.state.currentCategory.name}}
      </div>
      <div class='visual-helper'>
        <Icon :name='"ChevronUp"' class='small chevron-up'></Icon>
        <Icon :name='"ChevronDown"' class='small chevron-down'></Icon>
      </div>
    </div>
    <popover
      v-if='active'
      v-bind:categories='categories'
      v-bind:hidePopover='hidePopover'
    ></popover>
  </div>
</template>
<script>
  import Icon from '../Icon'
  import Popover from './Popover'
  import { isEmpty } from 'lodash'
  export default {
    components: {
      Icon, Popover
    },
    mounted () {
      this.popupItem = this.$el
      this.$axios.$get(`categories`)
        .then((res) => {
          this.categories = res
        })
    },
    data () {
      return {
        active: false,
        categories: []
      }
    },
    methods: {
      _isEmpty (array) {
        return isEmpty(array)
      },
      displayPopover () {
        this.active = true
      },
      hidePopover () {
        this.active = false
      }
    }
  }
</script>
<style lang='scss' scoped>
.switcher-container { display: inline-block; }

.switcher {
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  padding: 8px;
  margin: -8px;
  border-radius: $radius;
  transition: $shadow-0-transition;
  user-select: none;

  &:hover, &.active {
    box-shadow: $shadow-0;
  }

  &.loading { cursor: wait }

  &-label {
    margin-left: $spacing;
    font-size: 1.22em;
    color: $text_color_light_blue;
  }
}

.visual-helper {
  position: relative;
  top: 0;
  margin-left: $spacing;
}

.chevron-up {
  margin-bottom: -7px;
}
</style>
