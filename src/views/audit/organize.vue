<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="name" :label="fields.name" align="center" />
      <el-table-column prop="orgCode" :label="fields.orgCode" align="center" />
      <el-table-column prop="orgEmail" :label="fields.orgEmail" align="center" />
      <el-table-column prop="orgTelephone" :label="fields.orgTelephone" align="center" />
      <el-table-column label="详情" align="center" width="120">
        <template slot-scope="{ row: { orgId } }">
          <el-button type="primary" icon="el-icon-view" @click="goSee(orgId)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="120">
        <template slot-scope="{ row: { orgId } }">
          <el-button type="success" icon="el-icon-view" @click="goSee(orgId)">通过</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// api
import { organizeApi } from '@/api/organize.js'
// components
// data
import { fields } from '@/views/organize/modules/fields.js'
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
import { serveUrl } from '@/settings'
export default {
  name: 'AuditOrganize',
  components: {},
  mixins: [ListMixin, MethodsMixin],
  data() {
    return {
      fields
    }
  },
  created() {},
  methods: {
    goSee(id) {
      console.log('🚀 ~ goSee ~ id', id)
    },
    startHandle() {
      organizeApi.list(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          this.tableData = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    getFullUrl(url) {
      const arr = url ? url.split('/') : ['', '']
      const full = `${serveUrl}/file/org/${arr[arr.length - 2]}/${arr[arr.length - 1]}`
      return full
    }
  }
}
</script>
<style lang="scss" scoped></style>
