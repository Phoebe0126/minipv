<template>
  <scroll-view scroll-y @scrolltolower="handleToLower" class="scroll-view">
    <!-- 轮播图区域 
        autoplay 自动轮播
        circular 衔接滑动
        indicator-dots 指示器
        -->
    <swiper class="swiper" autoplay circular indicator-dots>
      <swiper-item v-for="item in banner" :key="item.id" class="swiper-item">
        <image :src="item.new_thumb" mode="" />
      </swiper-item>
    </swiper>
    <!-- 专辑列表区域 -->
    <view class="album-wrapper">
      <navigator
        class="album"
        v-for="item in album"
        :key="item.id"
        :url="`/pages/album/index?id=${item.id}`"
      >
        <view class="album-img">
          <image :src="item.cover" mode="aspectFill" />
        </view>
        <view class="album-info">
          <view class="album-title">{{ item.name }}</view>
          <view class="album-desc">{{ item.desc }}</view>
          <view class="album-button">
            <view class="button">+ 关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    // 请求参数对象
    return {
      params: {
        limit: 4,
        order: "new",
        skip: 0
      },
      // 轮播图列表
      banner: [],
      // 专辑列表
      album: [],
      hasMore: true
    };
  },
  mounted() {
    this.getListData();
  },
  methods: {
    // 获取轮播图和专辑列表数据
    getListData() {
      if (!this.hasMore) {
        return;
      }
      this.request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        data: this.params
      }).then(result => {
        if (result.res.album.length === 0) {
          this.hasMore = false;
          return;
        }
        if (this.banner.length === 0) {
          this.banner = result.res.banner;
        }
        this.album = [...this.album, ...result.res.album];
      });
    },
    handleToLower() {
      if (!this.hasMore) {
        uni.showToast({
          title: "暂时没有更多专辑啦~",
          duration: 2000
        });
      } else {
        // 调整skip个数 跳过之前的
        this.params.skip = this.params.limit;
        // 重新获取数据
        this.getListData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-view {
  height: calc(100vh - 36px);
  // 427/240 = 1.78
  .swiper {
    height: calc(750rpx / 1.78);
    image {
      height: 100%;
    }
  }
  .album-wrapper {
    padding: 10rpx;
    .album {
      display: flex;
      padding: 10rpx;
      border-bottom: 1rpx solid #eee;
      view.album-img {
        flex: 1;
        image {
          width: 200rpx;
          height: 200rpx;
        }
      }

      view.album-info {
        flex: 2;
        padding: 0 10rpx;
        overflow: hidden;
        view.album-title {
          font-size: 30rpx;
          color: #000;
          padding: 10rpx;
        }
        view.album-desc {
          padding: 10rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        view.album-button {
          color: $color;
          display: flex;
          justify-content: flex-end;
          padding: 10rpx;
          .button {
            padding: 10rpx;
            border: 1rpx solid $color;
          }
        }
      }
    }
  }
}
</style>
