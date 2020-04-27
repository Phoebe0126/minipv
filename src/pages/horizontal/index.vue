<template>
  <view class="music-wrapper">
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
      <view class="playlist-item" v-for="item in playlists" :key="item.id">
        <image :src="item.coverImgUrl" mode="aspectFill" />
        <view class="playlist-desc">{{item.name}}</view>
      </view>
    </view>
    <!-- 播放音乐 -->
    <view class="music">
      <play-music :src="music" :play.sync="audioPlay"></play-music>
    </view>
  </view>
</template>

<script>
import PlayMusic from '@/components/luch-audio/luch-audio'
export default {
  components: {
    PlayMusic
  },
  data() {
    return {
      // banner轮播数据
      banners: [],
      // 音乐
      music: "",
      audioPlay: true,
      // 热门歌单
      playlists: [],
      limit: 6
    };
  },
  onLoad() {
    this.getBannerData();
    this.playMusic("33894312");
    this.getPlayList();
  },
  methods: {
    async getBannerData() {
      const { banners } = await this.request({
        url: "http://47.106.170.118/banner?type=2"
      });
      this.banners = banners;
    },
    // 创建播放音乐插件
    async playMusic(id) {
      const { data } = await this.request({
        url: `http://47.106.170.118/song/url?id=${id}`
      });
      this.music = data[0].url;
    },
    // 获取热门歌单
   async getPlayList () {
     const res = await this.request({
       url: `http://47.106.170.118/top/playlist/highquality?limit=${this.limit}`
      })
      this.playlists = res.playlists
      console.log(res)
    }
  }
};
</script>

<style lang="scss" scoped>
.music-wrapper {
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
    padding: 10rpx 22rpx;
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
  }
}
.music {
  width: 100%;
  position: absolute;
  bottom: 0;
}
}
</style>
