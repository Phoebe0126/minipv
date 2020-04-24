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
      <touch-swiper @swiperaction="handleSwiperAction">
        <image :src="imgDetail.thumb" mode="widthFix" />
      </touch-swiper>
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
    <view class="album-wrapper" v-if="album.length">
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
    <!-- 最热评论区域 -->
    <view class="comments hot" v-if="hot.length">
      <!-- 标题 -->
      <view class="comments-title">
        <text class="iconfont iconhot1"></text>
        <view class="comments-title-name">最热评论</view>
      </view>
      <!-- 内容主体区域 -->
      <view class="comments-list">
        <view 
        class="comments-item"
        v-for="item in hot"
        :key="item.id">
        <view class="user-info">
          <!-- 用户头像 -->
          <view class="user-avatar">
            <image :src="item.user.avatar" mode="widthFix" />
          </view>
          <!-- 用户描述 -->
          <view class="user-desc">
            <view class="user-name">{{item.user.name}}</view>
            <view class="user-time">{{item.cnTime}}</view>
          </view>
          <!-- 用户徽章 -->
          <view class="user-badge">
            <image v-for="item2 in item.user.title" :key="item2.icon" :src="item2.icon" mode="" />
          </view>
          </view>
          <!-- 评论内容 -->
          <view class="content-desc">
            <view class="comment-content">{{item.content}}</view>
            <view class="comment-likes">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        
        </view>
      </view>
    </view>
    <!-- 最新评论区域 -->
    <view class="comments new" v-if="comment.length">
      <!-- 标题 -->
      <view class="comments-title">
        <text class="iconfont iconpinglun"></text>
        <view class="comments-title-name">最新评论</view>
      </view>
      <!-- 内容主体区域 -->
      <view class="comments-list">
        <view 
        class="comments-item"
        v-for="item in comment"
        :key="item.id">
        <view class="user-info">
          <!-- 用户头像 -->
          <view class="user-avatar">
            <image :src="item.user.avatar" mode="widthFix" />
          </view>
          <!-- 用户描述 -->
          <view class="user-desc">
            <view class="user-name">{{item.user.name}}</view>
            <view class="user-time">{{item.cnTime}}</view>
          </view>
          <!-- 用户徽章 -->
          <view class="user-badge">
            <image v-for="item2 in item.user.title" :key="item2.icon" :src="item2.icon" mode="" />
          </view>
          </view>
          <!-- 评论内容 -->
          <view class="content-desc">
            <view class="comment-content">{{item.content}}</view>
            <view class="comment-likes">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
// 引入图片滑动组件
import touchSwiper from '@/components/touchSwiper'
// 设置moment为中文显示
moment.locale("zh-cn");
export default {
  components: {
    touchSwiper
  },
  data() {
    return {
      // 图片信息数组，用户头像
      imgDetail: {},
      // 图片索引
      imgIndex: 0,
      // 专辑
      album: [],
      // 最热评论
      hot: [],
      // 最新评论
      comment: []
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
      // 获取图片详情的id
      this.getComments(this.imgDetail.id);
    },
    // 获取评论、专辑
    getComments(id) {
      this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      }).then(result => {
        this.album = result.res.album;
        // 处理最热评论时间，变成xxx月前
        result.res.hot.forEach(v => {
          v.cnTime = moment(v.atime * 1000).fromNow()
        })
        result.res.comment.forEach(v=> {
          v.cnTime = moment(v.atime * 1000).fromNow()
        })
        this.hot = result.res.hot
        this.comment = result.res.comment
      });
    },
    // 处理图片滑动
    handleSwiperAction (params) {
      // 向左滑动,index--
      if (params.direction === 'left' && this.imgIndex - 1 > 0) {
        this.imgIndex--;
        this.getData()
      } else if (params.direction === 'right' && this.imgIndex + 1 < getApp().globalData.imgList.length - 1) {
        this.imgIndex++;
        this.getData()
      } else {
        // 数组越界
        uni.showToast({
          title: '暂时无更多数据',
          icon: 'none'
        });
      }
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
              color: #000;
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
 .comments {
   .comments-title {
     display: flex;
     align-items: center;
    text.iconfont.iconhot1 {
      color: red;
      font-size: 40rpx;
    }
     .comments-title-name {
       font-weight: 600;
       font-size: 28rpx;
       margin-left: 10rpx;
       color: #666;
    }
  }
   .comments-list {
     .comments-item {
       border-bottom: 10rpx solid #eee;
       .user-info {
         display: flex;
         padding: 20rpx 0;
         .user-avatar {
            width: 15%;
            display: flex;
            justify-content: center;
            align-items: center;
          image {
            width: 90%;
          }
        }
         .user-desc {
           display: flex;
           .user-name {
             color: #777;
          }
           .user-time {
             color: #ccc;
             font-size: 24rpx;
             padding: 5rpx;
          }
        }
         .user-badge {
          image {
            width: 40rpx;
            height: 40rpx;
            display: inline-block;
          }
        }
       }
         .content-desc {
           display: flex;
           padding: 30rpx 0;
           .comment-content {
             flex: 1;
             padding-left: 15%;
             color: #000;
          }

           .comment-likes {
            text-align: right;
          }
        }
    }
  }
}
.new {
  .iconpinglun {
    color: skyblue !important;
  }
}
</style>
