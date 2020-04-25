<template>
    <view>1234</view>
</template>

<script>
export default {
    props: {
        urlObj: Object
    },
    mounted () {
        this.getData()
    },
    watch: {
        urlObj () {
            // 因为四个页面共享这个组件 所有监听urlObj的变化
            this.getData()
        }
    },
    methods: {
        async getData () {
            const {res : data } = await this.request({
                url: this.urlObj.url,
                params: this.urlObj.params
            })
            console.log(data)
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>