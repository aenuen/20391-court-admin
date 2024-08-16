<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="queryList.court" :placeholder="fields.court" class="filter-item" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @select="handleFilter" />
    </div>
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="80" align="center" />
      <el-table-column prop="gCourt" :label="fields.court" align="center" />
      <el-table-column prop="guaranteeCategory" :label="fields.category" align="center" />
      <el-table-column prop="outLawsuitTime" :label="fields.period" align="center" />
      <el-table-column prop="gCaseType" :label="fields.caseType" align="center" />
      <el-table-column prop="gCaseNo" :label="fields.caseNumber" align="center" />
      <el-table-column prop="gMoney" :label="fields.preserve" align="center" />
      <el-table-column prop="guaranteeMoney" :label="fields.assurance" align="center" />
      <el-table-column prop="gIssueStatus" :label="fields.submitter" align="center" />
    </el-table>
  </div>
</template>
<script>
// api
import { guaranteeApi } from '@/api/guarantee'
// components
// data
import { DetailFields as fields } from './modules/fields'
// filter
// function
// mixins
import ListMixin from '@/components/Mixins/ListMixin'
import caseTypeAry from './mixins/caseTypeAry'
import courtCategoryAry from './mixins/courtCategoryAry'
import outLawsuitTimeAry from './mixins/outLawsuitTimeAry'
import issueStatusAry from './mixins/issueStatusAry'
// plugins
// settings
export default {
  name: 'GuaranteeList',
  components: {},
  mixins: [ListMixin, caseTypeAry, courtCategoryAry, outLawsuitTimeAry, issueStatusAry],
  data() {
    return {
      fields
    }
  },
  created() {},
  methods: {
    startHandle() {
      this.$nextTick(() => {
        guaranteeApi.list(this.queryList).then(({ code, data, msg }) => {
          if (code === 200) {
            const { records, total } = data
            console.log(total)
            this.tableData = records
          } else {
            this.$message.error(msg)
          }
        })
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped></style>
