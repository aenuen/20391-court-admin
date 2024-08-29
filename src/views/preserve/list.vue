<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
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
      <el-table-column prop="guaranteeCase" :label="fields.guaranteeCase" align="center" />
      <el-table-column prop="cIssueStatus" :label="fields.cIssueStatus" align="center" />
      <el-table-column label="编辑" align="center" width="95">
        <template slot-scope="{ row: { step, cId, Cstatus, guaranteeCase } }">
          <el-button size="mini" type="success" icon="el-icon-view" @click="toPages(step, cId, Cstatus, guaranteeCase)"> 查看 </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center" width="95">
        <template slot-scope="{ row: { cId } }">
          <el-button size="mini" type="warning" icon="el-icon-delete" @click="onRemoveAlone(cId)"> 删除 </el-button>
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
import { preserveApi } from '@/api/preserve.js'
// components
import Pagination from '@/components/Pagination'
// data
import { DetailFields as fields } from './modules/fields'
// filter
import { emptyValueFilter } from '@/libs/filter'
// function
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
// settings
export default {
  name: 'PreserveList',
  components: { Pagination },
  filters: {
    emptyValueFilter,
    caseNoFilter(val) {
      return val ? val.replace(/\|/g, '') : '--'
    }
  },
  mixins: [MethodsMixin, ListMixin],
  data() {
    return {
      fields
    }
  },
  created() {},
  methods: {
    startHandle() {
      this.gainCourtList()
    },
    gainCourtList() {
      preserveApi.list(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          const { records, total } = data
          this.tableData = records
          this.tableDataLength = total
        } else {
          this.$message.error(msg)
        }
      })
    },
    toPages(step, cId, Cstatus, guaranteeCase) {
      this.routerGo('/preserve/details/' + cId)
    },
    removeAlone(cId) {
      preserveApi.remove(this.removeId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.gainCourtList()
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
