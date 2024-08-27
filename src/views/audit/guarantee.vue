<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column label="详情" align="center" width="120">
        <template slot-scope="{ row: { gId } }">
          <el-button type="success" icon="el-icon-view" @click="goSee(gId)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="gCourt" :label="fields.gCourt" align="center" />
      <el-table-column prop="guaranteeCategory" :label="fields.guaranteeCategory" align="center" />
      <el-table-column :label="fields.outLawsuitTime" align="center">
        <template slot-scope="{ row: { outLawsuitTime } }">
          <span>{{ outLawsuitTime || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="fields.gCaseType" align="center">
        <template slot-scope="{ row: { gCaseType } }">
          <span>{{ gCaseType || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="fields.gCaseNo" align="center" width="200">
        <template slot-scope="{ row: { gCaseNo } }">
          <span>{{ gCaseNo | filterGCaseNo }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gMoney" :label="fields.gMoney" align="center" />
      <el-table-column prop="guaranteeMoney" :label="fields.guaranteeMoney" align="center" />
      <el-table-column prop="gIssueStatus" :label="fields.gIssueStatus" align="center" />
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="{ row: { status } }">
          <span>{{ status | filterStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="120">
        <template slot-scope="{ row: { approveId, gId, status } }">
          <el-button type="primary" :disabled="!(+status === 0 || +status === 5)" icon="el-icon-bangzhu" @click="goApproval(approveId, gId)">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.pageNum" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
    <!-- 弹窗 -->
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :before-close="dialogClose">
      <GExplain :approval-id="approvalId" :g-id="gId" @onApprovalSuccess="onApprovalSuccess" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { approveApi } from '@/api/approve'
// components
import GExplain from './components/GExplain'
import Pagination from '@/components/Pagination'
// data
import { DetailFields as fields } from '../guarantee/modules/fields'
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'AuditGuarantee',
  components: { Pagination, GExplain },
  filters: {
    filterStatus(status) {
      if (+status === 0) {
        return '审核中'
      } else if (+status === 1) {
        return '通过'
      } else if (+status === 2) {
        return '不接单'
      } else if (+status === 3) {
        return '不通过'
      } else if (+status === 4) {
        return '待付款'
      } else if (+status === 5) {
        return '费用审批'
      }
    },
    filterGCaseNo(str) {
      return (str || '').replace(/\|/g, '')
    }
  },
  mixins: [ListMixin, MethodsMixin],
  data() {
    return {
      fields,
      dialogVisible: false,
      approvalId: '',
      gid: ''
    }
  },
  created() {},
  methods: {
    goSee(id) {
      this.routerGo('/guarantee/look/' + id)
    },
    goApproval(approvalId, gId) {
      this.dialogVisible = true
      this.approvalId = approvalId
      this.gId = gId
    },
    onApprovalSuccess() {
      this.approvalId = ''
      this.gId = ''
      this.dialogVisible = false
      this.startHandle()
    },
    dialogClose() {
      this.approvalId = ''
      this.gId = ''
      this.dialogVisible = false
    },
    startHandle() {
      approveApi.list(this.queryList).then(({ code, data, msg }) => {
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
