<template>
  <view class="search-wrapper">
    <!-- 搜索区域 -->
    <view class="search">
      <input
        confirm-type="search"
        placeholder="输入关键词进行搜索吧~"
        v-model="keywords"
      />
      <view class="btn" @click="handleSearch">搜索</view>
    </view>
    <!-- 歌曲列表区域 -->
    <view class="songs">
      <view
        class="song-item"
        v-for="(item, index) in songs"
        :key="item.id"
        @click="handlePlayMusic(item)"
      >
        <view class="index">{{ index + 1 }}</view>
        <view class="song-info">
          <view class="song-name">{{ item.name }}</view>
          <view class="song-author-album"
            >{{ item.artists[0].name }}-{{ item.album.name }}</view
          >
        </view>
        <view class="more-icon">
          <i class="iconfont">&#xe7fb;</i>
        </view>
      </view>
    </view>
    <!-- 播放音乐 -->
    <view class="music">
      <play-music
        :src="music"
        :poster="poster"
        :name="name"
        :autoplay="autoplay"
        :author="author"
        :play.sync="audioPlay"
      ></play-music>
    </view>
  </view>
</template>

<script>
import PlayMusic from "@/components/luch-audio/luch-audio";
export default {
  components: {
    PlayMusic
  },
  data() {
    return {
      keywords: "",
      music: "",
      poster: "",
      name: "",
      autoplay: false,
      author: "",
      audioPlay: false,
      songs: []
    };
  },
  onLoad() {
    uni.hideLoading();
  },
  methods: {
   async handleSearch() {
      const {result} = await this.request({
        url: `http://47.106.170.118/search?keywords=${this.keywords}`
      })
      this.songs = result.songs.slice(0, 50)
    },
    // 播放音乐
    async handlePlayMusic(musicObj) {
      // const musicObj = {
      //       poster: music.al.picUrl,
      //       name: music.name,
      //       author: music.ar[0].name,
      //       id: music.id
      //   }
      // 获得歌曲详情
      const res = await this.request({
        url: `http://47.106.170.118/song/detail?ids=${musicObj.id}`
      })
      // 获得歌曲url
      const {data} = await this.request({
        url: `http://47.106.170.118/song/url?id=${musicObj.id}`
      })
      const song = res.songs[0]
      this.music = data[0].url
      this.poster = song.al.picUrl
      this.name = song.name
      this.author = song.ar[0].name
      // 自动播放 必须等那边暂停了才能播放
      this.autoplay = true
    } 
  }
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 150rpx;
  .music {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  .search {
    display: flex;
    padding: 20rpx;
    background-color: #eee;
    input {
      width: 100%;
      border-radius: 100rpx;
      background-color: #fff;
      padding: 0 20rpx;
      display: flex;
      align-items: center;
    }
    .btn {
      width: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
      padding: 10rpx;
    }
  }
  .songs {
    .song-item {
     display: flex;
     flex-wrap: nowrap;
     padding: 15rpx;
    .index {
        padding: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
    }
    .song-info {
      .song-name {
          color: #000;
          font-size: 25rpx;
          padding: 5rpx;
      }
    }
    .more-icon {
        margin-left: auto;
        .iconfont {
          font-size: 50rpx;
        }
    }
  }
}
}
</style>
