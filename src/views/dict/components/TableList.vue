<template>
  <el-table :data="listData" border row-key="dictId" :default-expand-all="false" :tree-props="{ children: 'child', hasChildren: 'hasChildren' }" :row-class-name="tableRowClassName">
    <el-table-column prop="dictId" label="编号" width="100" align="center" />
    <el-table-column prop="parentId" label="父编号" width="100" align="center" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="dictKey" label="字段名" />
    <el-table-column prop="dictValue" label="字段值" />
    <el-table-column prop="description" label="描述" />
    <el-table-column label="添加" align="center" width="95">
      <template slot-scope="{ row: { dictId, parentId } }">
        <el-button v-if="!parentId" size="mini" type="success" icon="el-icon-plus" @click="createAlone(dictId)">添加</el-button>
      </template>
    </el-table-column>
    <el-table-column label="编辑" align="center" width="95">
      <template slot-scope="{ row }">
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="updateAlone(row)">编辑</el-button>
      </template>
    </el-table-column>
    <el-table-column label="删除" align="center" width="95">
      <template slot-scope="{ row: { dictId } }">
        <el-button size="mini" type="warning" icon="el-icon-delete" @click="removeAlone(dictId)">删除</el-button>
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
// plugins
// settings
export default {
  name: 'DictTableList',
  components: {},
  mixins: [],
  props: {
    listData: { type: Array, default: () => [] }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    tableRowClassName({ row }) {
      return row.parentId === 0 ? 'highlight-row' : ''
    },
    // 添加
    createAlone(id) {
      this.$emit('onCreate', id)
    },
    // 编辑
    updateAlone(row) {
      this.$emit('onUpdate', row)
    },
    // 删除
    removeAlone(id) {
      this.$confirm('删除后将无法恢复，确定继续删除吗？', '温馨提示', {
        type: 'warning'
      })
        .then(() => {
          this.$emit('onRemove', id)
        })
        .catch(() => {
          this.removeId = 0
          this.$message.info('取消删除')
        })
    }
  }
}
</script>
<style lang="scss">
.el-table .highlight-row {
  background: #f5f5f5;
}
</style>
