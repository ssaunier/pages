<template>
<div class='tabs'>
  <div v-for='(tab, index) in tabs' class='tab-container'>
    <a
      :class='{active: tab.slug == $store.state.currentTab}'
      @click='handleClick(tab)'
    >
      {{tab.value}}
    </a>
    <div class='separator' v-if='!(index === tabs.length - 1)'></div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        {value: 'Featured', slug: 'featured'}, {value: 'Upcoming', slug: 'upcoming'}
      ],
      activeTab: 0
    }
  },

  methods: {
    handleClick (tab) {
      this.$store.dispatch('getPosts', {action: `pages#${tab.slug}`})
    }
  }
}
</script>

<style lang='scss' scoped>
  .tabs {
    display: flex;
    user-select: none;
    @media (max-width: 700px) {
      display: none;
    }
  }

  .tab-container {
    display: inline-flex;
    align-items: center;
  }

  .separator {
    width: 20px;
    height: 1px;
    opacity: .4;
    background: rgba(3, 42, 60, .5);
    margin: 0 8px;
    border: none !important;
  }

  a {
    color: $text_color !important;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    opacity: .5;
    cursor: pointer;

    &:hover {
      opacity: .7;
    }

    &.active {
      opacity: 1;
    }
  }
</style>
