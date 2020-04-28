<template>
  <view class="wrapper">
    <!-- 轮播图 -->
    <swiper class="swiper" autoplay circular indicator-dots>
      <swiper-item
        v-for="item in banners"
        :key="item.id"
        class="swiper-item"
        @animationfinish="animationfinish"
      >
        <image :src="item.pic" mode="" />
      </swiper-item>
    </swiper>
    <!-- 歌单区域 -->
    <view class="playlist-wrap">
      <view class="playlist-item" v-for="item in playlists" :key="item.id" >
        <image :src="item.coverImgUrl" mode="aspectFill" @click="handleClickPlaylist(item)" />
        <view class="playlist-desc">{{item.name}}</view>
        <view class="playlist-playcount">
          <i class="iconfont">&#xe707;</i>
          {{item.newPlayCount}}
          </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
    props: {
        banners: {
            type: Array,
            default: []
        },
        playlists: {
            type: Array,
             default: []
        },
        limit: {
            type: Number,
            default: 6
        }
    },
    methods: {
        handleClickPlaylist (item) {
            // 传输给父组件歌单id
            this.$emit('changetodetail', item.id,item.name)
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .swiper {
  height: calc(750rpx / 2.57);
  image {
    height: 100%;
  }
}
.playlist-wrap {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20rpx;
  .playlist-item {
    flex: 33.33%;
    padding: 10rpx 27rpx;
    position: relative;
    overflow: hidden;
    image {
      width: 180rpx;
      height: 180rpx;
      border-radius: 5%;
      box-shadow: 5rpx 5rpx 5rpx rgba(0, 0, 0, .3);
    }
    .playlist-desc {
      font-size: 24rpx;
      margin-top: 5rpx;
      overflow: hidden;
      color: #222;
    }
    .playlist-playcount {
      position: absolute;
      right: 22%;
      top: 5%;
      color: #fff;
      font-size: 20rpx;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 20rpx;
        margin-right: 3rpx;
      }
    }
  }
}
}
</style>