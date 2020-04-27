// 封装异步请求
uni.showLoading({
    title: '加载中'
});
export default (params) => {
    return new Promise((resolve, reject) => {
        wx.request({
           ...params,
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                reject(err)
            },
            complete() {
                uni.hideLoading();
            },
            // 跨域
            withCredentials: true
        })
    })
}