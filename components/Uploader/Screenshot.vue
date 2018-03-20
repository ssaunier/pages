<template>
<div class='uploader' @dragenter="hovering = true" @dragleave="hovering = false" @drop='hovering = false' :class="{'hovered-with-file': hovering}">
  <Headline :tag='"h2"'>
    Upload a screenshot
  </Headline>
  <div class='tagline'>
    You can use this <a href='https://chrome.google.com/webstore/detail/full-page-screen-capture/fdpohaocaechififmbbbbbknoalclacl' target='_blank'>chrome extension</a> to easily capture the whole page.
  </div>
  <label for='file' ref="fileLabel">
    <Btn class='big brand '>Upload now</Btn>
  </label>
  <input type='file' id='file' @change="onFileChange" accept=".png,.jpg,.jpeg" >
</div>
</template>

<script>
import Headline from '~/components/Headline'
import Illustration from '~/components/Illustration'
import Btn from '~/components/Btn'

export default {
  components: { Headline, Illustration, Btn },
  data () {
    return {
      hovering: false
    }
  },
  props: ['setImage', 'pageSlug'],
  mounted () {
    document.addEventListener('paste', (e) => {
      this.onPaste(e)
    })
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },

    onPaste (e) {
      // We need to check if event.clipboardData is supported (Chrome)
      let blob
      if (e.clipboardData) {
        // Get the items from the clipboard
        var items = e.clipboardData.items
        if (items) {
          this.createImage(items[items.length - 1].getAsFile(blob))
        }
        // If we can't handle clipboard data directly (Firefox),
        // we need to read what was pasted from the contenteditable element (TODO)
      } else {
        // This is a cheap trick to make sure we read the data
        // AFTER it has been inserted.
        // setTimeout(checkInput, 1)
      }
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
      this.$store.state.uploadingScreenshot = true
      let data = new FormData()
      data.append('image', file, file.name)

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      return this.$axios.$post(`pages/${this.pageSlug}/screenshot`, data, config)
        .then((res) => {
          console.log(res)
          this.$store.state.uploadingScreenshot = false
          this.$store.state.pageDetail = res
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.uploader {
  text-align: center;
  padding-top: $spacing * 15;
  overflow: hidden;
  height: 100%;
  cursor: pointer;
  &:before {
    position: absolute; top: 0; bottom: 0; left: 0; right: 0;
    content: '';
    border: 2px solid dashed rgba($text_color, .1);
    margin: $spacing;
    border-bottom: 0;
    transition: .3s ease-in-out border-color;
    border-radius: 5px 5px 0 0;
  }

  &:hover {
    &:before {
      border: 2px solid dashed rgba($text_color, .3);
    }
  }

  &.hovered-with-file {
    &:before {
      border-color: $brand_color;
    }
  }

  .illustration { margin-bottom: $spacing * 2 }
}

.tagline {
  color: rgba($text_color, .5);
  margin: $spacing * 1.5 0;
  margin-bottom: $spacing * 2.2;
}

.btn {
  position: relative;
}

.extended-label {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  cursor: pointer;
}

#file {
  position: absolute; top: 0; bottom: 0; right: 0; left: 0;
  cursor: pointer;
  opacity: 0;
  height: 100%;
  width: 100%;
  z-index: 9;
}
</style>
