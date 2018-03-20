<template>
  <div>
  <div class='header-welcome'>
    <div class='header-welcome-title'>
      The best pages around
    </div>
    <div class='header-welcome-tagline'>
      The magazine about web pages. <br />Create your account today and start collecting and submitting pages!
    </div>

    <a :href="`${apiUrl.replace('/v1', '')}/auth/twitter`">Sign up</a>
  </div>
  </div>
</template>

<style scoped lang='scss'>
.header-welcome {
  padding: 40px 0;
  border-bottom: 1px solid rgba($black, .1);

  &-title {
    font-size: 28px;
    font-weight: bold;
    letter-spacing: -1px;
  }
}

.header-welcome-tagline {
  margin: ($spacing * 2) 0;
  margin-bottom: $spacing * 3;
  font-size: 1.1em;
  line-height: 1.5;
  opacity: .6;
}

a {
  display: inline-block;
  box-shadow: 0 0 0 1px rgb(83, 182, 224), 0 1px 2px rgba(3, 42, 60, .12);
  font-weight: 500;
  padding: 0 $spacing * 1.3;
  line-height: $spacing * 4;
  color: $text_color_light;
  border-radius: $radius;
  cursor: pointer;
  border: none;
  font-size: 1em;
  background: white;
  outline: 0;
  position: relative;
  background: $brand_color;
  color: white;
}
</style>
