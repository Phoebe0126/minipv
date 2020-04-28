<template>
<view class="wrap">
    <!-- 头部背景区域 -->
  <view class="background-wrap">
    <!-- 返回 -->
    <view class="back-icon" @click="handleBackToHome">
      <i class="iconfont">&#xe63b;首页</i>
    </view>
    <!-- 头部区域 -->
    <view class="playlist-top">
      <!-- 头像 -->
      <view class="avatar">
        <image :src="playlist.coverImgUrl" mode="aspectFill" />
      </view>
      <!-- 歌单描述 -->
      <view class="playlist-info">
        <view class="playlist-title">{{ playlist.name }}</view>
        <view class="creator">
          <view class="creator-ava">
            <image :src="playlist.creator.avatarUrl" mode="spectFill" />
          </view>
          <view class="creator-name" v-if="playlist.creator.nickname"
            >{{ playlist.creator.nickname }}></view
          >
        </view>
        <view class="playlist-desc">{{ playlist.description }}</view>
      </view>
    </view>
  </view>
  <!-- 歌曲列表区域 -->
  <view class="songs">
      <view class="song-item" v-for="(item,index) in playlist.tracks" :key="item.id" @click="handleClickSong(item)">
          <view class="index">{{index + 1}}</view>
          <view class="song-info">
              <view class="song-name">{{item.name}}</view>
              <view class="song-author-album">{{item.ar[0].name}}-{{item.al.name}}</view>
          </view>
          <view class="more-icon">
              <i class="iconfont">&#xe7fb;</i>
          </view>
      </view>
  </view>
</view>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Object
    }
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "歌单详情"
    });
  },
  methods: {
    handleBackToHome() {
      this.$emit("backhome");
    },
    // 点击播放音乐
    handleClickSong(music) {
        // poster title author url
        // /song/url?id=33894312
        const musicObj = {
            poster: music.al.picUrl,
            name: music.name,
            author: music.ar[0].name,
            id: music.id
        }
        this.$emit('playmusic',musicObj)
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
.background-wrap {
  .back-icon {
    padding: 10rpx;
    font-size: 24rpx;
  }
  .playlist-top {
    display: flex;
    .avatar {
      flex: 1;
      padding: 20rpx;
      image {
        z-index: 1;
        border-radius: 5%;
        width: 200rpx;
        height: 200rpx;
      }
    }
    .playlist-info {
      padding: 20rpx;
      flex: 2;
      overflow: hidden;
      .playlist-title {
        font-weight: 600;
        font-size: 30rpx;
      }
      .creator {
        display: flex;
        align-items: center;
        .creator-ava {
          padding: 20rpx;
          image {
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
          }
        }
        .creator-name {
        }
      }
      .playlist-desc {
        overflow: hidden;
        height: 30rpx;
        font-size: 22rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
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
      .song-author-album {

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
