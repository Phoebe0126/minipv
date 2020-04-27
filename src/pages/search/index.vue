<template>
  <view class="content">
    <special-banner
      :banner-list="banners"
      :swiper-config="swiperConfig"
    ></special-banner>
  </view>
</template>

<script>
import specialBanner from "@/components/EtherealWheat-banner/specialBanner";
export default {
  components: {
    specialBanner
  },
  data() {
    return {
      // banner轮播数据
      banners: [],
      swiperConfig: {
        indicatorDots: true,
        indicatorColor: "rgba(255, 255, 255, .4)",
        indicatorActiveColor: "rgba(255, 255, 255, 1)",
        autoplay: true,
        interval: 3000,
        duration: 300,
        circular: true,
        previousMargin: "58rpx",
        nextMargin: "58rpx"
      }
    };
  },
  onLoad () {
     this.getBannerData()
  },
  methods: {
      async getBannerData () {
          const {banners} = await this.request({
          url: 'http://47.106.170.118/banner?type=2'
      })
      banners.forEach(v=> {
          v.picture = v.pic
      })
      this.banners = banners
      console.log(this.banners)
      }
  }
};
</script>

<style lang="scss" scoped>

</style>
