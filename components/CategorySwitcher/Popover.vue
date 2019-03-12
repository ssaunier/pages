<template>
  <div
    :class='{popover: true, active: true}'
    v-on-clickaway='this.$parent.hidePopover'
    @mouseleave='resetPopoverHighlightY'
    >
    <div class='popover-inner'>
      <div
        class='popover-highlight'
        :style="{transform: `translateY(${popoverHighlightY}%)`}"
      >
      </div>
      <div
        @mouseenter='setPopoverHighlightY(0)'
        :style="{position: 'relative'}"
        @click='handleHomeClick'
      >
        <item
          v-bind="{id: 0, name: 'Hall of fame', emoji: 'Star'}"
        ></item>
      </div>
      <div
        v-for='(item, index) in categories'
      >
        <div
          :style="{position: 'relative'}"
          @mouseenter='setPopoverHighlightY((index + 1) * 100)'
          @click="handleItemClick(item)"
        >
          <item
            v-bind='item'
            v-bind:active='false'
          ></item>
        </div>
      </div>
      <hr></hr>
      <div
        @mouseenter='setPopoverHighlightY((categories.length + 1.31) * 100)' :style="{position: 'relative'}"
        @click="this.handleMyPagesClick"
      >
        <item
          v-bind="{id: 'user', name: 'My pages', emoji: 'Heart'}"
        ></item>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Item'
import ClickOutside from 'vue-click-outside'
import { isEmpty } from 'lodash'
import { mixin as clickaway } from 'vue-clickaway';

export default {
  components: { Item },
  mixins: [ clickaway ],

  props: ['active', 'categories', 'hidePopover'],
  mounted () {
    this.resetPopoverHighlightY()
  },
  methods: {
    setPopoverHighlightY (value) {
      this.popoverHighlightY = value
    },
    handleItemClick (item) {
      this.$store.commit('setCurrentCategory', item)
      this.$store.dispatch('getPosts', {action: 'categories#show'})
      this.hidePopover()
    },
    handleHomeClick (item) {
      let currentCategory = {}
      currentCategory.emoji = 'Star'
      currentCategory.name = 'Hall of fame'
      currentCategory.id = 0

      this.$store.commit('setCurrentCategory', currentCategory)
      this.$store.dispatch('getPosts', {action: 'pages#featured'})
      this.hidePopover()
    },
    handleMyPagesClick (item) {
      if (isEmpty(this.$store.state.currentUser)) {
        this.$store.state.modalSignIn = true
      } else {
        let currentCategory = {}
        currentCategory.emoji = 'Heart'
        currentCategory.name = 'My pages'
        currentCategory.id = 'user'

        this.$store.commit('setCurrentCategory', currentCategory)
        this.$store.dispatch('getPosts', {action: 'users#pages'})
        this.hidePopover()
      }
    },
    resetPopoverHighlightY () {
      const activeIndex = this.categories.findIndex(i => i.id === this.$store.state.currentCategory.id)

      if (this.$store.state.currentCategory.id === 'user') {
        this.popoverHighlightY = (this.categories.length + 1.31) * 100
      } else if (activeIndex === -1) { // current category is home
        this.popoverHighlightY = 0
      } else {
        this.popoverHighlightY = (activeIndex + 1) * 100
      }
    }
  },
  mounted() {
  },
  data () {
    return {
      popoverHighlightY: 0,
      myPages: false
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style lang='scss' scoped>
.popover {
  position: absolute;
  margin-left: -($spacing);
  margin-top: $spacing * 2;
  padding: $spacing;
  border-radius: $radius;
  background: white;
  z-index: 2;
  cursor: default;
  box-shadow:
    0px 0px 0px .5px rgba($text_color, .2),
    0px 0px 0px 1px  rgba($text_color, .1),
    0 14px 28px rgba($text_color, 0.25),
    0 10px 10px rgba($text_color, 0.22);
  opacity: 0;
  transition: ease-in-out opacity .15s;
  pointer-events: none;
  min-width: 250px;

  &.active {
    opacity: 1;
    pointer-events: auto;
    box-shadow: $popover-shadow;
  }
}

.popover-inner {
  position: relative;
}

.popover-highlight {
  background: rgba($brand_color, .15);
  border-radius: $radius;
  position: relative;
  border-left: 3px solid $brand_color;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
  transition: transform .15s ease-in-out;

  &:after {
    content: '';
    position: absolute;
    left: 5px;
    bottom: 0;
    top: 0;
    height: 28px; width: 28px;
    margin: auto;
    border-radius: 50%;
    background: white;
  }
}

hr {
  margin: 0;
  height: 1px;
  margin: 6px 10px;
  background: rgba($text_color, .1);
  border: none;
}
</style>
