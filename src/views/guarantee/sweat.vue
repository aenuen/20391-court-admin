<template>
  <div class="app-container">
    <Steps :step="7" />
    <div class="icon"><el-image :src="image" /></div>
    <div class="text">我们将在二个工作日内进行出函，请稍后……</div>
    <div class="href">
      <el-button @click="backList">返回列表</el-button>
    </div>
  </div>
</template>
<script>
// api
// components
import Steps from './components/Steps'
// data
// filter
// function
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'GuaranteeAudit',
  components: { Steps },
  mixins: [MethodsMixin],
  data() {
    return {
      image: require('@/assets/image/status/review.png')
    }
  },
  created() {},
  methods: {
    backList() {
      this.routerClose('/guarantee/list')
    }
  }
}
</script>
<style lang="scss" scoped>
.icon {
  font-size: 150px;
  height: 400px;
  padding-top: 130px;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中，如需要 */
}
.text {
  text-align: center;
}
.href {
  padding: 30px 0;
  text-align: center;
}
</style>
