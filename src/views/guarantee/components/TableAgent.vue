<template>
  <el-table :data="data" border style="width: 100%">
    <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
    <el-table-column prop="class" label="申请人类型"> </el-table-column>
    <el-table-column prop="name" label="申请人名称"> </el-table-column>
    <el-table-column prop="country" label="国别"> </el-table-column>
    <el-table-column prop="type" label="证件类型"> </el-table-column>
    <el-table-column prop="number" label="证件号码"> </el-table-column>
    <el-table-column prop="mobile" label="手机号码"> </el-table-column>
    <el-table-column label="编辑" align="center" width="95">
      <el-button size="mini" type="primary" icon="el-icon-edit" @click="onUpdateAlone(3)">编辑</el-button>
    </el-table-column>
    <el-table-column label="删除" align="center" width="95">
      <el-button size="mini" type="warning" icon="el-icon-delete" @click="onRemoveAlone(4)">删除</el-button>
    </el-table-column>
  </el-table>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
// settings
export default {
  name: 'TableApp',
  components: {},
  mixins: [ListMixin],
  props: {
    data: { type: Array, default: () => [] }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    updateAlone() {
      this.$emit('AgentUpdate', this.updateId)
    },
    removeAlone() {
      this.$emit('AgentDelete', this.removeId)
    }
  }
}
</script>
<style lang="scss" scoped></style>
