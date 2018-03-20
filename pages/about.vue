<template>
  <ViewWrapper>
    <div class='header'>
      <container>Pages.xyz is the place to curate and discover the best web pages <br />We bring you everything you need to see on a plateau</container>
    </div>
      <div class='products'>
        <div class='product' v-for='{ path, title, tagline, btnUrl, thumbUrl } in products'>
          <img :src='thumbUrl' />
          <div>
            <div class='product-title'>
              {{title}}
            </div>
            <div class='product-tagline'>
              {{tagline}}
            </div>
            <iframe
              :src="`https://yvoschaap.com/producthunt/${btnUrl}`"
              width="96"
              height="22"
              scrolling="no"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
      <div class='tweets'>
        <div v-for='group in groupedTweets' class='tweets-column'>
          <div v-for='id in group'>
            <tweet
              :id="id"
              :options="{ cards: 'hidden' }"
            ></tweet>
          </div>
        </div>
      </div>
    </div>
  </ViewWrapper>
</template>

<script>
import ViewWrapper from '~/components/ViewWrapper'
import Container from '~/components/Container'

export default {
  components: { ViewWrapper, Container },
  data () {
    return {
      products: [
        {
          path: '/posts/checkout-pages',
          title: 'Checkout Pages',
          tagline: 'The best checkout pages',
          btnUrl: '/counter.html#href=http%3A%2F%2Fcheckoutpages.xyz%2F&layout=wide',
          thumbUrl: 'https://ph-files.imgix.net/b166fbff-2e18-4a5c-bf46-3c76d7d982db?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=2'
        },
        {
          path: '/posts/product-pages',
          title: 'Product Pages',
          tagline: 'The best product pages',
          btnUrl: '/counter.html#href=http%3A%2F%2Fproductpages.xyz%2F&layout=wide',
          thumbUrl: 'https://ph-files.imgix.net/3ab00c9d-4c23-4fd0-b1fb-b578a43f0e59?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=2'
        },
        {
          path: '/posts/pricing-pages',
          title: 'Pricing Pages',
          tagline: 'The best pricing pages',
          btnUrl: '/counter.html#href=http%3A%2F%2Fpricingpages.xyz%2F&layout=wide',
          thumbUrl: 'https://ph-files.imgix.net/c2d6114c-1bf2-4155-9939-a3381d345dd0?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=2'
        },
        {
          path: '/posts/app-pages',
          title: 'App Pages',
          tagline: 'The best app pages',
          btnUrl: '/counter.html#href=https%3A%2F%2Fwww.producthunt.com%2Fr%2Fp%2F111440&layout=wide',
          thumbUrl: 'https://ph-files.imgix.net/63f156c6-a924-4679-abdf-506cabab2a05?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=2'
        }
      ],
      tweets: [
        '841731495198769152',
        '823632557250068481',
        '783634345265422336',
        '783335893478301697',
        '773020145161830400',
        '764496246002315264',
        '764335886016385024',
        '764007271122612224',
        '763767801035325440',
        '763672680470044672',
        '762913845006458880',
        '762696179327070208',
        '762436637871583233',
        '762242876927512576',
        '818912035228549120',
        '762944103558545409',
        '773542411620540416'
      ]
    }
  },
  computed: {
    groupedTweets () {
      return this.eachSlice(this.tweets, Math.round(this.tweets.length / 5))
    }
  },
  methods: {
    eachSlice (array, size) {
      let finalArray = []
      for (var i = 0, l = array.length; i < l; i += size) {
        finalArray.push(array.slice(i, i + size))
      }
      return finalArray
    }
  }
}
</script>

<style scoped lang='scss'>
.header {
  text-align: center;
  font-size: 1.6em;
  padding: $spacing * 5;
  line-height: 1.5;
  padding-bottom: 25px !important;
}

.products {
  display: flex;
  justify-content: center;

  @media (max-width: 750px) {
    display: block;
  }
}

.product {
  padding: $spacing * 2;
  display: flex;
  border: 1px solid #e1e8ed;
  border-radius: 4px;
  margin: 10px;
  flex: 0 0 300px;

  &-title {
    font-size: 1.2em;
  }

  &-tagline {
    opacity: .7;
    margin-top: $spacing / 2;
    margin-bottom: $spacing;
  }

  img {
    width: 80px; height: 80px;
    margin-right: $spacing;
  }
}

.tweets {
  display: flex;
  justify-content: center;
  padding-bottom: $spacing * 5;
  @media (max-width: 750px) {
    display: block;
  }
}

.tweets-line {

}
.tweets /deep/ .twitter-tweet {
  margin: 10px !important;
  width: 300px !important;
  margin-bottom: 20px !important;
  @media (max-width: 750px) {
    width: auto !important;
  }
}
</style>
