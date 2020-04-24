<template>
  <view>
    <!-- 专辑背景 -->
    <view class="background">
        <image :src="album.cover" mode="widthFix" />
        <view class="album-info">
            <view class="album-name">{{album.name}}</view>
            <view class="album-btn">关注专辑</view>
        </view>
    </view>
    <!-- 专辑描述 -->
    <view class="album-info">
        <view class="album-title">
            <view class="img-avatar">
                <image :src="album.user.avatar" mode="widthFix" />
            </view>
            <view class="album-user-name">{{album.user.name}}</view>
        </view>
        <view class="album-desc">
            <!-- 为了识别换行符，记得用text -->
            <text>{{album.desc}}</text>
        </view>
    </view>
    <!-- 图片浏览 -->
    <view class="wallpaper">
        <view class="image-wrapper" v-for="(item,index) in wallpaper" :key="item.id">
            <go-detail :list="wallpaper" :index="index">
                 <image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="aspectFill" />
            </go-detail>
            </view>
    </view>
  </view>
</template>

<script>
import goDetail from '@/components/goDetail'
export default {
    components: {
        goDetail
    },
    data () {
      return {
            // 专辑id
        id: -1,
        params: {
            // 获取多少天数据
            limit: 30,
            order: 'new',
            skip: 0,
            first: 1, // 第一次请求ornot,  
        },
        album: {},
        wallpaper: [],
        hasMore: true
      }
    },
    onLoad (option) {
        uni.setNavigationBarTitle({
            title: '专辑详情'
        });
        // this.id = option.id
        this.id = '5d5f8e45e7bce75ae7fb8278'
    },
    mounted () {
        this.getDataList()
    },
    // 页面触底 加载新的图片
    onReachBottom () {
        if (!this.hasMore) {
            uni.showToast({
                title: '暂时无更多图片~',
                icon: 'none'
            });
        } else {
            this.params.skip += this.params.limit
            this.getDataList()
        }
    },
    methods: {
        getDataList () {
            this.request({
                url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
                data: this.params
            })
            .then(result => {
                // 返回的wallpaper无
                if (result.res.wallpaper.length === 0) {
                    this.hasMore = false
                    return 
                }
                // 第一次获取
                if (Object.keys(this.album).length === 0) {
                    this.album = result.res.album
                }
                // 和之前的拼接
                this.wallpaper = [...this.wallpaper, ...result.res.wallpaper]
            })
        }
    }
}
</script>

<style lang="scss" scoped>
view.background {
    position: relative;
  view.album-info {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      justify-content: space-between;
      height: 80rpx;
      align-items: center;
      color: #fff;
      padding: 0 15rpx;
      display: flex;
    view.album-name {
        font-size: 40rpx;
    }
    view.album-btn {
        display: flex;
        background-color: $color;
        width: 152rpx;
        height: 60rpx;
        justify-content: center;
        align-items: center;
        border-radius: 10rpx;
    }
  }
}
view.album-info {
    padding: 10rpx;
  view.album-title {
      padding: 10rpx 0;
      display: flex;
      align-items: center;
    view.img-avatar {
        width: 100rpx;
    }
    view.album-user-name {
        margin-left: 10rpx;
        color: #000;
    }
  }
}
view.wallpaper {
    display: flex;
    flex-wrap: wrap;
  view.image-wrapper {
      flex: 33.33%;
      border: 3rpx solid #fff;
    image {
        height: 200rpx;
    }
  }
}
</style>
