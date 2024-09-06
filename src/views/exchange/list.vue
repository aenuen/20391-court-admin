<template>
  <div class="app-container">
    <!-- 过滤 -->
    <div class="filter-container">
      <!-- 机构 -->
      <el-cascader v-model="queryList.orgId" :placeholder="fields.orgId" :options="organizeAry" class="filter-ele" filterable clearable @clear="handleFilter" @change="handleFilter" />
      <!-- 银行 -->
      <el-select v-model="queryList.courtId" :placeholder="fields.courtId" class="filter-ele" filterable clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, key) in courtAry" :key="key" :value="String(item.courtId)" :label="item.courtName" />
      </el-select>
      <!-- 搜索 -->
      <el-button class="filter-btn el-icon-search" @click="handleFilter"> 搜索 </el-button>
      <!-- 新增按纽 -->
      <el-button type="success" class="filter-btn el-icon-plus" @click="toCreate">新增</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="orgName" :label="fields.orgId" width="200" align="center" />
      <el-table-column prop="courtName" :label="fields.courtId" width="200" align="center" />
      <el-table-column label="费率规则" align="center">
        <template slot-scope="{ row: { rules } }">
          <ul v-for="(item, index) in JSON.parse(rules)" :key="index" class="lineList">
            <li>
              <b>{{ fields.type }}</b>
              ：{{ item.type | typeFilter }}
            </li>
            <li>
              <b>{{ fields.greater }}</b>
              ：{{ item.greater ? item.greater + '元' : '--' }}
            </li>
            <li>
              <b>{{ fields.less }}</b>
              ：{{ item.less ? item.less + '元' : '--' }}
            </li>
            <li class="percent">
              <b>{{ fields.percent }}</b>
              ：{{ item.percent | percentFilter }}
            </li>
            <li>
              <b>{{ fields.cost }}</b>
              ：{{ item.cost | costFilter(item.percent) }}
            </li>
          </ul>
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
    <el-dialog v-if="detailShow" :visible.sync="detailShow" width="1200px" :title="'费率' + detailAction" :before-close="detailClose">
      <Detail v-if="detailShow" :is-update="isUpdate" :update-number="updateNumber" @createSuccess="createSuccess" @updateSuccess="updateSuccess" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { exchangeApi } from '@/api'
import { selectApi } from '@/api/select.js'
import { courtApi } from '@/api/court.js'
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
  filters: {
    typeFilter(num) {
      return +num === 1 ? '区间' : +num === 2 ? '大于等于' : '小于'
    },
    percentFilter(boolean) {
      return boolean ? '百分比' : '固定金额'
    },
    costFilter(num, p) {
      return p ? num + '%' : num + '元'
    }
  },
  mixins: [MethodsMixin, ListMixin],
  data() {
    return {
      detailShow: false,
      detailAction: '',
      fields,
      updateNumber: 0,
      isUpdate: false,
      organizeAry: [],
      courtAry: []
    }
  },
  created() {
    this.gainOrganizeList() // 机构列表
    this.gainCourtList() // 法院列表
  },
  methods: {
    handleFilter() {
      this.queryList.pageNum = 1
      this.refresh()
    },
    // 刷新
    refresh() {
      if (this.queryList.orgId) {
        this.queryList.orgId = this.queryList.orgId[1]
      }
      this.$router.push({ path: this.$route.path, query: this.queryList })
    },
    // 机构列表
    gainOrganizeList() {
      selectApi.list().then(({ code, data, msg }) => {
        if (code === 200) {
          const bank = data.bank || []
          bank.forEach((item) => {
            item.value = item.orgId
            item.label = item.name
          })
          const dbjg = data.dbjg || []
          dbjg.forEach((item) => {
            item.value = item.orgId
            item.label = item.name
          })
          const bx = data.bx || []
          bx.forEach((item) => {
            item.value = item.orgId
            item.label = item.name
          })
          if (bank.length > 0) {
            this.organizeAry.push({ value: 'bank', label: '银行', children: bank })
          }
          if (dbjg.length > 0) {
            this.organizeAry.push({ value: 'dbjg', label: '担保机构', children: dbjg })
          }
          if (bx.length > 0) {
            this.organizeAry.push({ value: 'bx', label: '保险', children: bx })
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 法院列表
    gainCourtList() {
      courtApi.all().then(({ code, data, msg }) => {
        if (code === 200) {
          this.courtAry = data
        } else {
          this.$message.error(msg)
        }
      })
    },
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
<style lang="scss" scoped>
.lineList,
.lineList li {
  list-style: none;
  text-align: left;
  margin: 0;
  padding: 0;
}
.lineList {
  display: flex;
  width: 800px;
}
.lineList li {
  width: 140px;
  margin-right: 10px;
  line-height: 36px;
}
.lineList li.percent {
  width: 160px;
}
</style>
