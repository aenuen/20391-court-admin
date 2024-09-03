<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column label="详情" align="center" width="120">
        <template slot-scope="{ row: { orgId } }">
          <el-button icon="el-icon-view" @click="goSee(orgId)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="fields.name" align="center" />
      <el-table-column prop="type" :label="fields.type" align="center" />
      <el-table-column prop="orgCode" :label="fields.orgCode" align="center" />
      <el-table-column prop="orgEmail" :label="fields.orgEmail" align="center" />
      <el-table-column prop="orgTelephone" :label="fields.orgTelephone" align="center" />
      <el-table-column label="排序" align="center" width="95">
        <template slot-scope="{ row: { weight } }">
          <span>{{ weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改" align="center" width="95">
        <template slot-scope="{ row: { orgId, weight, type } }">
          <el-button size="mini" @click="handleWeight(orgId, weight, type)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column label="可见" align="center" width="95">
        <template #default="scope">
          <el-switch v-model="scope.row.isShow" :active-value="true" :inactive-value="false" @change="isShowChange(scope.row.orgId, scope.row.isShow)" />
        </template>
      </el-table-column>
      <el-table-column label="认证" align="center" width="95">
        <template #default="scope">
          <el-switch v-model="scope.row.orgStatus" :active-value="1" :inactive-value="0" @change="statusChange(scope.row.orgId, scope.row.orgStatus)" />
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="{ row: { orgStatus } }">
          <span>{{ orgStatus === 1 ? '已认证' : '未认证' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.pageNum" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
    <!-- 权重弹窗 -->
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" title="修改排序" :before-close="dialogClose">
      <weight :org-id="theOrgId" :weight="theWeight" :org-type="theType" @weightSuccess="weightSuccess" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { organizeApi } from '@/api/organize.js'
// components
import Pagination from '@/components/Pagination'
import weight from './components/weight'
// data
import { fields } from '@/views/organize/modules/fields'
// filter
// function
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
// settings
export default {
  name: 'OrganizeList',
  components: { Pagination, weight },
  mixins: [MethodsMixin, ListMixin],
  data() {
    return {
      fields,
      dialogVisible: false,
      theOrgId: '',
      theWeight: 0,
      theType: ''
    }
  },
  created() {},
  methods: {
    startHandle() {
      this.gainOrganizeList()
    },
    // 显示修改权重弹窗
    handleWeight(orgId, weight, type) {
      this.theOrgId = orgId
      this.theWeight = weight
      this.theType = type
      this.dialogVisible = true
    },
    // 关闭修改权重弹窗
    dialogClose() {
      this.theOrgId = ''
      this.theWeight = ''
      this.dialogVisible = false
    },
    // 修改权重成功
    weightSuccess() {
      this.theOrgId = ''
      this.theWeight = ''
      this.dialogVisible = false
      this.gainOrganizeList()
    },
    // 可见切换
    isShowChange(orgId, isShow) {
      organizeApi.set({ orgId, isShow: +isShow === 1 }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.gainOrganizeList()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 状态切换
    statusChange(orgId, status) {
      organizeApi.Update({ orgId, status: +status === 1 }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.gainOrganizeList()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 机构列表
    gainOrganizeList() {
      organizeApi.list(this.queryList).then(({ code, data, msg }) => {
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
