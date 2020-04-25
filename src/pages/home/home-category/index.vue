<template>
  <view class="cate-wrap">
    <navigator
      v-for="item in category"
      :key="item.id"
      class="cate-item"
      :url="`/pages/categoryDetail/index?id=${item.id}`"
    >
      <image :src="item.cover" mode="aspectFill" />
      <view class="cate-name">{{ item.name }}</view>
    </navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      category: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await uni.request({
        url: "http://157.122.54.189:9088/image/v1/vertical/category"
      });
      this.category = res[1].data.res.category;
    }
  }
};
</script>

<style lang="scss">
.cate-wrap {
  display: flex;
  flex-wrap: wrap;
  .cate-item {
    flex: 33.33%;
    border: 5rpx solid #fff;
    position: relative;
    image {
      width: 240rpx;
      height: 240rpx;
    }
    .cate-name {
      position: absolute;
      width: 100%;
      height: 50rpx;
      left: 0;
      bottom: 0;
      color: #fff;
      // c3渐变
      background-image: linear-gradient(
        to right top,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      );
      font-size: 40rpx;
      display: flex;
      align-items: center;
      padding-left: 20rpx;
    }
  }
}
</style>
