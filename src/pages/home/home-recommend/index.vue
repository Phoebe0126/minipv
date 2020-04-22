<template>
  <scroll-view
    scroll-y
    @scrolltolower="handleToLower"
    class="scroll-view"
    v-if="recommendList.length > 0"
  >
    <!-- 推荐区域 -->
    <view class="recommend-wrapper">
      <view class="recommend-img" v-for="item in recommendList" :key="item.id">
        <!-- 推荐图片区域，宽度自适应 -->
        <image :src="item.thumb" mode="widthFix" />
      </view>
    </view>
    <!-- 月份显示区域 -->
    <view class="month-wrapper">
      <view class="month-title">
        <view class="month-title-info">
          <text>{{ monthObj.DD }}/</text>
          {{ monthObj.MM }}月
        </view>
        <view class="month-text">{{ monthObj.title }}</view>
        <view class="month-more">更多 > </view>
      </view>
      <view class="month-content">
        <view class="month-img" v-for="item in monthObj.items" :key="item.id">
          <image
            :src="item.thumb + item.rule.replace('$<Height>', 320)"
            mode="aspectFill"
          />
        </view>
      </view>
    </view>
    <!-- 热门区域 -->
    <view class="hots">
      <view class="hots-title">
        <text>热门</text>
      </view>
      <view class="hots-imgs">
        <view class="hots-img" v-for="item in hotsList" :key="item.id">
          <image :src="item.thumb" mode="aspectFill" />
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      // 推荐列表
      recommendList: [],
      // 月份显示列表
      monthObj: {},
      // 热门列表
      hotsList: [],
      // 请求的参数列表
      params: {
        limit: 30, // 获取多少条数据,
        order: "hot", // 关键字
        skip: 0 // 跳过多少条
      },
      // 是否还有更多数据
      hasMore: true
    };
  },
  mounted() {
    // 获取后台数据
    this.getData();
  },
  methods: {
    getData() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.params
      }).then(result => {
        // 判断是否还有图片
        if (result.res.vertical.length === 0) {
            this.hasMore = false
            return
        }
        // 避免重复赋值 第一次请求时
        if (this.recommendList.length === 0) {
          this.recommendList = result.res.homepage[1].items;
          this.monthObj = result.res.homepage[2];
          // 处理时间戳格式 返回 DD/MM
          this.monthObj.DD = moment(this.monthObj.stime).format("DD");
          this.monthObj.MM = moment(this.monthObj.stime).format("MM");
        }
          // 组合之前的热门列表
          this.hotsList = [...this.hotsList, ...result.res.vertical];
      });
    },
    handleToLower() {
      // 调整skip个数 跳过之前的
      this.params.skip += this.params.limit
      // 重新发起请求
      this.getData()
      // 图片已经请求完
      if (!this.hasMore) {
          uni.showToast({
              title: '已经没有图片了哟~',
              duration: 2000
          });
      }
    }
  }
};
</script>
<style lang="scss">
.scroll-view {
    // 必须设置scroll-view的高度才可以使用，忽略底部tabbar，减去头部tab即可
    height: calc(100vh - 36px);
  .recommend-wrapper {
    display: flex;
    flex-wrap: wrap;
    .recommend-img {
      flex: 50%;
      border: 3rpx solid #fff;
    }
  }
  view.month-wrapper {
    view.month-title {
      padding: 20rpx;
      display: flex;
      justify-content: space-between;
      color: $color;
      font-weight: 600;
      line-height: 20rpx;
      view.month-title-info {
        display: flex;
        margin-left: 20rpx;
        font-size: 30rpx;
        text {
          font-size: 36rpx;
        }
      }
      .month-text {
        font-size: 34rpx;
        color: #666;
      }
      view.month-more {
      }
    }
    view.month-content {
      display: flex;
      flex-wrap: wrap;
      .month-img {
        flex: 33.33%;
        border: 2rpx solid #fff;
      }
    }
  }
  view.hots {
    view.hots-title {
      border-left: 5rpx solid $color;
      padding-left: 20rpx;
      text {
        font-size: 34rpx;
        font-weight: 600;
      }
    }

    view.hots-imgs {
      display: flex;
      flex-wrap: wrap;
      view.hots-img {
        flex: 33.33%;
        border: 2rpx solid #fff;
        img {
        }
      }
    }
  }
}
</style>
