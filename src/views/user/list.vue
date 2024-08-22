<template>
  <div class="app-container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="telephone" label="手机号码"> </el-table-column>
      <el-table-column prop="cardNo" label="身份证号码"> </el-table-column>
      <el-table-column label="状态" align="center" width="95">
        <template #default="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="statusChange" />
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="95">
        <template slot-scope="{ row: { agentId } }">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="onUpdateAlone(agentId)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center" width="95">
        <template slot-scope="{ row: { agentId } }">
          <el-button size="mini" type="warning" icon="el-icon-delete" @click="onRemoveAlone(agentId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.pageNum" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
  </div>
</template>
<script>
// api
import { userApi } from '@/api/user'
// components
import Pagination from '@/components/Pagination'
// data
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
// settings
export default {
  name: 'UserList',
  components: { Pagination },
  mixins: [ListMixin],
  data() {
    return {}
  },
  created() {},
  methods: {
    startHandle() {
      userApi.list(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          const { records, total } = data
          this.tableData = records
          this.tableDataLength = total
        } else {
          this.message.error(msg)
        }
      })
    },
    statusChange(value) {
      console.log(value)
    }
  }
}
</script>
<style lang="scss" scoped></style>
