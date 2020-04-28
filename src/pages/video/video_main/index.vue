<template>
  <scroll-view
    enable-flex
    scroll-y
    class="video-main"
    @scrolltolower="handleScrollToLower"
  >
    <view class="video-item" v-for="item in videowp" :key="item.id" @click="handlePlayVideo(item)">
      <image :src="item.img" mode="widthFix" />
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      videowp: [],
      hasMore: true,
    };
  },
  props: {
    urlObj: Object
  },
  mounted() {
    this.getData();
  },
  watch: {
    urlObj() {
      // 因为四个页面共享这个组件 所有监听urlObj的变化
      this.videowp = []
      this.getData();
    }
  },
  methods: {
    async getData() {
      const { res: data } = await this.request({
        url: this.urlObj.url
      });
      this.videowp = data.videowp
    },
    // 滚动到了底部
    handleScrollToLower() {
          uni.showToast({
          title: "暂时无更多视频~",
          icon: "none"
        });
    },
    // 跳转到音乐播放页面
    handlePlayVideo (item) {
      // 存储到数据共享
      getApp().globalData.videoObj = item
      uni.navigateTo({
         url: '/pages/videoPlay/index'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.video-main {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 36px);
  .video-item {
    width: 33.33%;
    border: 5rpx solid #fff;
    image {
    }
  }
}
</style>
