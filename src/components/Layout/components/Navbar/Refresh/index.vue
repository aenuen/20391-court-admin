<template>
  <div class="wrap">
    <el-tooltip content="刷新token" effect="dark" placement="bottom">
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
// mixin
// plugins
import store from '@/store'
// settings
export default {
  components: {},
  data() {
    return {}
  },
  methods: {
    refreshToken() {
      store.dispatch('user/refreshToken').then((data) => {
        this.$message.success('刷新token成功')
      })
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
