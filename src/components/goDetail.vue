<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    list: Array,
    index: Number
  },
  methods: {
    handleClick() {
      // 设置全局数据，图片数组和索引
      getApp().globalData.imgList = this.list;
      getApp().globalData.imgIndex = this.index;
      // 跳转到图片详情
      uni.navigateTo({
        url: "/pages/detail/index"
      });
    }
  }
};
</script>

<style lang="scss"></style>
