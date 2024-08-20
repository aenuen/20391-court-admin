<template>
  <el-table :data="data" border style="width: 100%">
    <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
    <el-table-column prop="money" label="财产金额"> </el-table-column>
    <el-table-column prop="assetType" label="财产类型"> </el-table-column>
    <el-table-column prop="assetBelong" label="财产所有人"> </el-table-column>
    <el-table-column label="编辑" align="center" width="95">
      <template slot-scope="{ row: { clueId } }">
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="onUpdateAlone(clueId)">编辑</el-button>
      </template>
    </el-table-column>
    <el-table-column label="删除" align="center" width="95">
      <template slot-scope="{ row: { clueId } }">
        <el-button size="mini" type="warning" icon="el-icon-delete" @click="onRemoveAlone(clueId)">删除</el-button>
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
      this.$emit('PropertyUpdate', this.updateId)
    },
    removeAlone() {
      this.$emit('PropertyDelete', this.removeId)
    }
  }
}
</script>
<style lang="scss" scoped></style>
