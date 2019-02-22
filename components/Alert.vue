<template>
<div class="alert-container">
  <div :class="{'alert': true, active: !hidden}">
    <img class='image' :src='image' />
    <div class='alert-content'>
      <div class='alert-title'>
        {{title}}
      </div>
      <div class='alert-description' v-html='description'>
      </div>
      <div class='alert-actions'>
        <a class='cta' :href='ctaUrl' target='_blank'>{{ctaValue}}</a>
        <a class='dismiss' @click='handleDismiss'>Dismiss</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  mounted() {
    this.nextAlert()
  },
  data () {
    return {
      hidden: true,
      title: 'Available for (remote) work',
      description: "Maker of pages.xyz, coding designer. <br> Looking for new opportunities",
      ctaUrl: "https://www.tchret.com",
      ctaValue: "About me",
      currentAlert: "tchret",
      image: "/tchret.jpg"

    }
  },

  methods: {
    handleDismiss () {
      this.hidden = true
      window.localStorage.setItem(`alert-${this.currentAlert}`, true)
      this.nextAlert()
    },
    nextAlert () {
      if (!localStorage.getItem('alert-ph')) {
        this.hidden = false
        this.currentAlert = 'ph'
        this.title = 'Pages is on Product Hunt'
        this.description = "Check us out on PH<br> 🐱Meow"
        this.ctaValue = "Join the discussion"
        this.ctaUrl = 'https://www.producthunt.com/posts/pages'

        this.image = "/ph.png"
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@keyframes enter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.alert-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  text-align: center;
  pointer-events: none;

  a {
    cursor: pointer;
  }

  .alert {
    background: $black;
    display: inline-block;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    margin-bottom: 16px;
    border-radius: 20em;
    display: inline-flex;
    align-items: center;
    padding: 8px;
    font-size: 13px;
    pointer-events: auto;

    max-width: 300px;
    width: 100%;

    opacity: 0;
    transform: translateY(-20px);
    animation-delay: 2s !important;
    pointer-events: none;

    &.active {
      pointer-events: auto;
      animation: enter .3s ease forwards;
    }

  }

  .alert-content {
    text-align: left;
    padding-left: 8px;
  }

  .alert-title {
    color: white;
    font-weight: 500;
  }

  .alert-description {
    color: #c5edff;
    margin: $spacing / 2 0;
    font-size: 12px;
    margin-left: 0; margin-right: 0;
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .cta {
    color: white;
    margin-right: $spacing;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  .dismiss {
    color: white;
    opacity: .7;

    &:hover {
      opacity: .8;
    }
  }
}
</style>
