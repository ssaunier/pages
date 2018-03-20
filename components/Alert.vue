<template>
<div class="alert-container">
  <div class='alert'>
    <img class='image' src='/tchret.jpg' />
    <div class='alert-content'>
      <div class='alert-title'>
        Available for (remote) work
      </div>
      <div class='alert-description'>
        Maker of pages.xyz, coding designer. <br>
        Looking for new opportunities
      </div>
      <div class='alert-actions'>
        <a class='cta' href='https://tchret.com' target='_blank'>About me</a>
        <a class='dismiss'>Dismiss</a>
      </div>
    </div>
  </div>
</div>
</template>

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
    max-width: 400px;
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

    opacity: 0;
    transform: translateY(-20px);

    animation: enter .3s ease forwards;
    animation-delay: 2s;
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
