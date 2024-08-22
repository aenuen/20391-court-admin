<template>
  <div class="app-container">
    <div class="icon"><svg-icon icon-class="approve" /></div>
    <div class="text">我们将在三个工作日内进行审批，请稍后……</div>
    <div class="href">
      <el-button @click="backList">返回列表</el-button>
    </div>
  </div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'GuaranteeAudit',
  components: {},
  mixins: [MethodsMixin],
  data() {
    return {}
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
  padding-top: 230px;
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
