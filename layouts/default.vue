<template>
  <div :class="{'no-scroll': $store.state.modal}">
    <navbar></navbar>
    <nuxt/>
    <Modal v-if='$store.state.modal'></Modal>
    <SignIn v-if='$store.state.modalSignIn'></SignIn>
    <Alert></Alert>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import {currentUserData} from '~/plugins/currentUserData'
import Modal from '~/components/Modal'
import SignIn from '~/components/Modal/SignIn'
import Alert from '~/components/Alert'

export default {
  components: { Navbar, Modal, SignIn, Alert },
  mixins: [currentUserData],
  head () {
    return {
      bodyAttrs: {
        class: this.$store.state.modal ? 'no-scroll' : ''
      }
    }
  }
}
</script>

<style lang='scss'>
@import url('https://rsms.me/inter/inter-ui.css');

.no-scroll {
  overflow: hidden;
}

html {
  font-family: 'Inter UI',-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: $text_color;
  line-height: 1.4;
}

body {
  overflow-x: hidden;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

a {
  color: $brand_color;
  text-decoration: none;

  &:hover {
    color: darken($brand_color, 10%);
  }
}

a:visited {
  color: lighten($brand_color, 10%);
  text-decoration: none;

  &:hover {
    color: $brand_color;
  }
}
</style>
