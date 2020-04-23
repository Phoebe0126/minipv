<template>
  <view>
    <!-- 用户信息区域 -->
    <view class="user">
      <view class="user-avatar">
        <image :src="imgDetail.user.avatar" mode="widthFix" />
      </view>
      <view class="user-info">
        <view class="user-name">{{ imgDetail.user.name }}</view>
        <view class="user-time">{{ imgDetail.cnTime }}</view>
      </view>
    </view>
    <!-- 大图显示区域 -->
    <view class="big-img">
      <image :src="imgDetail.newThumb" mode="widthFix" />
    </view>
    <!-- 点赞收藏区域 -->
    <view class="user-rank">
      <view class="user-zan">
        <text class="iconfont icondianzan">{{ imgDetail.rank }}</text>
      </view>
      <view class="user-collection">
        <text class="iconfont iconshoucang">收藏</text>
      </view>
    </view>
    <!-- 专辑区域 -->
    <view class="album-wrapper">
      <!-- 标题 -->
      <view class="album-title">相关</view>
      <!-- 内容 -->
      <view class="album-content">
        <view class="album-item" v-for="item in album" :key="item.id">
          <!-- 缩略图 -->
          <view class="album-img">
            <image :src="item.cover" mode="aspectFill" />
          </view>
          <view class="album-description">
            <view class="album-info-text">
              <text>专辑</text>
            </view>
            <view class="album-name">{{ item.name }}</view>
            <text class="iconfont iconiconfontjiantou4"></text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
// 设置moment为中文显示
moment.locale("zh-cn");
export default {
  data() {
    return {
      // 图片信息数组，用户头像
      imgDetail: {},
      // 图片索引
      imgIndex: 0,
      // 专辑
      album: []
    };
  },
  onLoad() {
    // console.log(getApp().globalData)
    // 结构获得图片数据和索引
    const { imgIndex } = getApp().globalData;
    this.imgIndex = imgIndex;
    this.getData();
  },
  methods: {
    // 获取当前页面的值
    getData() {
      const { imgList } = getApp().globalData;
      this.imgDetail = imgList[this.imgIndex];
      // 处理时间
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow();
      // 处理大图
      this.imgDetail.newThumb =
        this.imgDetail.thumb + this.imgDetail.rule.replace("$<Height>", 360);
      // 获取图片详情的id
      this.getComments(this.imgDetail.id);
    },
    // 获取评论、专辑
    getComments(id) {
      this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      }).then(result => {
        this.album = result.res.album;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  .user-avatar {
    width: 88rpx;
    padding: 10rpx;
    image {
      border-radius: 50rpx;
    }
  }
  .user-info {
    padding: 10rpx;
    .user-name {
      color: #000;
      font-weight: 600;
    }
    .user-time {
      color: #ccc;
      font-size: 24rpx;
    }
  }
}
.big-img {
  image {
    border-bottom: 1rpx solid #eee;
  }
}
.user-rank {
  display: flex;
  justify-content: space-between;
  height: 80rpx;
  border-bottom: 5rpx solid #eee;
  .user-zan {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont.icondianzan {
    }
  }
  .user-collection {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont.iconshoucang {
    }
  }
}
.album-wrapper {
  padding: 20rpx;
  .album-title {
    padding: 10rpx 0;
  }
  .album-content {
    .album-item {
      display: flex;
      padding: 10rpx 0;
      border-bottom: 10rpx solid #eee;
      .album-img {
        flex: 1;
        image {
          width: 180rpx;
          height: 180rpx;
        }
        }
         view.album-description {
          padding-left: 20rpx;
          flex: 3;
          position: relative;
          .album-info-text {
              background-color: $color;
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100rpx;
              height: 50rpx;
              border-radius: 10%;
          }
          .album-name {
              color: #888;
              padding: 10rpx 0;
          }
          .iconfont {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 10%;
              font-size: 40rpx;
          }
        }
      }
    }
}
</style>
