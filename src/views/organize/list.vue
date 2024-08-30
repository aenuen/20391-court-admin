<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column label="详情" align="center" width="120">
        <template slot-scope="{ row: { orgId } }">
          <el-button icon="el-icon-view" @click="goSee(orgId)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="fields.name" align="center" />
      <el-table-column prop="orgCode" :label="fields.orgCode" align="center" />
      <el-table-column prop="orgEmail" :label="fields.orgEmail" align="center" />
      <el-table-column prop="orgTelephone" :label="fields.orgTelephone" align="center" />
      <el-table-column label="排序" align="center" width="120">
        <template slot-scope="{ row: { orgId } }">
          {{ orgId }}
        </template>
      </el-table-column>
      <el-table-column label="可见" align="center" width="95">
        <template #default="scope">
          <el-switch v-model="scope.row.isShow" :active-value="1" :inactive-value="0" @change="isShowChange(scope.row.orgId, scope.row.isShow)" />
        </template>
      </el-table-column>
      <el-table-column label="认证" align="center" width="95">
        <template #default="scope">
          <el-switch v-model="scope.row.orgStatus" :active-value="1" :inactive-value="0" @change="statusChange(scope.row.orgId, scope.row.orgStatus)" />
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="{ row: { orgStatus } }">
          {{ orgStatus === 1 ? '已认证' : '未认证' }}
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
import { organizeApi } from '@/api/organize.js'
// components
import Pagination from '@/components/Pagination'
// data
import { fields } from '@/views/organize/modules/fields'
// filter
// function
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
// settings
export default {
  name: 'OrganizeList',
  components: { Pagination },
  mixins: [MethodsMixin, ListMixin],
  data() {
    return {
      fields
    }
  },
  created() {},
  methods: {
    startHandle() {
      this.gainOrganizeList()
    },
    isShowChange(orgId, isShow) {
      organizeApi.set({ orgId, isShow: +isShow === 1 }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.gainOrganizeList()
        } else {
          this.$message.error(msg)
        }
      })
    },
    statusChange(orgId, status) {
      organizeApi.Update({ orgId, status: +status === 1 }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.gainOrganizeList()
        } else {
          this.$message.error(msg)
        }
      })
    },
    gainOrganizeList() {
      organizeApi.list(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          const { records, total } = data
          this.tableData = records
          this.tableDataLength = total
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
