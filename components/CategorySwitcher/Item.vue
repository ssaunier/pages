<template>
  <div
    :class="{'category-item-container': true, active: $store.state.currentCategory.id == id}"
  >
    <div
      :class="{'category-item': true, 'active': $store.state.currentCategory.id == id}"
    >
      <Icon :name='emoji' :class="{'gradient': true, active: $store.state.currentCategory.id == id}"></Icon>
      <div class='category-item-label'>
        {{name}}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'

export default {
  props: ['name', 'emoji', 'active', 'slug', 'id'],
  components: { Icon },
  data () {
    return {
      isFakelyActive: this.active
    }
  }
}
</script>

<style lang='scss' scoped>
  .category-item-container {
    padding: $spacing / 2 0;
  }

  .category-item {
    display: flex;
    align-items: center;
    padding: 6px;
    margin: -($spacing / 2);
    cursor: pointer;
    border-left: 6px solid transparent;


    &.active {
      .category-item-label {
        color: darken($brand-color, 10%);
      }
    }

    &:not(.active):hover {
      .category-item-label {
        color: darken($brand-color, 10%);
      }
      & /deep/ .icon {
        &:before {
          background: white;
          opacity: 1;
        }
      }
    }

    &-label {
      margin-left: $spacing;
      font-size: 1.1em;
      color: $text_color_light_blue;
      transition: color .15s ease-in-out;
      transition-delay: .15s;

    }

    & /deep/ .icon {
      width: $spacing * 3.5; height: $spacing * 3.5;
      svg {
        width: $spacing * 2 !important;
      }
    }
  }
</style>
