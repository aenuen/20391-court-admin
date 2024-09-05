<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div class="filter-container">
      <!-- 申请法院 -->
      <el-select v-model="queryList.cCourt" :placeholder="fields.cCourt" class="filter-ele" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, key) in courtAry" :key="key" :value="item.courtId" :label="item.courtName" />
      </el-select>
      <!-- 保全类别 -->
      <el-select v-model="queryList.courtCategory" :placeholder="fields.courtCategory" class="filter-ele" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, index) in courtCategoryAry" :key="index" :disabled="+item.dictValue === 3" :value="item['dictValue']" :label="item['name']" />
      </el-select>
      <!-- 案件 -->
      <el-select v-model="queryList.cCaseType" :placeholder="fields.cCaseType" class="filter-ele" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, index) in caseTypeAry" :key="index" :value="item['dictValue']" :label="item['name']" />
      </el-select>
      <!-- 案号 -->
      <el-input v-model="queryList.cCaseNo" :placeholder="fields.cCaseNo" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <!-- 担保情况 -->
      <el-select v-model="queryList.guaranteeCase" :placeholder="fields.guaranteeCase" class="filter-ele" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, index) in ensureAry" :key="index" :value="item['dictValue']" :label="item['name']" />
      </el-select>
      <!-- 提交人身份 -->
      <el-select v-model="queryList.cIssueStatus" :placeholder="fields.cIssueStatus" class="filter-ele" clearable @clear="handleFilter" @change="handleFilter">
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
      <el-table-column prop="userName" :label="fields.userName" align="center" />
      <el-table-column label="支付凭证" align="center" width="120">
        <template slot-scope="{ row: { payImage } }">
          <el-image v-if="payImage" :src="getPayFullUrl(payImage)" style="width: 36px; height: 36px; cursor: pointer" fit="cover" @click="seeImage(getPayFullUrl(payImage))" />
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column label="电子保函" align="center" width="120">
        <template slot-scope="{ row: { gFileUrl, status } }">
          <a v-if="gFileUrl && status === 1" style="color: #1890ff" @click="download(gFileUrl)">下载</a>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column label="发票" align="center" width="120">
        <template slot-scope="{ row: { gFileUrl, status } }">
          <a v-if="billUrl && status === 1" style="color: #1890ff" @click="download(billUrl)">下载</a>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="100">
        <template slot-scope="{ row: { step, cId, status, guaranteeCase } }">
          <el-button v-if="status || +status === 0" size="mini" type="success" icon="el-icon-view" @click="toPages(cId, status)"> 查看 </el-button>
          <el-button v-else size="mini" type="primary" icon="el-icon-edit" @click="toUpdate(cId, step, guaranteeCase)"> 编辑 </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center" width="100">
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
import { courtApi } from '@/api/court'
import { preserveApi } from '@/api/preserve.js'
import { guaranteeApi } from '@/api/guarantee'
// components
import Pagination from '@/components/Pagination'
// data
import { DetailFields as fields } from './modules/fields'
// filter
import { emptyValueFilter } from '@/libs/filter'
// function
import { toPages, toUpdate } from './modules/tPage.js'
import { downloadSave } from '../guarantee/modules/utils'
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import ListMixin from '@/components/Mixins/ListMixin'
import GainDict from '@/components/Mixins/GainDict'
// plugins
// settings
import { serveUrl } from '@/settings'
export default {
  name: 'PreserveList',
  components: { Pagination },
  filters: {
    emptyValueFilter,
    caseNoFilter(val) {
      return val ? val.replace(/\|/g, '') : '--'
    }
  },
  mixins: [MethodsMixin, ListMixin, GainDict],
  data() {
    return {
      fields,
      courtAry: [],
      ensureAry: [
        { name: '有担保', dictValue: '1' },
        { name: '无需担保', dictValue: '2' }
      ]
    }
  },
  async created() {
    // this.gainDict_courtTypeAry() // 保全类型
    this.gainDict_courtCategoryAry() // 保全类别
    this.gainDict_issueStatusAry() // 提交人
    this.gainDict_caseTypeAry() // 案件类型
    await this.gainList() // 法院
  },
  methods: {
    startHandle() {
      this.gainList()
      this.gainCourtList()
    },
    // 获取网址
    getPayFullUrl(url) {
      const arr = url.split('/')
      return `${serveUrl}/file/pay/${arr[arr.length - 2]}/${arr[arr.length - 1]}`
    },
    // 下载
    download(url) {
      guaranteeApi.download({ path: url }).then((data) => {
        downloadSave('电子保函' + Date.now(), 'pdf', data)
        this.$message.success('下载成功')
      })
    },
    getEnsureName(val) {
      let name = ''
      this.ensureAry.forEach((item) => {
        if (+item.dictValue === +val) {
          name = item.name
        }
      })
      return name
    },
    gainList() {
      courtApi.all().then(({ code, data, msg }) => {
        if (code === 200) {
          this.courtAry = data
        } else {
          this.$message.error(msg)
        }
      })
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
    toPages(cId, status) {
      const path = toPages(cId, status)
      this.routerGo(path)
    },
    toUpdate(cId, step, guaranteeCase) {
      if (+guaranteeCase === 2 && +step === 1) {
        this.routerGo('/preserve/select/' + cId)
      } else {
        const path = toUpdate(cId, step)
        this.routerGo(path)
      }
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
