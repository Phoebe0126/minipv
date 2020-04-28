<template>
  <view class="cate-tab">
    <view class="tab-title">
      <view class="tab-inner"
        ><uni-segmented-control
          :current="current"
          :values="items.map(v => v.title)"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#fa7298"
        ></uni-segmented-control
      ></view>
      <view class="iconfont iconsearch"></view>
    </view>
    <scroll-view
      scroll-y
      @scrolltolower="handleToLower"
      class="scroll-view"
      v-if="imgList.length > 0"
      enable-flex
    >
      <view class="img-wrap" v-for="item in imgList" :key="item.id">
          <view @click="handleClick(item)">
        <image :src="item.img" mode="widthFix" />
          </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import goDetail from "@/components/goDetail";
export default {
  components: {
    uniSegmentedControl,
    goDetail
  },
  data() {
    return {
      id: "",
      items: [
        {
          title: "最新",
          order: "new"
        },
        {
          title: "热门",
          order: "hot"
        }
      ],
      current: 0,
      params: {
        limit: 30,
        skip: 0,
        order: "new"
      },
      imgList: [],
      hasMore: true
    };
  },
  onLoad(option) {
    this.id = option.id;
    this.getData();
  },
  methods: {
    async getData() {
      const { res: data } = await this.request({
        url: `http://157.122.54.189:9088/videoimg/v1/videowp/category/${this.id}`,
        data: this.params
      });
      if (data.videowp.length === 0) {
          this.hasMore = false
           uni.showToast({
             title: '暂时无更多视频~',
             icon: 'none'
         });
          return 
      }
      this.imgList = [...this.imgList, ...data.videowp];
    },
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
        this.params.order = this.items[this.current].order;
        // 清空
        this.params.skip = 0
        this.imgList = []
        this.getData()
      }
    },
    handleToLower () {
     // 划到了底部
     if (this.hasMore) {
         // 跳过之前的图片
         this.params.skip += this.params.limit
         this.getData()
     } else {
         uni.showToast({
             title: '暂时无更多图片~',
             icon: 'none'
         });
     }
    },
    handleClick (item) {
        getApp().globalData.videoObj = item
        uni.navigateTo({
             url:  '/pages/videoPlay/index'
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-title {
  position: relative;
  .tab-inner {
    width: 50%;
    margin: 0 auto;
  }
  .iconsearch {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10%;
  }
}
.scroll-view  {
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 36px);
   .img-wrap {
       flex: 33.33%;
       border: 5rpx solid #fff;
    image {

    }
  }
}
</style>
