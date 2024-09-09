<template>
  <div class="uploadMulti">
    <el-image v-if="fileName.length > 0" :src="pdf" fit="cover" style="margin: 20px 20px 0 0" :style="{ width: width + 'px', height: height + 'px' }" />
    <div class="uploadList">
      <div v-for="(item, key) in fileList" :key="key" class="item" :style="{ width: width + 'px', height: height + 50 + 'px' }">
        <div class="line">
          <div class="file" :style="{ width: width + 'px', height: height + 'px' }">
            <el-image v-if="fileClassify(item.url) === 'pic'" :src="getFullUrl(item.url)" fit="cover" :style="{ width: width + 'px', height: height + 'px' }" />
            <el-image v-else-if="fileClassify(item.url) === 'doc'" :src="doc" fit="fit" :style="{ width: width + 'px', height: height + 'px' }" />
            <el-image v-else-if="fileClassify(item.url) === 'xls'" :src="xls" fit="fit" :style="{ width: width + 'px', height: height + 'px' }" />
            <el-image v-else-if="fileClassify(item.url) === 'pdf'" :src="pdf" fit="fit" :style="{ width: width + 'px', height: height + 'px' }" />
            <el-image v-else-if="fileClassify(item.url) === 'ofd'" :src="ofd" fit="fit" :style="{ width: width + 'px', height: height + 'px' }" />
            <el-image v-else-if="fileClassify(item.url) === 'xml'" :src="xml" fit="fit" :style="{ width: width + 'px', height: height + 'px' }" />
          </div>
          <div class="mask" :style="{ width: width + 'px', height: height + 'px' }" />
          <div class="icon">
            <span v-if="fileClassify(item.url) === 'pic'" @click="onUploadPreview(getFullUrl(item.url))">
              <i class="el-icon-zoom-in" />
            </span>
            <span v-else @click="onUploadDownload(item.url)">
              <i class="el-icon-download" />
            </span>
            <span @click="onUploadRemove(item.fileId)">
              <i class="el-icon-delete" />
            </span>
          </div>
        </div>
        <div class="name" :style="{ width: width + 'px', height: 50 + 'px' }">{{ item.fileName }}</div>
      </div>
      <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <div class="load" :style="{ width: width + 'px', height: height + 50 + 'px' }">
      <el-upload
        v-if="limit > fileList.length"
        ref="multi"
        class="uploaderItem"
        :multiple="false"
        :action="action"
        :headers="headers"
        :accept="accept"
        :data="data"
        :show-file-list="false"
        :on-success="onSuccess"
        :before-upload="onBeforeUpload"
        :on-error="onUploadError"
        :style="{ width: width + 'px', height: height + 'px' }"
        :auto-upload="auto"
        :on-change="onChange"
      >
        <i class="el-icon-plus uploaderIcon" :style="{ width: width + 'px', height: height + 'px' }" />
        <div v-if="progress" class="progress">
          <el-progress type="circle" :percentage="percentage" :width="width" />
        </div>
      </el-upload>
    </div>
  </div>
</template>
<script>
// api
// components
// data
// filter
// function
import { fileSave } from '@/libs/fileSave'
// mixin
import FileType from '@/components/Mixins/FileType'
// plugins
import { getToken } from '@/libs/utils/token'
import { fileClassify } from 'abbott-methods/import'
// settings
import { serveUrl } from '@/settings'
import { guaranteeApi } from '@/api/guarantee'
export default {
  name: 'ComponentsUploadMulti',
  components: {},
  mixins: [FileType],
  props: {
    fileList: { type: Array, default: () => [] },
    action: { type: String, default: '' },
    accept: { type: String, default: '' },
    data: { type: Object, default: () => {} },
    fileExceed: { type: Number, default: 2 },
    limit: { type: Number, default: 5 },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    auto: { type: Boolean, default: true }
  },
  data() {
    return {
      fileClassify,
      dialogVisible: '',
      dialogImageUrl: '',
      percentage: 0,
      progress: false,
      fileName: ''
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `${getToken()}`
      }
    }
  },
  created() {},
  methods: {
    // 获取网址
    getFullUrl(url) {
      const arr = url.split('/')
      return `${serveUrl}/file/images/${arr[arr.length - 1]}`
    },
    // 上传成功
    onSuccess({ code, data }, file) {
      if (code === 200) {
        this.isUpdate = false
        if (typeof data === 'string') {
          data = { url: data }
        }
        this.fileList.push(data)
        this.$message.success('上传成功')
        this.$emit('onUploadSuccess')
      }
      this.percentage = 100
      setTimeout(() => {
        this.progress = false
        this.percentage = 0
      }, 500)
    },
    onChange(file, fileList) {
      this.fileName = file.name
      this.$message.success('已选择' + file.name + '文件')
    },
    // 上传错误
    onUploadError() {
      this.percentage = 0
      this.progress = false
      this.$message.error('上传失败，请稍候再试…')
    },
    // 上传之前
    onBeforeUpload(file) {
      this.progress = true
      this.percentage = 30
      if (this.fileList.length >= this.limit) {
        this.$message.warning(`上传失败，只能上传 ${this.limit}个文件!`)
        this.percentage = 0
        this.progress = false
        return false
      } else {
        const isSmall = file.size / 1024 / 1024 < this.fileExceed
        if (!isSmall) {
          this.$message.error(`上传失败，文件大小不能超过 ${this.fileExceed}MB!`)
          this.percentage = 0
          this.progress = false
        }
        return isSmall
      }
    },
    // 浏览
    onUploadPreview(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    // 下载
    onUploadDownload(url) {
      guaranteeApi.download({ path: url }).then(({ code, data, msg }) => {
        fileSave(Date.now(), 'docx', data)
        this.$message.success('下载成功')
      })
    },
    // 删除
    onUploadRemove(fileId) {
      this.$emit('onUploadRemove', fileId)
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('./styles/Multi.scss');
</style>
