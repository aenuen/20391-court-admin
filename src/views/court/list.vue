<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column label="详情" align="center" width="120">
        <template slot-scope="{ row: { courtId } }">
          <el-button icon="el-icon-view" @click="goSee(courtId)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="courtName" :label="fields.courtName" align="center" />
      <el-table-column prop="courtCode" :label="fields.courtCode" align="center" />
      <el-table-column prop="courtCharge" :label="fields.courtCharge" align="center" />
      <el-table-column prop="telephone" :label="fields.telephone" align="center" />
      <el-table-column :label="fields.courtAddress" align="center">
        <template slot-scope="{ row: { courtAddress } }">
          <span>{{ getCnName(courtAddress) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="{ row: { courtStatus } }">
          <span>{{ courtStatus | filterStatus }}</span>
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
import { courtApi } from '@/api/court.js'
// components
import Pagination from '@/components/Pagination'
// data
import { fields } from '@/views/court/modules/fields.js'
// filter
// function
import { getAreaName } from '@/libs/utils/area'
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { codeToText } from 'element-china-area-data'
// settings
export default {
  name: 'AuditCourt',
  components: { Pagination },
  filters: {
    filterStatus(status) {
      if (+status === 0) {
        return '审核中'
      } else if (+status === 1) {
        return '通过'
      } else if (+status === 3) {
        return '不通过'
      }
    }
  },
  mixins: [ListMixin, MethodsMixin],
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
      courtApi.list(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          const { records, total } = data
          this.tableData = records
          this.tableDataLength = total
        } else {
          this.$message.error(msg)
        }
      })
    },
    goSee(id) {
      this.routerGo('/court/look/' + id)
    },
    getCnName(code) {
      return getAreaName(codeToText, code.split(',')).replace(/\//g, '')
    }
  }
}
</script>
<style lang="scss" scoped></style>
