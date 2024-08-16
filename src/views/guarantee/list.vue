<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 申请法院 -->
      <el-input v-model="queryList.gCourt" :placeholder="fields.gCourt" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <!-- 保全类型 -->
      <el-select v-model="queryList.category" :placeholder="fields.category" class="filter-ele" clearable @clear="handleFilter" @change="handleFilter">
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
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="gCourt" :label="fields.court" align="center" />
      <el-table-column prop="guaranteeCategory" :label="fields.category" align="center" />
      <el-table-column :label="fields.period" align="center">
        <template slot-scope="{ row: { outLawsuitTime } }">
          <span>{{ outLawsuitTime || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="fields.caseType" align="center">
        <template slot-scope="{ row: { gCaseType } }">
          <span>{{ gCaseType || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="fields.caseNumber" align="center">
        <template slot-scope="{ row: { gCaseNo } }">
          <span>{{ gCaseNo || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gMoney" :label="fields.preserve" align="center" />
      <el-table-column prop="guaranteeMoney" :label="fields.assurance" align="center" />
      <el-table-column prop="gIssueStatus" :label="fields.submitter" align="center" />
      <el-table-column :label="fields.step" align="center">
        <template slot-scope="{ row: { step } }">
          <span v-if="step === '-1'" class="bull-dot"> <b class="dot-green"></b>完成 </span>
          <span v-else class="bull-dot"> <b class="dot-red"></b>未完成 </span>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="95">
        <template slot-scope="{ row: { gId } }">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="routerGo(`/guarantee/details/${gId}`)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center" width="95">
        <el-button size="mini" type="warning" icon="el-icon-delete">删除</el-button>
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
// import { guaranteeApi } from '@/api/guarantee'
import axios from '@/libs/axios/courtReq'
// components
import Pagination from '@/components/Pagination'
// data
import { DetailFields as fields } from './modules/fields'
// filter
// function
// mixins
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import gainDict from './mixins/gainDict'
// plugins
// settings
export default {
  name: 'GuaranteeList',
  components: { Pagination },
  mixins: [ListMixin, MethodsMixin, gainDict],
  data() {
    return {
      fields
    }
  },
  created() {},
  methods: {
    startHandle() {
      this.gainDict_courtCategoryAry()
      this.gainDict_outLawsuitTimeAry()
      this.gainDict_caseTypeAry()
      this.gainDict_issueStatusAry()
      axios
        .post('/guarantee/selectByPage', null, {
          params: this.queryList
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
      // axios
      //   .post('/guarantee/selectByPage', qs.stringify(this.queryList), {
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //     }
      //   })
      //   .then((response) => {
      //     console.log(response)
      //   })
      //   .catch((error) => {
      //     console.error(error)
      //   })
      // axios
      //   .post('/guarantee/selectByPage ', {
      //     params: this.queryList
      //   })
      //   .then(({ code, data, msg }) => {
      //     if (code === 200) {
      //       const { records, total } = data
      //       this.tableData = records
      //       this.tableDataLength = total
      //     } else {
      //       this.$message.error(msg)
      //     }
      //   })
      // guaranteeApi.list(this.queryList).then(({ code, data, msg }) => {
      //   if (code === 200) {
      //     const { records, total } = data
      //     this.tableData = records
      //     this.tableDataLength = total
      //   } else {
      //     this.$message.error(msg)
      //   }
      // })
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
