<template>
  <div class="steps">
    <el-steps :active="step" simple>
      <el-step title="基本资料" icon="el-icon-edit"></el-step>
      <el-step title="上传材料" icon="el-icon-upload"></el-step>
      <el-step title="选择机构" icon="el-icon-picture-outline-round"></el-step>
      <el-step title="预览提交" icon="el-icon-view"></el-step>
      <el-step title="等候审核" icon="el-icon-document"></el-step>
      <el-step title="支付费用" icon="el-icon-money"></el-step>
      <el-step title="缴费确认" icon="el-icon-brush"></el-step>
      <el-step title="等待出函" icon="el-icon-brush"></el-step>
    </el-steps>
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
// settings
export default {
  name: 'GuaranteeSteps',
  components: {},
  mixins: [],
  props: {
    step: { type: Number, default: 0 }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss">
.steps {
  min-width: 1015px;
  .is-process {
    font-weight: normal !important;
    color: #1890ff;
  }
  .is-finish {
    font-weight: normal !important;
    color: #333;
  }
}
</style>
