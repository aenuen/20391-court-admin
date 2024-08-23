<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 申请法院 -->
      <el-input v-model="queryList.telephone" placeholder="手机号码" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <!-- 搜索 -->
      <el-button class="filter-btn el-icon-search" @click="handleFilter"> 搜索 </el-button>
      <!-- 新增按纽 -->
      <el-button type="success" class="filter-btn el-icon-plus" @click="routerGo('create')"> 创建 </el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="telephone" label="手机号码"> </el-table-column>
      <el-table-column prop="cardNo" label="身份证号码"> </el-table-column>
      <el-table-column label="状态" align="center" width="95">
        <template #default="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" :disabled="aid === scope.row.userId" @change="statusChange(scope.row.status, scope.row.userId)" />
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center" width="95">
        <template slot-scope="{ row: { userId } }">
          <el-button size="mini" type="warning" icon="el-icon-delete" @click="onRemoveAlone(userId)">删除</el-button>
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
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { mapGetters } from 'vuex'
// settings
export default {
  name: 'UserList',
  components: { Pagination },
  mixins: [ListMixin, MethodsMixin],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['aid'])
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
    removeAlone() {
      userApi.remove(this.removeId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.startHandle()
        } else {
          this.message.error(msg)
        }
      })
    },
    statusChange(status, userId) {
      userApi.status({ status, userId }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
        } else {
          this.message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
