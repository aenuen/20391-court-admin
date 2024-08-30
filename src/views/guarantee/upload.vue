<template>
  <div class="app-container">
    <StepPre v-if="isPreserve" :step="1" />
    <Steps v-else :step="1" />
    <div class="details">
      <!-- 保全申请书 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">保全申请书（必填）</div>
          <a class="titleIcon" @click="getTemplate(1)"> <i class="el-icon-download" />下载模版 </a>
        </div>
        <div class="boxContent">
          <UploadMulti ref="uploadOne" :action="action" :accept="accept" :data="{ type: 1, gcId: updateId }" :file-list="fileListOne" :limit="1" @onUploadRemove="onUploadRemove" />
        </div>
      </div>
      <!-- 起诉状（非必填） -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">起诉状（非必填）</div>
          <a class="titleIcon" @click="getTemplate(2)"> <i class="el-icon-download" />下载模版 </a>
        </div>
        <div class="boxContent">
          <UploadMulti ref="uploadOne" :action="action" :accept="accept" :data="{ type: 2, gcId: updateId }" :file-list="fileListTwo" :limit="1" @onUploadRemove="onUploadRemove" />
        </div>
      </div>
      <!-- 立案受理通知书 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">立案受理通知书（非必填）</div>
        </div>
        <div class="boxContent">
          <UploadMulti ref="uploadOne" :action="action" :accept="accept" :data="{ type: 3, gcId: updateId }" :file-list="fileListThree" :limit="1" @onUploadRemove="onUploadRemove" />
        </div>
      </div>
      <!-- 身份证明材料 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">身份证明材料（必填）</div>
          <a class="titleIcon" @click="getTemplate(4)"> <i class="el-icon-download" />下载模版 </a>
        </div>
        <div class="boxContent">
          <div class="liTitle">申请人（必填）</div>
          <UploadMulti ref="uploadOne" :action="action" :accept="accept" :data="{ type: 4, gcId: updateId }" :file-list="fileListFour" :limit="limit" @onUploadRemove="onUploadRemove" />
          <div class="liTitle">被申请人（必填）</div>
          <UploadMulti ref="uploadOne" :action="action" :accept="accept" :data="{ type: 5, gcId: updateId }" :file-list="fileListFive" :limit="limit" @onUploadRemove="onUploadRemove" />
          <div class="liTitle">原告代理人（非必填）</div>
          <UploadMulti ref="uploadOne" :action="action" :accept="accept" :data="{ type: 6, gcId: updateId }" :file-list="fileListSix" :limit="limit" @onUploadRemove="onUploadRemove" />
        </div>
      </div>
      <!-- 证据材料 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">证据材料（必填）</div>
        </div>
        <div class="boxContent">
          <UploadMulti ref="uploadOne" :action="action" :accept="accept" :data="{ type: 7, gcId: updateId }" :file-list="fileListSeven" :limit="limit" @onUploadRemove="onUploadRemove" />
        </div>
      </div>
      <!-- 其它材料 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">其它材料（非必填）</div>
        </div>
        <div class="boxContent">
          <UploadMulti ref="uploadOne" :action="action" :accept="accept" :data="{ type: 8, gcId: updateId }" :file-list="fileListEight" :limit="limit" @onUploadRemove="onUploadRemove" />
        </div>
      </div>
    </div>
    <div style="text-align: center; padding: 50px 0">
      <el-button @click="routerClose(`/guarantee/details/${updateId}`)"> 上一步 </el-button>
      <el-button type="primary" @click="submitForm">保存，继续下一步</el-button>
    </div>
  </div>
</template>
<script>
// api
import { fileApi } from '@/api/file'
import { guaranteeApi } from '@/api/guarantee'
import { preserveApi } from '@/api/preserve.js'
// components
import Steps from './components/Steps'
import StepPre from './components/StepPre'
import UploadMulti from '@/components/Upload/Multi'
// data
// filter
// function
import { getTemplateFileName, downloadSave } from './modules/utils'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
import { apiCourtUrl } from '@/settings'
export default {
  name: 'GuaranteeUpload',
  components: { Steps, StepPre, UploadMulti },
  mixins: [DetailMixin, MethodsMixin],
  props: {
    isPreserve: { type: Boolean, default: false }
  },
  data() {
    return {
      step: 0,
      isUpdate: true,
      accept: ['.xlsx', '.xls', '.doc', '.docx', '.pdf', '.jpg', '.jpeg', '.png', '.gif'].join(','),
      limit: 5,
      fileListOne: [],
      fileListTwo: [],
      fileListThree: [],
      fileListFour: [],
      fileListFive: [],
      fileListSix: [],
      fileListSeven: [],
      fileListEight: []
    }
  },
  computed: {
    action() {
      return apiCourtUrl + '/guaranteeFile/upload'
    }
  },
  created() {},
  methods: {
    // 获取全部消息
    startHandle() {
      guaranteeApi.details(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.step = data.guaranteeBaseInfo.step || 0
        } else {
          this.$message.error(msg)
        }
      })
      this.getList()
    },
    // 获取列表
    getList() {
      fileApi.list(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.fileListOne = data['1'] || []
          this.fileListTwo = data['2'] || []
          this.fileListThree = data['3'] || []
          this.fileListFour = data['4'] || []
          this.fileListFive = data['5'] || []
          this.fileListSix = data['6'] || []
          this.fileListSeven = data['7'] || []
          this.fileListEight = data['8'] || []
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 删除文件
    onUploadRemove(fileId) {
      this.$confirm('删除后将无法恢复，确定继续删除吗？', '温馨提示', {
        type: 'warning'
      })
        .then(() => {
          fileApi.remove(fileId).then(({ code, msg }) => {
            if (code === 200) {
              this.$message.success(msg)
              this.getList()
            } else {
              this.$message.error(msg)
            }
          })
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    },
    submitForm() {
      // 更新步聚
      if (this.fileListOne.length === 0) {
        this.$message.error('请上传保全申请书')
      } else if (this.fileListFour.length === 0) {
        this.$message.error('请上传身份证明材料（申请人）')
      } else if (this.fileListFive.length === 0) {
        this.$message.error('请上传身份证明材料（被申请人）')
      } else if (this.fileListSeven.length === 0) {
        this.$message.error('请上传证据材料')
      } else if (+this.step === -1) {
        if (this.isPreserve) {
          this.routerClose(`/preserve/preview/${this.updateId}`)
        } else {
          this.routerClose(`/guarantee/select/${this.updateId}`)
        }
      } else {
        if (this.isPreserve) {
          preserveApi.step({ cId: this.updateId, step: 4 }).then(({ code, data, msg }) => {
            if (code === 200) {
              this.routerClose('/preserve/preview/' + this.updateId)
            } else {
              this.$message.error(msg)
            }
          })
        } else {
          guaranteeApi.step({ gId: this.updateId, step: 3 }).then(({ code, data, msg }) => {
            if (code === 200) {
              this.routerClose(`/guarantee/select/${this.updateId}`)
            } else {
              this.$message.error(msg)
            }
          })
        }
      }
    },
    // 下载模板
    async getTemplate(id) {
      const fileName = getTemplateFileName(id)
      fileApi.template({ type: id }).then((data) => {
        downloadSave(fileName, 'docx', data)
        this.$message.success('下载成功')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('./styles/details.scss');
</style>
