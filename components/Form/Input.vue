<template>
  <div>
    <div :class="{'label-container': true, error: error}">
      <label for='url'>{{label}}</label>
      <div class='error-text' v-if='error'>
        {{this.error}}
      </div>
    </div>
    <div :class='{"input-container": true, error: error}'>
      <Icon :name='iconName' />
      <input
        :value='value'
        class='input'
        :disabled='loading'
        :name='name'
        :placeholder="placeholder"
        autocomplete='off'
        :id='name'
      />
    </div>
  </div>
</template>

<script>
import Icon from '~/components/Icon'
export default {
  components: { Icon },
  props: ['error', 'label', 'iconName', 'value', 'loading', 'placeholder', 'name']
}
</script>

<style scoped lang='scss'>
.input-container {
  flex: 1;
  position: relative;
  &.error {
    input {
      box-shadow: 0 0 0 1px rgba($pink, 1), 0 1px 2px rgba($text_color, .12);
    }
  }

  & /deep/ svg {
    margin-right: $spacing;
    position: absolute;
    left: 0;
    margin: auto;
    bottom: 0;
    top: 0;
    z-index: 2;
    margin-left: 12px;

    path, line, polyline { stroke: #9aaab1 }
  }
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: $spacing;
}

.input {
  display: flex;
  height: $spacing * 6;
  margin-bottom: $spacing * 3;
  box-shadow: $shadow-0;
  border-radius: $radius;
  padding: 0 $spacing;
  border: none;
  font-size: 1em;
  align-items: center;
  width: 100%;
  outline: 0;
  padding-left: $spacing * 5;
  font-size: 1.1em;

  &.label-file {
    cursor: pointer;
  }

  &:focus, &.label-file:hover {
    box-shadow: $shadow-0-hover;
  }
}

.label-container {
  display: flex;
  &.error {
    color: $pink;
  }

  .error-text {
    margin-left: $spacing;
  }
}

</style>
