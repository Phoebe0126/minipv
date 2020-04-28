<template>
  <view class="music-wrapper">
    <!-- 主页 -->
    <music-home
    :banners="banners"
    :playlists="playlists"
    :limit="limit"
    v-if="currentPage === 'musicHome'"
    @changetodetail="handleChangeToDetail"
    ></music-home>
    <!-- 歌单详情 -->
    <playlist-detail
    v-if="currentPage === 'playlistDetail'"
    :playlist="playlist"
    @backhome="handleBackHome"
    @playmusic="handlePlayMusic"
    ></playlist-detail>
    <!-- 播放音乐 -->
    <view class="music">
      <play-music :src="music" :poster="poster" :name="name" :autoplay="autoplay" :author="author" :play.sync="audioPlay"></play-music>
    </view>
  </view>
</template>

<script>
import PlayMusic from '@/components/luch-audio/luch-audio'
import MusicHome from '@/components/musicHome'
import PlaylistDetail from '@/components/playlistDetail'
export default {
  components: {
    PlayMusic,
    MusicHome,
    PlaylistDetail
  },
  data() {
    return {
      // banner轮播数据
      banners: [],
      // 音乐
      music: "",
      audioPlay: false,
      // 热门歌单
      playlists: [],
      limit: 30,
      currentPage: 'musicHome',
      // 歌单
      playlist: {},
      // 海报
      poster: '',
      //歌曲名字
      name: '',
      // 歌曲作者
      author: '',
      // 自动播放音乐
      autoplay: false,
      // 是否有更多歌单
      hasMore: true
    };
  },
  onLoad() {
    this.getBannerData();
    this.getPlayList();
  },
   // 页面触底 加载新的歌单
    onReachBottom () {
        if (!this.hasMore) {
            uni.showToast({
                title: '暂时无更多~',
                icon: 'none'
            });
        } else {
            this.limit += 20;
            this.getPlayList()
        }
    },
  methods: {
    async getBannerData() {
      const { banners } = await this.request({
        url: "http://47.106.170.118/banner?type=2"
      });
      this.banners = banners;
    },
    // 获取热门歌单
   async getPlayList () {
     const res = await this.request({
       url: `http://47.106.170.118/top/playlist?cat=韩语&limit=${this.limit}`
      })
      // 获取的歌单数不变
      if (this.playlists.length === res.playlists.length) {
        this.hasMore = false
        uni.showToast({
          title: '暂时无更多~',
          icon: 'none'
        });
        return 
      }
      this.playlists = res.playlists
      // 处理收听人数
      this.playlists.forEach(v=> {
        if (v.playCount > 10000) {
          v.newPlayCount = (v.playCount / 10000).toFixed(1) + '万'
        } else {
          v.newPlayCount = v.playCount
        }
      })
    },
    // 切换到歌单详情页面
    handleChangeToDetail (id, title) {
      this.getPlayListDetail(id)
      this.currentPage = 'playlistDetail'
    },
    // 获取歌单详情
    async getPlayListDetail(id) {
      const {playlist} = await this.request({
        url: `http://47.106.170.118/playlist/detail?id=${id}`
      })
      this.playlist = playlist
    },
    // 返回到音乐首页
    handleBackHome () {
      this.currentPage = 'musicHome'
      // 清空歌单列表
      this.playlist = {}
    },
    // 播放音乐
    async handlePlayMusic(musicObj) {
      // const musicObj = {
      //       poster: music.al.picUrl,
      //       name: music.name,
      //       author: music.ar[0].name,
      //       id: music.id
      //   }
      // song/detail?ids=347230
      const {data} = await this.request({
        url: `http://47.106.170.118/song/url?id=${musicObj.id}`
      })
      this.music = data[0].url
      this.poster = musicObj.poster
      this.name = musicObj.name
      this.author = musicObj.author
      // 自动播放
      this.autoplay = true
      this.audioPlay = true
    } 
  }
};
</script>

<style lang="scss" scoped>
.music-wrapper {
  margin-bottom: 150rpx;
.music {
  width: 100%;
  position: fixed;
  bottom: 0;
}
}
</style>
