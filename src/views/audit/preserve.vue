<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column label="详情" align="center" width="120">
        <template slot-scope="{ row }">
          <el-button icon="el-icon-view" @click="goSee(row.cId)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="courtName" :label="fields.cCourt" align="center" />
      <el-table-column prop="courtCategory" :label="fields.courtCategory" align="center" />
      <el-table-column prop="cCaseType" :label="fields.cCaseType" align="center">
        <template slot-scope="{ row: { cCaseType } }">
          <span>{{ cCaseType | emptyValueFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cCaseNo" :label="fields.cCaseNo" align="center">
        <template slot-scope="{ row: { cCaseNo } }">
          <span>{{ cCaseNo | caseNoFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cMoney" :label="fields.cMoney" align="center" />
      <el-table-column prop="guaranteeCase" :label="fields.guaranteeCase" align="center">
        <template slot-scope="{ row: { guaranteeCase } }">
          <span>{{ getEnsureName(guaranteeCase) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cIssueStatus" :label="fields.cIssueStatus" align="center" />
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="{ row: { status } }">
          <span>{{ status | filterStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="120">
        <template slot-scope="{ row }">
          <el-alert v-if="+row.status === 1" type="success" center show-icon :closable="false">完成</el-alert>
          <el-button v-else :disabled="+row.status === 3" type="primary" icon="el-icon-bangzhu" @click="goApproval(row.approveId, row.cId)">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.pageNum" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
    <!-- 审批 -->
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" title="审批" :before-close="dialogClose">
      <PExplain :approval-id="approvalId" :c-id="cId" @onApprovalSuccess="onApprovalSuccess" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { preserveApi } from '@/api/preserve.js'
// components
import Pagination from '@/components/Pagination'
import PExplain from './components/PExplain'
// data
import { DetailFields as fields } from '@/views/preserve/modules/fields.js'
// filter
import { emptyValueFilter } from '@/libs/filter'
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'AuditCourt',
  components: { Pagination, PExplain },
  filters: {
    filterStatus(status) {
      if (+status === 0) {
        return '审核中'
      } else if (+status === 1) {
        return '通过'
      } else if (+status === 3) {
        return '不通过'
      }
    },
    emptyValueFilter,
    caseNoFilter(val) {
      return val ? val.replace(/\|/g, '') : '--'
    }
  },
  mixins: [ListMixin, MethodsMixin],
  data() {
    return {
      fields,
      dialogVisible: false,
      approvalId: '',
      cId: ''
    }
  },
  created() {},
  methods: {
    startHandle() {
      preserveApi.approveList(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          const { records, total } = data
          this.tableData = records
          this.tableDataLength = total
        } else {
          this.$message.error(msg)
        }
      })
    },
    goApproval(approvalId, cId) {
      this.dialogVisible = true
      this.approvalId = approvalId
      this.cId = cId
    },
    dialogClose() {
      this.dialogVisible = false
      this.approvalId = ''
      this.cId = ''
    },
    onApprovalSuccess() {
      this.dialogVisible = false
      this.approvalId = ''
      this.cId = ''
      this.startHandle()
    },
    getEnsureName(val) {
      const data = [
        { name: '有担保', dictValue: '1' },
        { name: '无需担保', dictValue: '2' }
      ]
      let name = ''
      data.forEach((item) => {
        if (+item.dictValue === +val) {
          name = item.name
        }
      })
      return name
    },
    goSee(id) {
      this.routerGo('/preserve/look/' + id)
    }
  }
}
</script>
<style lang="scss" scoped></style>
