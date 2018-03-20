<template>
  <view-wrapper>
    <container class='digger'>
      <div class='header'>
        <section class='category-switcher'>
          <CategorySwitcher></CategorySwitcher>
        </section>
        <tabs v-if='upcoming'></tabs>
        <section class='layout-switcher'>
          <LayoutSwitcher></LayoutSwitcher>
        </section>
      </div>
    </container>
    <container
      :class='{loading: $store.state.loading, [$store.state.layoutMode]: true}'>
      <Grid></Grid>
    </container>
  </view-wrapper>
</template>

<script>
import Container from '~/components/Container'
import CategorySwitcher from '~/components/CategorySwitcher'
import LayoutSwitcher from '~/components/LayoutSwitcher'
import Tabs from '~/components/Tabs'
import ViewWrapper from '~/components/ViewWrapper'
import Grid from '~/components/Grid'
import WelcomeHeader from '~/components/WelcomeHeader'

export default {
  components: {
    ViewWrapper,
    CategorySwitcher,
    LayoutSwitcher,
    Container,
    Tabs,
    Grid,
    WelcomeHeader
  },
  props: ['posts', 'category'],
  data () {
    return {
      mounted: false
    }
  },
  mounted () {
    this.$store.commit('setLoading', false)
  },
  computed: {
    upcoming () {
      return this.$store.state.currentCategory.id === 0
    }
  }
}
</script>

<style scoped lang='scss'>
.header {
  padding: $spacing * 4 0;
  display: flex;
  align-items: center;

  section {
    flex: 1;
    &:last-child {
      align-items: center;
      justify-content: flex-end;
      display: flex;
    }
  }
}

.layout-switcher {
  @media (max-width: 700px) {
    display: none !important;
  }
}

.category-switcher {
  @media (max-width: 700px) {
    text-align: center;

    & /deep/ .popover {
      width: auto;
      max-width: auto;
      left: $spacing * 2;
      right: $spacing * 2;
    }
  }
}
</style>
