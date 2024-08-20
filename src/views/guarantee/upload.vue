<template>
  <div class="app-container">
    <Steps :step="1" />
    <div class="details">
      <!-- 保全申请书 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">保全申请书（必填）</div>
          <a class="titleIcon" @click="getTemplate(1)"><i class="el-icon-plus" />下载模版</a>
        </div>
        <div class="boxContent">
          <UploadMore />
        </div>
      </div>
      <!-- 起诉状（非必填） -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">起诉状（非必填）</div>
          <a class="titleIcon" @click="getTemplate(2)"><i class="el-icon-plus" />下载模版</a>
        </div>
        <div class="boxContent"></div>
      </div>
      <!-- 立案受理通知书 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">立案受理通知书（非必填）</div>
        </div>
        <div class="boxContent"></div>
      </div>
      <!-- 身份证明材料 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">身份证明材料（必填）</div>
          <a class="titleIcon" @click="getTemplate(4)"><i class="el-icon-plus" />下载模版</a>
        </div>
        <div class="boxContent"></div>
      </div>
      <!-- 证据材料 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">证据材料（必填）</div>
        </div>
        <div class="boxContent"></div>
      </div>
      <!-- 其它材料 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">其它材料（非必填）</div>
        </div>
        <div class="boxContent"></div>
      </div>
    </div>
    <div style="text-align: center; padding: 50px 0">
      <el-button type="primary" @click="submitForm">保存，继续下一步</el-button>
    </div>
  </div>
</template>
<script>
// api
import { fileApi } from '@/api/file'
// components
import Steps from './components/Steps'
import UploadMore from '@/components/Upload/More'
// data
// filter
// function
import { getTemplateFileName, downloadSave } from './modules/utils'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'GuaranteeUpload',
  components: { Steps, UploadMore },
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {}
  },
  created() {},
  methods: {
    submitForm() {},
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
