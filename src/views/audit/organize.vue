<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="name" :label="fields.name" align="center" />
      <el-table-column prop="orgCode" :label="fields.orgCode" align="center" />
      <el-table-column prop="orgEmail" :label="fields.orgEmail" align="center" />
      <el-table-column prop="orgTelephone" :label="fields.orgTelephone" align="center" />
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="{ row: { orgStatus } }">
          {{ orgStatus === 0 ? '待审核' : orgStatus === 1 ? '通过' : '不通过' }}
        </template>
      </el-table-column>
      <el-table-column label="材料查看" align="center" width="150">
        <template slot-scope="{ row: { orgId } }">
          <el-button icon="el-icon-view" @click="goSee(orgId)">材料查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="120">
        <template slot-scope="{ row: { orgId, orgStatus } }">
          <el-button type="primary" :disabled="+orgStatus !== 0" icon="el-icon-bangzhu" @click="goApproval(orgId)">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.pageNum" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
    <!-- 弹窗 -->
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :before-close="dialogClose">
      <OExplain :approval-id="approvalId" @onApprovalSuccess="onApprovalSuccess" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { organizeApi } from '@/api/organize.js'
// components
import OExplain from './components/OExplain'
import Pagination from '@/components/Pagination'
// data
import { fields } from '@/views/organize/modules/fields.js'
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
import { serveUrl } from '@/settings'
export default {
  name: 'AuditOrganize',
  components: { Pagination, OExplain },
  mixins: [ListMixin, MethodsMixin],
  data() {
    return {
      fields,
      dialogVisible: false,
      approvalId: ''
    }
  },
  created() {},
  methods: {
    goApproval(approvalId) {
      this.dialogVisible = true
      this.approvalId = approvalId
    },
    onApprovalSuccess() {
      this.approvalId = ''
      this.dialogVisible = false
      this.startHandle()
    },
    dialogClose() {
      this.approvalId = ''
      this.dialogVisible = false
    },
    goSee(id) {
      this.routerGo('/organize/look/' + id)
    },
    startHandle() {
      organizeApi.list(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          const { records, total } = data
          this.tableData = records
          this.tableDataLength = total
        } else {
          this.$message.error(msg)
        }
      })
    },
    getFullUrl(url) {
      const arr = url ? url.split('/') : ['', '']
      const full = `${serveUrl}/file/org/${arr[arr.length - 2]}/${arr[arr.length - 1]}`
      return full
    }
  }
}
</script>
<style lang="scss" scoped></style>
