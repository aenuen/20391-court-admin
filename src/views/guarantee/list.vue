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
      <!-- 新增按纽 -->
      <el-button type="success" class="filter-btn el-icon-plus" @click="$router.push('create')"> 新增 </el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
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
      <el-table-column :label="fields.step" align="center">
        <template slot-scope="{ row: { status } }">
          <span v-if="status || +status === 0" class="bull-dot"><b class="dot-green"></b>{{ status | filterStatus }}</span>
          <span v-else class="bull-dot"> <b class="dot-red"></b>未提交 </span>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="95">
        <template slot-scope="{ row: { step, gId, status } }">
          <el-button v-if="status || +status === 0" size="mini" type="success" icon="el-icon-view" @click="toPages(gId, status)"> 查看 </el-button>
          <el-button v-else size="mini" type="primary" icon="el-icon-edit" @click="toUpdate(step, gId)"> 编辑 </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center" width="95">
        <template slot-scope="{ row: { gId, step } }">
          <el-button size="mini" type="warning" icon="el-icon-delete" :disabled="step === -1" @click="onRemoveAlone(gId)"> 删除 </el-button>
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
import { guaranteeApi } from '@/api/guarantee'
// components
import Pagination from '@/components/Pagination'
// data
import { DetailFields as fields } from './modules/fields'
// filter
// function
import { toUpdate, toPages } from './modules/tPage'
// mixins
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import GainDict from '@/components/Mixins/GainDict'
// plugins
// settings
export default {
  name: 'GuaranteeList',
  components: { Pagination },
  filters: {
    filterStatus(status) {
      if (+status === 0) {
        return '审核中'
      }
    },
    filterGCaseNo(str) {
      return (str || '').replace(/\|/g, '')
    }
  },
  mixins: [ListMixin, MethodsMixin, GainDict],
  data() {
    return {
      fields
    }
  },
  created() {},
  methods: {
    removeAlone() {
      guaranteeApi.remove(this.removeId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.getList()
        } else {
          this.message.error(msg)
        }
      })
      // 删除
    },
    toPages(gId, status) {
      const path = toPages(gId, status)
      this.routerClose(path)
    },
    toUpdate(step, gId) {
      const path = toUpdate(step, gId)
      this.routerClose(path)
    },
    startHandle() {
      this.gainDict_courtCategoryAry() // 保全类别
      this.gainDict_outLawsuitTimeAry() // 非诉期间
      this.gainDict_caseTypeAry() // 案件类型
      this.gainDict_issueStatusAry() // 提交人类型
      this.getList()
    },
    getList() {
      guaranteeApi.list(this.queryList).then(({ code, data, msg }) => {
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
<style lang="scss" scoped>
.bull-dot {
  position: relative;

  b {
    display: block;
    position: absolute;
    left: -13px;
    top: 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    &.dot-red {
      background: red;
    }
    &.dot-green {
      background: green;
    }
  }
}
</style>
