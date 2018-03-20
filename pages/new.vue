<template>
  <view-wrapper>
    <container>
      <div class='content'>
        <Headline :tag='"h1"'>Submit a page</Headline>
        <Tagline>
          We'll review your submission and, if accepted, the page will be featured on the homepage & the newsletter.
        </Tagline>
        <form>
          <Input
            :label='"Page url"'
            :error='this.errors.url'
            :iconName='"Link"'
            :placeholder='"http://pages.xyz"'
            :name="'url'"
            :value='this.data.page.url'
            @click.native='onInputClick()'
            @keyup.native='onKeyUp($event)'
            @keydown.native='onKeyDown($event)'
          />

          <div :class="{'label-container': true, error: this.errors.categories}">
            <label for='url'>Category</label>
            <div class='error-text' v-if='this.errors.categories'>
              {{this.errors.categories[0]}}
            </div>
          </div>
          <div class='categories-placeholder' v-if='_isEmpty(categories)'>
            <figure></figure>
            <figure></figure>
            <figure></figure>
            <figure></figure>
          </div>
          <div class='categories' v-else>
            <div v-for='{slug, id, name, emoji} in categories' class='category-item-container'>
              <input :id="id" type="radio" name='category' @change='handleRadioChange' />
              <label :for='id' class='category-item'>
                <div>
                  <Icon :name='emoji' class='category-item-icon'></Icon>
                  <div class='category-item-label'>{{slug}} page</div>
                  <div class='checkbox'></div>
                </div>
              </label>
            </div>
            <div class='category-item-container new-category'>
              <input type="radio" id='0' name='category' @change='handleRadioChange' />
              <label :for='0' class='category-item new-category'>
                <div class='category-item-inner'>
                  <Icon :name='"PlusSquare"'></Icon>
                  <div class='category-item-label'>Suggest a category</div>
                  <div class='checkbox'></div>
                </div>
                <div v-if='newCategory' class='input-section-body'>
                  <Input
                    :label='"Category name"'
                    :error='this.errors.false'
                    :iconName='"Type"'
                    :placeholder='"Pricing Pages"'
                    :name="'category_name'"
                    :value='this.data.category.name'

                    @keyup.native='onKeyUpCategory($event)'
                    @keydown.native='onKeyDown($event)'
                    @click.native='onCategoryInputClick'
                  />
                </div>
              </label>
            </div>
          </div>

          <div class='btn-container'>
            <btn
              class='big brand'
              v-on:click.native='onSubmit($event)'
              :loading='loading'
            >Submit</btn>
          </div>
        </form>
      </div>
    </container>
  </view-wrapper>
</template>

<script>
import ViewWrapper from '~/components/ViewWrapper'
import Container from '~/components/Container'
import Headline from '~/components/Headline'
import Icon from '~/components/Icon'
import Btn from '~/components/Btn'
import { apiUrl } from '~/plugins/globale.js'
import { isEmpty } from 'lodash'
import Input from '~/components/Form/Input'
import Tagline from '~/components/Tagline'

export default {
  components: { ViewWrapper, Container, Headline, Icon, Btn, Input, Tagline },
  data () {
    return {
      data: { page: { url: '', category_ids: [] }, category: {name: null} },
      loading: false,
      categories: [],
      errors: {},
      newCategory: false
    }
  },
  methods: {
    onInputClick (e) {
      if (this.data.page.url === '') {
        this.data.page.url = 'http://'
      }
    },
    onCategoryInputClick (e) {
      if (this.data.category.name === null || this.data.category.name === '') {
        this.data.category.name = ' Pages'
        setTimeout(() => {
          e.target.setSelectionRange(0, 0)
        }, 1)
      }
    },
    _isEmpty (array) {
      return isEmpty(array)
    },
    onSubmit (e) {
      e.preventDefault()
      this.loading = true

      this.$axios({method: 'POST', url: `${this.apiUrl}/pages/create`, data: this.data})
        .then((response) => {
          this.$router.push({ path: response.data.slug })
        })
        .catch((error) => {
          this.errors = error.response.data
          this.loading = false
        })
    },
    onKeyUp (e) {
      this.data.page.url = e.target.value
    },
    onKeyUpCategory (e) {
      this.data.category.name = e.target.value
    },
    onKeyDown (e) {
      if (e.keyCode === 13) {
        this.onSubmit()
      }
    },
    handleRadioChange (e) {
      if (e.target.id === '0') {
        this.data.page.category_ids = []
        this.newCategory = true
      } else {
        this.data.category.name = null
        this.newCategory = false
        this.data.page.category_ids = [e.target.id]
      }
    }
  },
  mounted () {
    this.$axios.$get(`${apiUrl}/categories`)
      .then((res) => {
        this.categories = res
      })
  }
}
</script>

<style lang='scss' scoped>
form {
  max-width: 500px;
  margin: auto;
  margin-top: $spacing * 2;
  text-align: left;
}

.content {
  padding: $spacing * 5 0;
  text-align: center;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: $spacing;
}

.categories {
  display: flex;
  margin: 0 -($spacing);
  margin-top: 0; margin-bottom: 0;
  flex-wrap: wrap;
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

[type='radio'] {
  display: none;
  &:checked + .category-item {
    // color: $brand_color;
    box-shadow: 0 0 0 2px $brand_color, 0 1px 2px rgba(3, 42, 60, .12);
    .category-item-label {
      color: $brand_color;
    }

    &.new-category {
      box-shadow: 0 0 0 1px rgba(3, 42, 60, .15), 0 1px 2px rgba(3, 42, 60, .12);
      .category-item-inner {
        border-bottom: 1px solid #d2d8db;
      }

      .input {
        margin-bottom: 0;
      }
    }

    & /deep/ svg {
      stroke: $brand_color !important;
      path, rect { fill: rgba($brand_color, .1) }
    }

    .category-item-label {
      opacity: 1;
    }

    .checkbox {
      box-shadow: 0 0 0 1px $brand_color;
      position: relative;

      &:after {
        background: $brand_color;
        border-radius: 100%;
        position: absolute; content: ''; top: 0; left: 0; right: 0; bottom: 0;
        margin: $spacing / 4;
      }
    }
  }
}

.category-item-container {
  flex: 0 0 25%;
  user-select: none;

  &.new-category {
    flex: 1;
    margin-top: $spacing * 2;
    & /deep/ .feather-plus-square {
      fill: rgba(3, 42, 60, .03);
      stroke: #9aaab1;
      stroke-width: 1.2;
    }
    .category-item {
      height: auto;
      display: block;
    }
    .category-item-inner {
      display: flex;
      align-items: center;
      padding: $spacing * 1;
    }

    .category-item-label {
      margin-top: 0;
      margin-left: $spacing;
      text-transform: none !important;
    }

    .checkbox {
      margin: 0;
      margin-left: auto;
      margin-right: $spacing / 2;
    }
  }
}

.category-item {
  box-shadow: 0 0 0 1px rgba(3, 42, 60, .15), 0 1px 2px rgba(3, 42, 60, .12);
  border-radius: $radius;
  margin: 0 $spacing;
  height: 120px;
  text-align: center;
  display: flex;
  cursor: pointer;
  text-align: center;
  align-items: center;

  &:hover {
    box-shadow: 0 0 0 1px rgba(3, 42, 60, .2), 0 1px 2px rgba(3, 42, 60, .15);
  }

  .checkbox {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(3, 42, 60, .2), 0px 1px 1px rgba($text_color, .07) inset;
    margin: auto;
    margin-top: $spacing * 2;
  }

  &-label {
    font-weight: 300;
    opacity: .6;
    margin-top: $spacing;
    text-transform: capitalize;
  }

  & > div { flex: 1 }
  .category-item-icon {
    & /deep/ svg {
      margin: auto;
      stroke: rgb(154, 170, 177);
      stroke-width: 1.3;

      path, rect {
        fill: rgba($text_color, .03);
      }
    }
  }
}

.btn-container {
  margin-top: $spacing * 4;
  text-align: center;
}

.categories-placeholder {
  display: flex;
  margin: 0 -($spacing);
  margin-top: 0; margin-bottom: 0;
  height: 120px;

  figure {
    background: $text_color;
    border-radius: $radius;
    opacity: .05;
    margin: 0 $spacing;
    flex: 1;
  }
}

.input-section-body {
  background: rgba($text_color, .02);
  padding: $spacing * 2;
}
</style>
