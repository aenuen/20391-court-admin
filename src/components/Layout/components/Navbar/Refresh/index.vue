<template>
  <div class="wrap">
    <el-tooltip content="刷新缓存" effect="dark" placement="bottom">
      <svg-icon class-name="refresh" icon-class="refresh" @click="refreshToken" />
    </el-tooltip>
  </div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixins
// plugins
// import store from '@/store'
// settings
export default {
  components: {},
  data() {
    return {}
  },
  methods: {
    refreshToken() {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key !== 'Admin-Token') {
          localStorage.removeItem(key)
        }
      }
      this.$message.success('缓存已经清除')
      // store.dispatch('user/refreshToken').then((data) => {
      //   this.$message.success('刷新token成功')
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  .refresh {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>
