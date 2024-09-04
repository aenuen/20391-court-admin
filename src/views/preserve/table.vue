<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 申请法院 -->
      <el-input v-model="queryList.gCourt" :placeholder="fields.gCourt" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <!-- 保全类型 -->
      <el-select v-model="queryList.guaranteeCategory" :placeholder="fields.guaranteeCategory" class="filter-ele" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, index) in courtCategoryAry" :key="index" :value="item['dictValue']" :label="item['name']" />
      </el-select>
      <!-- 保全类型 -->
      <el-select v-model="queryList.outLawsuitTime" :placeholder="fields.outLawsuitTime" class="filter-ele" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, index) in outLawsuitTimeAry" :key="index" :value="item['dictValue']" :label="item['name']" />
      </el-select>
      <!-- 保全类型 -->
      <el-select v-model="queryList.gCaseType" :placeholder="fields.gCaseType" class="filter-ele" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, index) in caseTypeAry" :key="index" :value="item['dictValue']" :label="item['name']" />
      </el-select>
      <!-- 案号 -->
      <el-input v-model="queryList.gCaseNo" :placeholder="fields.gCaseNo" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <!-- 提交人身份 -->
      <el-select v-model="queryList.gIssueStatus" :placeholder="fields.gIssueStatus" class="filter-ele" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, index) in issueStatusAry" :key="index" :value="item['dictValue']" :label="item['name']" />
      </el-select>
      <!-- 搜索 -->
      <el-button class="filter-btn el-icon-search" @click="handleFilter"> 搜索 </el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="courtName" :label="fields.gCourt" align="center" />
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
      <el-table-column label="选取" align="center" width="95">
        <template slot-scope="{ row: { gId } }">
          <el-button size="mini" type="warning" icon="el-icon-check" @click="selected(gId)"> 选取 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.pageNum" :limit.sync="queryList.pageSize" :page-sizes="[5]" @pagination="refresh" />
    </div>
  </div>
</template>
<script>
// api
// components
import Pagination from '@/components/Pagination'
// data
import { DetailFields as fields } from '../guarantee/modules/fields'
// filter
// function
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import GainDict from '@/components/Mixins/GainDict'
// plugins
// settings
export default {
  name: 'PreserveTable',
  components: { Pagination },
  filters: {
    filterGCaseNo(str) {
      return (str || '').replace(/\|/g, '')
    }
  },
  mixins: [MethodsMixin, GainDict],
  props: {
    tableData: { type: Array, default: () => [] },
    tableDataLength: { type: Number, default: 0 }
  },
  data() {
    return {
      fields,
      queryList: {}
    }
  },
  created() {
    this.startHandle()
  },
  methods: {
    // 预处理
    startHandle() {
      this.gainDict_courtCategoryAry() // 保全类别
      this.gainDict_outLawsuitTimeAry() // 非诉期间
      this.gainDict_caseTypeAry() // 案件类型
      this.gainDict_issueStatusAry() // 提交人类型
    },
    handleFilter() {
      this.$emit('handleFilter', this.queryList)
    },
    refresh() {
      this.$emit('refresh', this.queryList)
    },
    selected(gId) {
      this.$emit('selected', gId)
    }
  }
}
</script>
<style lang="scss" scoped></style>
