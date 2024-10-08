<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column label="详情" align="center" width="120">
        <template slot-scope="{ row: { gId } }">
          <el-button icon="el-icon-view" @click="goSee(gId)">详情</el-button>
        </template>
      </el-table-column>
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
        <template slot-scope="{ row: { billUrl, status } }">
          <a v-if="billUrl && status === 1" style="color: #1890ff" @click="download(billUrl)">下载</a>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="{ row: { status } }">
          <span>{{ status | filterStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="120">
        <template slot-scope="{ row: { approveId, gId, status, gFileUrl, warrantyNumber } }">
          <el-alert v-if="+status === 1" type="success" center :closable="false">完成</el-alert>
          <el-button v-else-if="+status !== 6" type="primary" :disabled="!(+status === 0 || +status === 5 || +status === 6)" icon="el-icon-bangzhu" @click="goApproval(approveId, status, gId)">审批</el-button>
          <el-button v-else type="success" icon="el-icon-reading" @click="goSweat(gId, gFileUrl, warrantyNumber, approveId)">出函</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.pageNum" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
    <!-- 弹窗 -->
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" title="审批" :before-close="dialogClose">
      <GExplain :approval-id="approvalId" :the-status="theStatus" :g-id="gid" @onApprovalSuccess="onApprovalSuccess" />
    </el-dialog>
    <!-- 出函 -->
    <el-dialog v-if="sweatController" :visible.sync="sweatController" width="800px" title="出函" :before-close="sweatClose">
      <GSweat :g-id="gid" :warranty-number="warranty" :g-file-url="fileUrl" :approve-id="appId" @onSweatSuccess="onSweatSuccess" />
    </el-dialog>
    <!-- 支付 -->
    <el-dialog v-if="seeController" :visible.sync="seeController" title="支付凭证" :before-close="seeClose">
      <el-image :src="sweatImg" style="width: 100%; height: 100%" fit="contain" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { approveApi } from '@/api/approve'
import { guaranteeApi } from '@/api/guarantee'
// components
import GExplain from './components/GExplain'
import Pagination from '@/components/Pagination'
import GSweat from './components/GSweat'
// data
import { DetailFields as fields } from '../guarantee/modules/fields'
// filter
// function
import { downloadSave } from '../guarantee/modules/utils'
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import FileType from '@/components/Mixins/FileType'
// plugins
// settings
import { serveUrl } from '@/settings'

export default {
  name: 'AuditGuarantee',
  components: { Pagination, GExplain, GSweat },
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
      return str ? str.replace(/\|/g, '') : '--'
    }
  },
  mixins: [ListMixin, MethodsMixin, FileType],
  data() {
    return {
      fields,
      dialogVisible: false,
      payController: false,
      sweatController: false,
      seeController: false,
      sweatImg: '',
      approvalId: '',
      theStatus: -1,
      gid: '',
      warranty: '',
      fileUrl: '',
      appId: ''
    }
  },
  created() {},
  methods: {
    // 获取网址
    getPayFullUrl(url) {
      const arr = url.split('/')
      return `${serveUrl}/file/pay/${arr[arr.length - 2]}/${arr[arr.length - 1]}`
    },
    goSee(id) {
      this.routerGo('/audit/g-look/' + id)
    },
    goApproval(approvalId, status, gId) {
      this.dialogVisible = true
      this.approvalId = approvalId
      this.theStatus = status
      this.gid = gId
    },
    goSweat(gId, gFileUrl, warrantyNumber, approveId) {
      this.sweatController = true
      this.gid = gId
      this.fileUrl = gFileUrl
      this.warranty = warrantyNumber
      this.appId = approveId
    },
    sweatClose() {
      this.sweatController = false
      this.gid = ''
    },
    onSweatSuccess() {
      this.gid = ''
      this.sweatController = false
      this.startHandle()
    },
    onApprovalSuccess() {
      this.approvalId = ''
      this.gid = ''
      this.theStatus = -1
      this.dialogVisible = false
      this.startHandle()
    },
    dialogClose() {
      this.approvalId = ''
      this.gid = ''
      this.theStatus = -1
      this.dialogVisible = false
    },
    startHandle() {
      approveApi.list(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          const { records, total } = data
          this.tableData = records
          this.tableDataLength = total
        } else {
          this.$message.error(msg)
        }
      })
    },
    seeImage(url) {
      this.seeController = true
      this.sweatImg = url
    },
    seeClose() {
      this.seeController = false
      this.sweatImg = ''
    },
    // 下载
    download(url) {
      guaranteeApi.download({ path: url }).then((data) => {
        downloadSave('电子保函' + Date.now(), 'pdf', data)
        this.$message.success('下载成功')
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
