<template>
  <div class='modal-overlay' @click='this.close'>
    <div class='modal'>
      <div class='close'>
        <Cross></Cross>
      </div>
      <Illustration class='illustration'></Illustration>
      <div>
        <Headline :tag='"h1"'>
          You have to sign in to do this
        </Headline>
        <div class='tagline'>
          Create your pages account in 2 minutes.
        </div>
        <a class='link' :href="`${apiUrl.replace('/v1', '')}/auth/twitter`">
          <Icon :name="'Twitter'"></Icon> Login with twitter
        </a>
        <div class='disclaimer'>
          We will never do anything without your permissions!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cross from '../Icon/Cross'
import Headline from '~/components/Headline'
import Icon from '~/components/Icon'
import Illustration from '~/components/Illustration/SignIn'

export default {
  components: { Cross, Headline, Icon, Illustration },
  methods: {
    close: function () {
      this.$store.state.modalSignIn = false
    }
  }
}
</script>
<style lang='scss' scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background: rgba(white, .96);
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
}

.disclaimer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 24px;
  opacity: .4;
}

.close {
  font-size: 27px;
  position: absolute;
  right: $spacing;
  left: $spacing;
  text-align: right;
  top: 16px;
  right: 16px;

  color: rgb(69, 97, 110);
  cursor: pointer;
  opacity: .4;

  &:hover {
    opacity: .6;
  }

  svg {
    width: 25px;
  }
}

.modal {
  max-width: 800px;
  width: 100%;
  background: #dbf3fe;
  padding: 80px 0;
  text-align: center;
  padding-bottom: 200px;
  box-shadow: 0 2px 10px rgba(0,0,0,.15);
  border-radius: 5px;
  position: relative;
}

a {
  display: inline-block;
  background: white;
  padding: 12px 20px;
  border-radius: 3px;
  font-weight: 500;
  color: #335666;
  box-shadow: 0 2px 10px rgba(0,0,0,.15);
  display: inline-flex;
  align-items: center;
  margin-top: $spacing;
  font-size: 1.1em;
  & /deep/ svg {
    margin-right: $spacing;
    stroke: #2AA3F0;
    stroke-width: 1.2;
    fill: rgba(#2AA3F0, .1);
  }

  &:hover {
    color: #2AA3F0;
  }
}

.tagline {
  opacity: .5;
  font-size: 1.2em;
  margin: $spacing * 2 0;
}

.illustration {
  position: absolute;
  left: -50px;
  bottom: 0;

  @media(max-width: 750px) {
    display: none;
  }
}

.modal {
  overflow: hidden;
}
</style>

