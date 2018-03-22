<template>
  <ais-index
    app-id="XLJ7UBAC19"
    api-key="8baad772f2d3c61e16ddf67f72d92b9d"
    index-name="Page"
  >
    <div class='search-box-container'>
      <Icon :name="'Search'" ></Icon>
      <ais-search-box placeholder='Search pages.xyz' @keyup.native='handleKeyDown($event)'></ais-search-box>
    </div>
    <ais-results v-if='resultsVisible'>
      <template slot-scope="{ result }">
        <div class='result-item' @click='handleClickItem(result)'>
          <div
            :class="{'result-item-cover': true, 'black': !result.main_color || tooClear(result.main_color)}"
          >
            <img :src='result.favicon_url' v-if='result.favicon_url'>
            <Icon
              :name='result.category && result.category.emoji'
              v-else
              :color='result.main_color'
            ></Icon>
          </div>
          <div>
            <div class='result-item-title'>
              {{result.title}}
            </div>
            <div class='result-item-tagline'>
              {{result.category && result.category.name}}
            </div>
          </div>
          </div>
        </div>
      </template>
    </ais-results>
  </ais-index>
</template>

<script>
import Icon from '~/components/Icon'

export default {
  components: { Icon },
  methods: {
    tooClear (hex) {
      if (hex.indexOf('#') === 0) {
        hex = hex.slice(1)
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
      }
      if (hex.length !== 6) {
        throw new Error('Invalid HEX color.')
      }
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
    },
    handleClickItem (result) {
      this.resultsVisible = false
      this.$store.commit('openModal', {slug: result.slug, title: result.title})
    },
    handleKeyDown (e) {
      this.resultsVisible = e.target.value !== ''
    }
  },
  data () {
    return {
      resultsVisible: false
    }
  }
}
</script>

<style lang='scss'>

.result-item {
  display: flex;
  align-items: center;
  margin-bottom: $spacing / 2;
  cursor: pointer;
  padding-top: $spacing / 2; padding-bottom: $spacing / 2;
  padding-left: $spacing; padding-right: $spacing;
  margin-left: -($spacing); margin-right: -($spacing);
  border-radius: $radius;
  transition: .15s ease-in-out background;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: rgba($text_color, .03);
  }

  .result-item-cover {
    height: $spacing * 4; flex: 0 0 $spacing * 4; width: $spacing * 4;
    border-radius: $radius;

    img {
      width: 21px;
    }
    &.black {
      // background: rgba($text_color, .08) !important;

      & /deep/ svg {
        stroke: #A7B3BA !important;
      }
    }
    margin-right: $spacing;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .icon {
      position: relative;
    }

    .background {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: $radius;
      opacity: .2
    }
  }

  &-title {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    font-weight: 500;
    max-width: 280px;

    em {
      font-style: normal;
    }
  }

  &-tagline {
    opacity: .5;
    margin-top: -6px;
    font-size: .9em;
  }
}

.search-box-container {
  position: relative;

  svg {
    position: absolute;
    left: 0;
    width: 15px;
    height: 15px;
    stroke-width: 2.5 !important;
    margin: auto;
    top: 0;
    bottom: 0;
    margin-left: $spacing / 1.5;
    opacity: .3;
    width: 16px;
    height: 18px;
  }
}

.ais-index {
  width: 100%;
  max-width: 200px;
}

.ais-input {
  box-shadow: $shadow-0;
  border-radius: $radius;
  border: none;
  width: 100%;
  outline: 0;
  font-size: 1em;
  padding-left: $spacing * 3.3;
  padding-right: 5px;
  -webkit-appearance: none;

  height: 28px;
  padding-bottom: 2px;
}

.ais-clear {
  display: none;
}

.ais-search-box__submit { display: none }
.ais-results {
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 350px;
  background: white;
  max-height: 300px;
  overflow: scroll;
  padding: $spacing * 2;
  padding-top: 11px;
  border-radius: $radius;
  margin-top: $spacing;
  // display: none;
  box-shadow:
    0px 0px 0px .5px rgba($text_color, .2),
    0px 0px 0px 1px  rgba($text_color, .1),
    0 14px 28px rgba($text_color, 0.25),
    0 10px 10px rgba($text_color, 0.22);

  & /deep/ svg {
    width: 18px; height: 18px;
    stroke-width: 1.5 !important;
  }
}

.ais-clear--disabled {
  display: none;
}

.ais-index {
  @media(max-width: 750px) {
    display: none;
  }
}
</style>
