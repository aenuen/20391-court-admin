<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="rootAdd">根目录添加</el-button>
    </div>
    <TableList :list-data="tableData" @onRemove="onRemove" @onCreate="onCreate" @onUpdate="onUpdate" />
    <el-dialog v-if="DetailVisible" width="950px" :close-on-click-modal="false" title="字典" :visible.sync="DetailVisible">
      <Detail :is-update="isUpdate" :update-no="updateNo" :parent-id="parentId" @onCreateSuccess="onCreateSuccess" @onUpdateSuccess="onUpdateSuccess" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { dictApi } from '@/api/dict'
// components
import Detail from './components/Detail'
import TableList from './components/TableList'
// data
// filter
// function
// mixin
// plugins
// settings
export default {
  name: 'DictList',
  components: { Detail, TableList },
  data() {
    return {
      parentId: 0,
      isUpdate: false,
      updateNo: {},
      DetailVisible: false,
      tableData: []
    }
  },
  created() {
    this.startHandle()
  },
  methods: {
    // 根目录添加
    rootAdd() {
      this.isUpdate = false
      this.parentId = 0
      this.DetailVisible = true
    },
    // 添加
    onCreate(id) {
      this.parentId = id
      this.DetailVisible = true
    },
    // 添加成功
    onCreateSuccess() {
      this.parentId = 0
      this.DetailVisible = false
      this.startHandle()
    },
    // 编辑
    onUpdate(row) {
      this.updateNo = row
      this.isUpdate = true
      this.DetailVisible = true
    },
    // 编辑成功
    onUpdateSuccess() {
      this.updateNo = {}
      this.isUpdate = false
      this.DetailVisible = false
      this.startHandle()
    },
    // 删除
    onRemove(id) {
      dictApi.remove(id).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.startHandle()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 获取列表
    startHandle() {
      dictApi.list().then(({ code, data, msg }) => {
        if (code === 200) {
          this.tableData = [...data]
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
