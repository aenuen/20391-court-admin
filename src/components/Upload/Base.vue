<template>
  <div class="upload-container">
    <el-upload
      v-if="fileList.length === 0"
      :action="action"
      :headers="headers"
      :multiple="false"
      :data="fileData"
      :limit="fileLimit"
      :file-list="fileList"
      :accept="fileAccept"
      :disabled="fileDisabled"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :on-remove="onRemove"
      :on-exceed="onExceed"
      drag
      :show-file-list="false"
      class="image-upload"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        请将 <em>{{ fileText }} 拖入</em> 或 <em>点击上传</em>
      </div>
    </el-upload>
    <div v-else style="width: 100px">
      <div v-for="(item, key) in fileList" :key="key">
        <el-image v-if="fileClassify(item) === 'pic'" :src="getFullUrl(item)" fit="cover" @click="View(getFullUrl(item))" />
        <el-image v-else-if="fileClassify(item) === 'doc'" :src="doc" fit="fit" />
        <el-image v-else-if="fileClassify(item) === 'xls'" :src="xls" fit="fit" />
        <el-image v-else-if="fileClassify(item) === 'pdf'" :src="pdf" fit="fit" />
        <el-image v-else-if="fileClassify(item) === 'ofd'" :src="ofd" fit="fit" />
        <el-image v-else-if="fileClassify(item) === 'xml'" :src="xml" fit="fit" />
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" title="凭证预览" :before-close="dialogClose">
      <img :src="dialogImage" style="max-width: 800px; margin: auto" />
    </el-dialog>
  </div>
</template>

<script>
import FileType from '@/components/Mixins/FileType'
import { fileClassify } from 'abbott-methods/import'
import { getToken } from '@/libs/utils/token'
import { serveUrl } from '@/settings'
export default {
  name: 'UploadDefault',
  mixins: [FileType],
  props: {
    fileList: { type: Array, default: () => [] },
    fileDisabled: { type: Boolean, default: false },
    fileAccept: { type: String, default: '' },
    action: { type: String, default: '' },
    fileText: { type: String, default: '' },
    fileAction: { type: String, default: '' },
    fileLimit: { type: Number, default: 1 },
    fileData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      fileClassify,
      dialogVisible: false,
      dialogImage: ''
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `${getToken()}`
      }
    }
  },
  methods: {
    // 获取网址
    getFullUrl(url) {
      const arr = url.split('/')
      return `${serveUrl}/file/pay/${arr[arr.length - 2]}/${arr[arr.length - 1]}`
    },
    // 弹窗关闭
    View(url) {
      this.dialogVisible = true
      this.dialogImage = url
    },
    dialogClose() {
      this.dialogVisible = false
      this.dialogImage = ''
    },
    // 上传前事件
    beforeUpload(file) {
      this.$emit('onBeforeUpload', file)
    },
    // 成功事件
    onSuccess(response, file, fileList) {
      const { msg, code, data } = response
      if (code === 200) {
        this.$message.success(msg)
        this.$emit('onSuccess', data)
      } else {
        this.$message.error((msg && `上传失败，失败原因：${msg}`) || '上传失败')
        this.$emit('onError', 'file')
      }
    },
    // 错误事件
    onError(err) {
      const errMsg = err.message && JSON.parse(err.message)
      this.$message.error((errMsg && errMsg.msg && `上传失败，失败原因：${errMsg.msg}`) || '上传失败')
      this.$emit('onError', err)
    },
    // 移除事件
    onRemove() {
      this.$message.success(`${this.fileText}移除成功，可重新上传。若无重新上传则已上传的${this.fileText}仍在`)
      this.$emit('onRemove')
    },
    // 列表超出事件
    onExceed() {
      this.$message.warning(`一次只有上传${this.fileLimit}个${this.fileText}，移除队列可重新上传`)
    },
    // 处理预设值
    onPreview(data) {
      this.$emit('onPreview', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  width: 100%;
}
</style>
