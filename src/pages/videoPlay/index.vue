<template>
  <view class="background">
    <!-- 背景图片 -->
    <image :src="videoObj.img" mode />
    <!-- 工具栏 分享下载静音 -->
    <view class="video-tools">
      <!-- 静音 -->
      <view :class="['iconfont', muted ? 'iconjingyin' : 'iconshengyin']" @click="handleMuted"></view>
      <!-- 分享 -->
      <view class="iconfont iconzhuanfa">
        <button open-type="share"></button>
      </view>
      <!-- 下载 -->
      <view class="iconfont" @click="handleDownLoad">
        <i class="download">&#xe823;</i>
      </view>
    </view>
    <view class="video-wrap">
      <!-- 音乐播放 -->
      <video
        :muted="muted"
        id="video"
        :src="videoObj.video"
        :danmu-list="danmuList"
        enable-danmu
        danmu-btn
        controls
        enable-play-gesture
        objectFit="fill"
        show-play-btn
      ></video>
    </view>
    <!-- 弹幕 -->
    <view class="uni-list uni-common-mt">
      <view class="uni-form-item uni-column">
        <input class="uni-input" focus v-model="danmuValue" placeholder="在此处输入弹幕内容" />
      </view>
      <view class="uni-btn-v">
        <button @click="sendDanmu" class="page-body-button">发送弹幕</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      videoObj: {},
      // 是否静音:
      muted: false,
      danmuList: [
        {
          text: "啦啦啦啦啦啦啦~",
          color: "#fff",
          time: 1
        },
        {
          text: "狗子来了啊啊啊",
          color: "pink",
          time: 3
        }
      ],
      // 发送的弹幕
      danmuValue: ""
    };
  },
  onReady() {
    this.videoContext = uni.createVideoContext("video");
  },
  onLoad() {
    this.videoObj = getApp().globalData.videoObj;
  },
  methods: {
    // 静音与否
    handleMuted() {
      this.muted = !this.muted;
    },
    // 发送弹幕
    sendDanmu() {
      this.videoContext.sendDanmu({
        text: this.danmuValue,
        color: "#fff"
      });
      this.danmuValue = "";
    },
    // 下载视频
    async handleDownLoad () {
     await uni.showToast({
        title: '下载视频中~',
        icon: 'none'
      });
      // 下载到小程序内存中
      const res = await uni.downloadFile({
        url: this.videoObj.video
      });
      // 从小程序内存下载到本地
      await uni.saveVideoToPhotosAlbum({
        filePath: res[1].tempFilePath
      });
      uni.hideLoading();
      await uni.showToast({
        title: '下载成功~'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.background {
  position: relative;
  image {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    // 背景
    filter: blur(20px);
  }
  .video-wrap {
    display: flex;
    justify-content: center;
    video {
      width: 360rpx;
      height: 600rpx;
    }
  }
  .video-tools {
    height: 80rpx;
    display: flex;
    justify-content: flex-end;
    margin: 20rpx 0;
    .iconfont {
      width: 80rpx;
      color: #fff;
      font-size: 50rpx;
      border-radius: 40rpx;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20rpx;
    }

    .iconfont.iconzhuanfa {
      position: relative;
      button {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
  .uni-common-mt {
    .uni-form-item.uni-column {
      margin: 20rpx 0;
      display: flex;
      justify-content: center;
      align-items: center;
      input.uni-input {
        width: 95%;
        background-color: #f4f4f4;
        height: 100rpx;
        padding: 0 10rpx;
        font-size: 30rpx;
        color: #212121;
      }
    }
    .page-body-button {
      background-color: $color;
      border-radius: 50rpx;
      font-size: 50rpx;
      color: #fff;
    }
  }
}
</style>
