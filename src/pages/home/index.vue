<template>
  <view class="tab">
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

    <view class="tab-content">
      <view v-if="current === 0">
        <home-recommend></home-recommend>
      </view>
      <view v-if="current === 1">
        <home-category></home-category>
      </view>
      <view v-if="current === 2">
        <home-new></home-new>
      </view>
      <view v-if="current === 3">
        <home-album></home-album>
      </view>
    </view>
  </view>
</template>

<script>
import { homeAlbum } from "./home-album";
import { homeCategory } from "./home-category";
import { homeNew } from "./home-new";
import { homeRecommend } from "./home-recommend";
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    homeAlbum,
    homeCategory,
    homeNew,
    homeRecommend,
    uniSegmentedControl
  },
  data() {
    return {
      items: [
        {
          title: "推荐"
        },
        {
          title: "分类"
        },
        {
          title: "最新"
        },
        {
          title: "专辑"
        }
      ],
      current: 0
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  },
  onLoad() {}
};
</script>

<style lang="scss" scoped>
.tab-title {
  position: relative;
  .tab-inner {
    width: 60%;
    margin: 0 auto;
  }
  .iconsearch {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10%;
  }
}
</style>
