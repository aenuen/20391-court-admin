<template>
  <div class="app-container">
    <!-- 过滤 -->
    <div class="filter-container">
      <!-- 搜索 -->
      <el-button class="filter-btn el-icon-search" @click="handleFilter"> 搜索 </el-button>
      <!-- 新增按纽 -->
      <el-button type="success" class="filter-btn el-icon-plus" @click="toCreate">新增</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="orgName" :label="fields.orgId" width="220" align="center" />
      <el-table-column prop="courtName" :label="fields.courtId" width="220" align="center" />
      <el-table-column prop="expenseType" :label="fields.expenseType" align="center" />
      <!-- 111 -->
      <el-table-column prop="expenseLow" :label="fields.expenseLow" align="center">
        <template slot-scope="{ row: { expenseLow } }">
          <span>{{ expenseLow ? expenseLow + '%' : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="costLow" :label="fields.costLow" align="center">
        <template slot-scope="{ row: { expenseType, costLow } }">
          <span>{{ expenseType === '阶梯费率' ? (costLow ? costLow + '元' : '--') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expenseHigh" :label="fields.expenseHigh" align="center">
        <template slot-scope="{ row: { expenseHigh } }">
          <span>{{ expenseHigh ? expenseHigh + '%' : '--' }}</span>
        </template>
      </el-table-column>
      <!-- 112 -->
      <el-table-column prop="chargeLow" :label="fields.chargeLow" align="center">
        <template slot-scope="{ row: { chargeLow } }">
          <span>{{ chargeLow ? chargeLow + '元' : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="costLow" :label="fields.costLow" align="center">
        <template slot-scope="{ row: { expenseType, costLow } }">
          <span>{{ expenseType === '固定费率' ? (costLow ? costLow + '元' : '--') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="chargeHigh" :label="fields.chargeHigh" align="center">
        <template slot-scope="{ row: { chargeHigh } }">
          <span>{{ chargeHigh ? chargeHigh + '%' : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="95">
        <template slot-scope="{ row: { expenseId } }">
          <el-button size="mini" type="success" icon="el-icon-edit" @click="toUpdate(expenseId)"> 编辑 </el-button>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="95">
        <template slot-scope="{ row: { expenseId } }">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="onRemoveAlone(expenseId)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.pageNum" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
    <!-- 添加修改 -->
    <el-dialog v-if="detailShow" :visible.sync="detailShow" width="750px" :title="'汇率' + detailAction" :before-close="detailClose">
      <Detail :is-update="isUpdate" :update-number="updateNumber" @createSuccess="createSuccess" @updateSuccess="updateSuccess" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { exchangeApi } from '@/api'
// components
import Detail from './components/Detail'
import Pagination from '@/components/Pagination'
// data
import { fields } from './modules/fields.js'
// filter
// function
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
// settings
export default {
  name: 'ExchangeList',
  components: { Detail, Pagination },
  mixins: [MethodsMixin, ListMixin],
  data() {
    return {
      detailShow: false,
      detailAction: '',
      fields,
      updateNumber: 0,
      isUpdate: false
    }
  },
  created() {},
  methods: {
    toCreate() {
      this.detailShow = true
      this.detailAction = '新增'
    },
    toUpdate(id) {
      this.detailShow = true
      this.isUpdate = true
      this.updateNumber = id
      this.detailAction = '编辑'
    },
    detailClose() {
      this.detailShow = false
    },
    updateSuccess() {
      this.detailShow = false
      this.isUpdate = false
      this.updateNumber = ''
      this.detailAction = ''
      this.gainExchangeList()
    },
    createSuccess() {
      this.detailShow = false
      this.detailAction = ''
      this.gainExchangeList()
    },
    startHandle() {
      this.gainExchangeList()
    },
    removeAlone() {
      exchangeApi.remove(this.removeId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.gainExchangeList()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 获取费率列表
    gainExchangeList() {
      exchangeApi.list(this.queryList).then(({ code, data, msg }) => {
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
