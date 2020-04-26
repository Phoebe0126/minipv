<template>
  <view class="cate-wrap">
    <navigator v-for="item in category" :key="item.id" class="cate-item"  :url="`/pages/videoCategoryDetail/index?id=${item.id}`">
      <image :src="item.cover" mode="aspectFill" />
      <view class="cate-name">{{ item.name }}</view>
    </navigator>
  </view>
</template>

<script>
export default {
  props: {
    urlObj: Object
  },
  data() {
    return {
      category: []
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      const { res: data } = await this.request({
        url: this.urlObj.url
      });
      this.category = data.category;
    },
     // 跳转到音乐播放页面
    c (item) {
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
.cate-wrap {
  display: flex;
  flex-wrap: wrap;
  .cate-item {
    flex: 50%;
    border: 5rpx solid #fff;
    position: relative;
    image {
      height: 300rpx;
    }

    .cate-name {
      position: absolute;
      width: 100%;
      height: 50rpx;
      left: 0;
      bottom: 0;
      color: #fff;
      background-image: linear-gradient(
        to right top,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      );
      font-size: 40rpx;
      display: flex;
      align-self: center;
      padding-left: 20rpx;
    }
  }
}
</style>
