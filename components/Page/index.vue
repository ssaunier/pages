<template>
  <div
    :class="{'page': true, 'has-screenshot': screenshot_url || this.isItem, sss: this.cool_url == 'lewagon.com'}"
    ref='page'
    @click='this.handleClick'

  >

    <div class='header' @click='this.handleHeaderClick'>
      <section>
        <a
          class='header-button'
          :href="`${url}?ref=pages.xyz`"
          target='_blank'
          v-if='!$store.state.currentUser.admin'
        >
          <Icon :name="'ExternalLink'"/>
        </a>
        <div v-else>
          <a class='header-button' @click='handleMoreClick'>
            <Icon :name="'MoreHorizontal'" class='more'></Icon>
          </a>
          <div
            class='more-popover'
            v-if='this.morePopover'
            v-click-outside='() => { this.morePopover = false }'
          >
            <a v-if='!this.isItem' @click="$store.commit('setCropMode', true)">
              <Icon :name="'Maximize'"/> <span>Crop</span>
            </a>
            <a @click="$store.dispatch('updatePage', {slug: slug, data: {status: 'featured'}})" v-if='status !== "featured"'>
              <Icon
                :name="'Star'"
              ></Icon>
              <span>Feature</span>
            </a>
            <a @click="$store.dispatch('updatePage', {slug: slug, data: {status: 'upcoming'}})" v-if='status !== "upcoming"'>
              <Icon
                :name="'Trash'"
              ></Icon>
              <span>Unfeature</span>
            </a>
            <a @click="handleDelete">
              <Icon
                :name="'CrossSquare'"
              ></Icon>
              <span>Delete</span>
            </a>
            <label for='file2'>
              <Icon
                :name="'Camera'"
              ></Icon>
              <span>Screenshot</span>
              <input type='file' id='file2' @change="onFileChange" accept=".png,.jpg,.jpeg" >
            </label>
          </div>
        </div>
      </section>
      <a class='search-bar' :href="`${url}?ref=pages.xyz`" target="_blank">
        {{cool_url}}
      </a>
      <section>
        <Like
          :post='this.$props'
          :size='"small"'
          class='header-button'
          ></Like>
      </section>
    </div>
    <div
      :class='{body: true, uploading: $store.state.uploadingScreenshot}'
      :style="{height: `${height}px`, backgroundColor: main_color || 'white'}"
    >
      <PageLoader v-if='$store.state.uploadingScreenshot'></PageLoader>
      <div v-if="this.isItem && !screenshot_url" class='icon-container'>
        <Icon :name="'CameraOff'" ></Icon>
      </div>
      <ScreenshotUploader
        v-else-if="!screenshot_url && !$store.state.uploadingScreenshot"
        :pageSlug='slug'

      ></ScreenshotUploader>
      <div v-else >
        <img
          :src="screenshot_url"
          :class="{
            'uploading': $store.state.uploadingScreenshot,
            'loaded': this.imageLoaded
          }"
        />
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenshotUploader from '~/components/Uploader/Screenshot'
import PageLoader from '~/components/Page/Loader'
import Like from '~/components/Button/Like'
import Icon from '~/components/Icon'
import ClickOutside from 'vue-click-outside'

export default {
  components: { ScreenshotUploader, PageLoader, Like, Icon },
  methods: {
    calculateHeightFromWidth (restrictedWidth, width, height) {
      return restrictedWidth / (width / height)
    },

    handleResize () {
      this.updateHeight()
    },

    updateHeight () {
      if (this.$refs.page) {
        const width = this.$refs.page.clientWidth
        this.height = this.calculateHeightFromWidth(width, this.screenshot_width, this.screenshot_height)
      }
    },

    handleClick (e) {
      if(this.cool_url == 'lewagon.com') {
        window.open("http://lewagon.com/?ref=pages.xyz", '_blank')
      } else if (this.isItem) {
        this.$store.commit('openModal', {slug: this.slug, title: this.title})
      } else {
        this.morePopover = false
        e.stopPropagation()
      }
    },
    handleMoreClick (e) {
      this.morePopover = !this.morePopover
    },
    handleHeaderClick (e) {
      e.stopPropagation()
    },
    handleDelete (e) {
      const r = confirm('Are you sure?')
      if (r === true) {
        this.morePopover = false
        this.$store.dispatch('deletePage', this.slug)
      }
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.$store.state.uploadingScreenshot = true
      this.createImage(files[0])
    },
    createImage (file) {
      var reader = new FileReader()

      reader.onload = (e) => {
        this.$store.state.pageDetail.screenshot_url = e.target.result
      }
      reader.readAsDataURL(file)
      this.uploadImage(file)
    },
    uploadImage (file) {
      let data = new FormData()
      data.append('image', file, file.name)

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      this.morePopover = false
      return this.$axios.$patch(`screenshots/${this.screenshot_id}`, data, config).then((res) => {
        this.$store.state.uploadingScreenshot = false
        this.$store.state.pageDetail = res
      })
    }
  },
  props: [
    'title',
    'favicon_url',
    'url',
    'cool_url',
    'screenshot_url',
    'slug',
    'screenshot_width',
    'screenshot_height',
    'screenshot_id',
    'main_color',
    'isItem',
    'setCropMode',
    'likes',
    'liked',
    'status'
  ],

  mounted () {
   // this.updateHeight()
    window.addEventListener('resize', this.handleResize)

    if (this.screenshot_url) {
      const downloadingImage = new Image()
      downloadingImage.onload = () => {
        this.imageLoaded = true
      }
      downloadingImage.src = this.screenshot_url
    }

      this.updateHeight()
  },

  data () {
    return {
      height: this.calculateHeightFromWidth(864, this.screenshot_width, this.screenshot_height),
      imageLoaded: false,
      morePopover: false
    }
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang='scss'>

.page.sss, .page.sss .body {
  cursor: pointer;
}
  [type='file'] {
    display: none
  }
  .more {
    svg {
      width: 23px;
      height: 24px;
    }

    &-popover {
      position: absolute;
      background: white;
      box-shadow: $popover-shadow;
      z-index: 2;
      padding: $spacing * 2;
      margin-top: $spacing;
      left: 0;
      right: 0;

      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      a, label {
        text-align: center;
        color: $text_color;
        margin-right: $spacing * 2;
        width: 100%;
        max-width: 60px;
        padding: $spacing 0;
        border-radius: $radius;
        cursor: pointer;

        &:hover {
          background: rgba($text_color, .04);
        }

        span {
          margin-top: $spacing;
          display: block;
          opacity: .6;
          font-weight: 500;
        }

        /deep/ svg {
          margin: auto;
          stroke: rgba($text_color, .4);
          stroke-width: 1;
          fill: rgba($text_color, .05);
        }
      }
    }
  }
  .favicon {
    width: 16px;
    height: 16px;
  }

  .body {
    height: 100%;
    position: relative;
    user-select: none;

    &:after {
      position: absolute; left: 0; right: 0; content: ''; top: 0;
      height: 1px; background: rgba(black, .1);
    }

    &.uploading {
      background: black !important;
    }
  }

  .body img {
    width: 100%;
    display: block;
    border-radius: 0 0 5px 5px;
    transition: opacity .15s ease-in-out;
    opacity: 0;

    &.loaded {
      opacity: 1;
    }

    &.uploading {
      opacity: .3;
    }
  }

  .page {
    flex: 1;
    user-select: none;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow:
      0px 0px 0px .5px rgba($text_color, .2),
      0px 0px 0px 1px  rgba($text_color, .1),
      0 14px 28px rgba($text_color, 0.25),
      0 10px 10px rgba($text_color, 0.22);

    &.has-screenshot { border-radius: 5px; }
  }

  .header {
    padding: $spacing;
    display: flex;
    align-items: center;
    font-size: .9em;
    background: linear-gradient(rgba($text_color, 0), rgba($text_color, .05)), white;
    position: relative;

    section {
      flex: 1;
      &:first-of-type {
        .header-button {
          margin-right: $spacing;
        }
      }
      &:last-of-type {
        text-align: right;

        .header-button {
          margin-left: $spacing;
        }
      }
    }

    .search-bar {
      margin: auto;
      display: inline-flex;
      width: 100%;
      max-width: 380px;
      justify-content: center;
      padding: $spacing / 2 $spacing;
      color: $text_color;
    }

    .search-bar, .header-button {
      border-radius: $radius;
      box-shadow: 0px 1px 2px rgba($text_color, .1), 0px 0.25px 0px 01px #E0E3E7;
      background: linear-gradient(rgba(white, 1), rgba(white, .1));
      cursor: pointer;
      &:hover {
        box-shadow:  0px 1px 2px rgba($text_color, .15), 0px 0px 0px 1px rgba($text_color, .3);
        background: linear-gradient(rgba(white, 1), rgba(white, .1));
      }
    }


    .favicon {
      margin-right: $spacing;
    }
  }
  .header-button {
    width: 40px;
    height: 25px;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    & /deep/ svg {
      width: 16px;
      height: 16px;
      stroke: rgba($text_color, .6);
      stroke-width: 1.4;
      position: relative; top: -1px;

      &.feather-heart { stroke: #FC3258; fill: rgba(#FC3258, .1) }
    }
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    & /deep/ svg {
      fill: rgba($text_color, .03);
      stroke-width: 1.5;
      stroke: #C7CFD3;
    }
  }
</style>
