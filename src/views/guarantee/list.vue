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
      <el-table-column :label="fields.step" align="center">
        <template slot-scope="{ row: { status, description } }">
          <div :title="statusHandle(status, description) ? '点击查看详情' : ''" :style="{ cursor: statusHandle(status, description) ? 'pointer' : 'default' }" @click="explain(status, description)">
            <span v-if="status || +status === 0" class="bull-dot">
              <b v-if="+status === 0 || +status === 4 || +status === 5" class="dot-blue" />
              <b v-else-if="+status === 2 || +status === 3" class="dot-red" />
              <b v-else-if="+status === 1 || +status === 6" class="dot-green" />
              {{ status | filterStatus }}
              <i v-if="statusHandle(status, description)" class="el-icon-warning" />
            </span>
            <span v-else class="bull-dot"> <b class="dot-gray"></b>未提交 </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="userName" :label="fields.userName" align="center" />
      <el-table-column label="编辑" align="center" width="100">
        <template slot-scope="{ row: { step, gId, status } }">
          <el-button v-if="status || +status === 0" size="mini" type="success" icon="el-icon-view" @click="toPages(gId, status)"> 查看 </el-button>
          <el-button v-else size="mini" type="primary" icon="el-icon-edit" @click="toUpdate(step, gId)"> 编辑 </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center" width="100">
        <template slot-scope="{ row: { gId, step } }">
          <el-button size="mini" type="warning" icon="el-icon-delete" :disabled="step === -1" @click="onRemoveAlone(gId)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.pageNum" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
    <el-dialog v-if="seeController" :visible.sync="seeController" title="支付凭证" :before-close="seeClose">
      <el-image :src="sweatImg" style="width: 100%; height: 100%" fit="contain" />
    </el-dialog>
    <!-- 弹窗 -->
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" title="原因详情" :before-close="dialogClose">
      <table>
        <tr>
          <th>审核结果</th>
          <td>{{ +expStatus === 3 || +expStatus === 4 ? '不通过' : '不接单' }}</td>
        </tr>
        <tr>
          <th>原因说明</th>
          <td>{{ expDesc }}</td>
        </tr>
        <tr>
          <th></th>
          <td>(请根据原因进行调整后再次提交)</td>
        </tr>
      </table>
    </el-dialog>
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
import { downloadSave } from './modules/utils'
// mixins
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import GainDict from '@/components/Mixins/GainDict'
// plugins
// settings
import { serveUrl } from '@/settings'
export default {
  name: 'GuaranteeList',
  components: { Pagination },
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
      } else if (+status === 6) {
        return '待出函'
      }
    },
    filterGCaseNo(str) {
      return (str || '').replace(/\|/g, '')
    }
  },
  mixins: [ListMixin, MethodsMixin, GainDict],
  data() {
    return {
      pdf: require(`@/assets/image/fileType/PDF.png`),
      seeController: false,
      sweatImg: '',
      fields,
      dialogVisible: false,
      expStatus: '-1',
      expDesc: ''
    }
  },
  created() {},
  methods: {
    // 获取网址
    getPayFullUrl(url) {
      const arr = url.split('/')
      return `${serveUrl}/file/pay/${arr[arr.length - 2]}/${arr[arr.length - 1]}`
    },
    statusHandle(status, description) {
      return +status === 2 || +status === 3 || (+status === 4 && description)
    },
    // 详情
    explain(status, description) {
      if (this.statusHandle(status, description)) {
        this.dialogVisible = true
        this.expStatus = status
        this.expDesc = description
      }
    },
    dialogClose() {
      this.dialogVisible = false
      this.expStatus = '-1'
      this.expDesc = ''
    },
    // 删除
    removeAlone() {
      guaranteeApi.remove(this.removeId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.getList()
        } else {
          this.message.error(msg)
        }
      })
    },
    toPages(gId, status) {
      const path = toPages(gId, status)
      this.routerGo(path)
    },
    // 编辑
    toUpdate(step, gId) {
      const path = toUpdate(step, gId)
      this.routerGo(path)
    },
    // 预处理
    startHandle() {
      this.gainDict_courtCategoryAry() // 保全类别
      this.gainDict_outLawsuitTimeAry() // 非诉期间
      this.gainDict_caseTypeAry() // 案件类型
      this.gainDict_issueStatusAry() // 提交人类型
      this.getList()
    },
    seeImage(url) {
      this.seeController = true
      this.sweatImg = url
    },
    // 下载
    download(url) {
      guaranteeApi.download({ path: url }).then((data) => {
        downloadSave('电子保函' + Date.now(), 'pdf', data)
        this.$message.success('下载成功')
      })
    },
    // 获取列表
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
table,
th,
td {
  border: 1px solid #eee;
  border-collapse: collapse;
}
table {
  width: 100%;
  th,
  td {
    padding: 5px 15px;
    line-height: 30px;
  }
  th {
    width: 150px;
    text-align: right;
    font-weight: bold;
  }
}

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
    &.dot-blue {
      background: blue;
    }
    &.dot-gray {
      background: gray;
    }
  }
}
</style>
