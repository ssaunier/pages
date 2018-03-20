<template>
  <Cropper
    v-if='$store.state.cropMode'
    v-bind='page'
  ></Cropper>
  <div :class="{detail: true, 'has-screenshot': page.screenshot_url}" v-else >
    <section>
    </section>
    <container>
      <page
        v-bind='page'
        :setCropMode='setCropMode.bind(this)'
      ></page>
    </container>
    <section class='sidebar-wrapper'>
      <Sidebar v-bind='page'></Sidebar>
    </section>
  </div>
</template>
<script>
import Container from '~/components/Container'
import Page from '~/components/Page'
import Sidebar from './DetailSidebar'
import Cropper from './Cropper'

export default {
  props: ['page'],

  components: {
    Container, Page, Sidebar, Cropper
  },

  methods: {
    setPageData (data) {
      this.page = data
    },
    setCropMode (value) {
      this.cropMode = value
    }
  }
}
</script>
<style lang='scss' scoped>
.detail {
  display: flex;
  min-height: 100vh;
  padding-top: $spacing * 5;

  @media (max-width: 700px) {
    flex-flow: column;
    padding-top: 0;
  }

  &.has-screenshot {
    padding-bottom: $spacing * 10;
  }
  section {
    flex: 1;
  }
}

.container {
  display: flex;
  @media (max-width: 700px) {
    order: 1;
  }
}

.sidebar-wrapper {
  min-width: 250px;
  padding-right: $spacing * 2;

  @media (max-width: 700px) {
    width: 100%;
    padding: $spacing * 2;
    max-width: 100%;
    order: 0;
    margin-bottom: $spacing * 4;

    & /deep/ .sidebar {
      max-width: 100% !important;
    }
  }

  .sidebar {max-width: 300px;}
}
</style>
