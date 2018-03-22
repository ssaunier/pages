<template>
  <div class='navbar-container'>
    <div :class="{[`navbar-${$store.state.layoutMode}`]: true, 'navbar': true}">
      <section class='logo-section'>
        <a href='/'>
          <Logo></Logo>
        </a>
      </section>
      <SearchInput></SearchInput>
      <section>
        <div class='menu'>
          <div v-if='$store.state.couldBeLoggedIn'>
            <Spinner></Spinner>
          </div>
          <div v-else>
            <div v-if='$store.getters.userSignedIn' class='menu-inner'>
              <nuxt-link to="/new">
                <btn class='cta'>Submit a page</btn>
              </nuxt-link>
              <span @click='handleClickAvatar'>
                <Avatar
                  class='avatar-navbar'
                  :src='$store.state.currentUser.avatar_url'
                 ></Avatar>
              </span>
              <div
                class='popover'
                v-if='popover'
                v-click-outside='() => { this.popover = false }'
              >
                <div class='popover-header'>
                  <Avatar
                    class='avatar medium'
                    :src='$store.state.currentUser.avatar_hd_url'
                    @click='handleClickAvatar'
                  ></Avatar>
                  <div>
                    <div class='popover-header-alpha'>
                      {{$store.state.currentUser.name}}
                    </div>
                    <div class='popover-header-beta'>
                      {{$store.state.currentUser.handle}}
                    </div>
                  </div>
                </div>
                <div class='popover-body'>
                  <a :href='`/@/${$store.state.currentUser.handle}`'><Icon :name="'User'"></Icon> My profile</a>
                  <a href='https://twitter.com/intent/tweet?text=@tchret: [your feedback]' target='_blank'><Icon :name="'AlertOctagon'" target='_blank'></Icon>Feedback</a>
                  <hr></hr>
                  <a @click="$store.commit('logout')" target='_blank'><Icon :name="'Zap'"></Icon>Logout</a>
                </div>
              </div>
            </div>
            <div v-else>
              <nuxt-link class='link' to='/about'>About</nuxt-link>
              <a class='link' :href="`${apiUrl.replace('/v1', '')}/auth/twitter`">Sign in</a>
              <span @click='this.launchModalSignIn'><btn class='cta'>Submit a page</btn></span>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Border></Border>
  </div>
</template>

<script>
import Logo from '../Icon/Logo'
import Avatar from '../Avatar'
import Border from './Border'
import Btn from '../Btn'
import Spinner from '../Spinner'
import Icon from '../Icon'
import ClickOutside from 'vue-click-outside'
import SearchInput from '~/components/Form/SearchInput'

export default {
  components: {
    Logo, Avatar, Border, Btn, Spinner, Icon, SearchInput
  },
  data () {
    return {
      popover: false
    }
  },
  methods: {
    handleClickAvatar () {
      this.popover = true
    },
    launchModalSignIn () {
      this.$store.state.modalSignIn = true
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style lang='scss' scoped>
.navbar-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: white;
  z-index: 5;
}

.navbar {
  padding: $spacing * 2;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 4px 0 rgba(black, .1);
  height: $navbar-height;

  .menu {
    margin-left: auto;
    position: relative;
    display: flex;
    justify-content: flex-end;

    & /deep/ .spinner {
      margin-right: -13px;
    }

    &-inner {
      display: flex;
    }

    .link {
      color: $text_color_light;
      padding: $spacing;
      border-radius: $radius;
      font-weight: 500;
      &:hover {
        background: $text_color_ultra_light;
        color: $text_color_light_hover;
      }
    }
  }

}
a {
  &:focus {outline: none}
}

section {
  flex: 1;
}

.cta {
  margin-left: $spacing;

  @media(max-width: 750px) {
    display: none !important;
  }
}

.avatar-navbar {
  margin-left: $spacing;
  cursor: pointer;

  &:hover {
    &:after {
      border-color: rgba($text_color, .3);
    }
  }
}

.popover {
  width: 100%;
  position: fixed;
  right: 0;
  top: 50px;
  right: $spacing * 2;
  background: white;
  border-radius: $radius;
  box-shadow: $popover-shadow;
  max-width: 300px;
  min-height: 150px;
  padding: $spacing * 2;
}

.popover-header {
  display: flex;
  align-items: center;

  .avatar {
    margin-right: $spacing;
  }

  &-alpha {
    font-weight: bold;
    font-size: 1.2em;
    letter-spacing: -0.5px;
  }

  &-beta {
    opacity: .5;
  }
}

.popover-body {
  padding-top: $spacing;

  hr {
    border: none;
    height: 1px;
    background: rgba($text_color, .1);
    margin: $spacing 0;

    &+a {
      margin-bottom: -6px;
    }
  }

  a {
    display: flex;
    align-items: center;
    padding: $spacing / 2 0;
    color: rgba($text_color, .7);
    cursor: pointer;

    &:hover {
      color: rgba($text_color, .9);
    }
  }
  & /deep/ {
    svg {
      width: 20px;
      stroke: rgba($text_color, .3);
      stroke-width: 1px;
      fill: rgba($text_color, .03);
      margin-right: $spacing;
    }
  }
}

.logo-section {
  @media(max-width: 750px) {
    flex: 0;
  }
}
</style>
