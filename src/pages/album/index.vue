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
  </view>
</template>

<script>
export default {
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
        wallpaper: []
      }
    },
    onLoad (option) {
        uni.setNavigationBarTitle({
            title: '专辑详情'
        });
        this.id = option.id
    },
    mounted () {
        this.getDataList()
    },
    methods: {
        getDataList () {
            this.request({
                url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
                data: this.params
            })
            .then(result => {
                // 第一次获取
                if (Object.keys(this.album).length === 0) {
                    this.album = result.res.album
                }
                this.wallpaper = result.res.wallpaper
                
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
</style>
