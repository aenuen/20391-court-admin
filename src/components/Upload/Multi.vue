<template>
  <div class="uploadMulti">
    <div class="uploadList">
      <div v-for="(item, key) in fileList" :key="key" class="item">
        <div class="file">
          <el-image v-if="fileClassify(item.url) === 'pic'" :src="getFullUrl(item.url)" fit="cover" />
          <el-image v-else-if="fileClassify(item.url) === 'doc'" :src="doc" fit="fit" />
          <el-image v-else-if="fileClassify(item.url) === 'xls'" :src="xls" fit="fit" />
          <el-image v-else-if="fileClassify(item.url) === 'pdf'" :src="pdf" fit="fit" />
        </div>
        <div class="name">{{ item.fileName }}</div>
        <div class="mask" />
        <div class="icon">
          <span v-if="fileClassify(item.url) === 'pic'" @click="onUploadPreview(getFullUrl(item.url))">
            <i class="el-icon-zoom-in" />
          </span>
          <span v-else @click="onUploadDownload(getFullUrl(item.url))">
            <i class="el-icon-download" />
          </span>
          <span @click="onUploadRemove(item.fileId)">
            <i class="el-icon-delete" />
          </span>
        </div>
      </div>
      <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <el-upload v-if="limit > fileList.length" class="uploaderItem" :multiple="false" :action="action" :headers="headers" :accept="accept" :data="data" :show-file-list="false" :on-success="onSuccess" :before-upload="onBeforeUpload" :auto-upload="auto" :on-error="onUploadError">
      <i class="el-icon-plus uploaderIcon" />
      <div v-if="progress" class="progress">
        <el-progress type="circle" :percentage="percentage" :width="100" />
      </div>
    </el-upload>
  </div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
import { getToken } from '@/libs/utils/token'
import { fileClassify } from 'abbott-methods/import'
// settings
import { serveUrl } from '@/settings'
export default {
  name: 'ComponentsUploadMore',
  components: {},
  mixins: [],
  props: {
    fileList: { type: Array, default: () => [] },
    action: { type: String, default: '' },
    accept: { type: String, default: '' },
    data: { type: Object, default: () => {} },
    fileExceed: { type: Number, default: 2 },
    limit: { type: Number, default: 5 },
    auto: { type: Boolean, default: true }
  },
  data() {
    return {
      fileClassify,
      dialogVisible: '',
      dialogImageUrl: '',
      percentage: 0,
      progress: false,
      doc: require(`@/assets/image/fileType/word.png`),
      xls: require(`@/assets/image/fileType/excel.png`),
      pdf: require(`@/assets/image/fileType/PDF.png`)
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
      console.log(this.limit >= this.fileList.length)
      const arr = url.split('/')
      return `${serveUrl}/file/images/${arr[arr.length - 1]}`
    },
    // 上传成功
    onSuccess({ code, data }, file) {
      if (this.auto) {
        //
      } else {
        //
      }
      if (code === 200) {
        this.isUpdate = false
        // const { url, fileName, fileId, type, gcId } = data
        this.fileList.push(data)
        this.$message.success('上传成功')
      }
      this.percentage = 100
      setTimeout(() => {
        this.progress = false
        this.percentage = 0
      }, 500)
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
      window.open(url)
    },
    // 删除
    onUploadRemove(fileId) {
      this.$emit('onUploadRemove', fileId)
    }
  }
}
</script>
<style lang="scss" scoped>
$width: 100px;
$height: 100px;

.uploadMulti {
  display: flex;
  padding: 0 10px;

  .uploadList {
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .item:hover {
      .mask,
      .icon {
        display: block;
      }
    }

    .item {
      width: $width;
      height: $height;
      margin-right: 20px;
      position: relative;
      margin-top: 10px;

      .file {
        width: $width;
        height: $height;

        .el-image {
          width: $width;
          height: $height;
        }
      }

      .name {
        width: $width;
        height: 40;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
        overflow: hidden;
        color: #666;
      }

      .mask {
        display: none;
        width: $width;
        height: $height;
        position: absolute;
        left: 0;
        top: 0;
        background: rgb(0, 0, 0, 0.3);
      }

      .icon {
        display: none;
        width: $width;
        height: $height;
        position: absolute;
        left: 0;
        top: 40%;
        text-align: center;

        span {
          margin: 0 5px;
          cursor: pointer;
          color: #fff;
          line-height: 30px;
          font-size: 16px;
        }
      }
    }
  }

  .uploaderItem {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: $width;
    height: $height;
    margin-top: 10px;

    .progress {
      position: absolute;
      left: 0;
      top: 0;
      background: #fff;
      width: $width;
      height: $height;
    }

    .uploaderIcon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
  }

  .uploaderItem .el-upload:hover {
    border-color: #409eff;
  }
}
</style>
