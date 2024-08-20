<template>
  <el-table :data="data" border style="width: 100%">
    <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
    <el-table-column prop="applyType" label="申请人类型"> </el-table-column>
    <el-table-column prop="name" label="申请人名称"> </el-table-column>
    <el-table-column prop="area" label="国别"> </el-table-column>
    <el-table-column prop="certType" label="证件类型"> </el-table-column>
    <el-table-column prop="certNo" label="证件号码"> </el-table-column>
    <el-table-column prop="telephone" label="手机号码"> </el-table-column>
    <el-table-column label="编辑" align="center" width="95">
      <template slot-scope="{ row: { applyId } }">
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="onUpdateAlone(applyId)">编辑</el-button>
      </template>
    </el-table-column>
    <el-table-column label="删除" align="center" width="95">
      <template slot-scope="{ row: { applyId } }">
        <el-button size="mini" type="warning" icon="el-icon-delete" @click="onRemoveAlone(applyId)">删除</el-button>
      </template>
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
      this.$emit('RespondentUpdate', this.updateId)
    },
    removeAlone() {
      this.$emit('RespondentDelete', this.removeId)
    }
  }
}
</script>
<style lang="scss" scoped></style>
