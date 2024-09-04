<template>
  <div class="fileShow">
    <div v-for="(item, key) in fileList" :key="key" class="item" @click="download(getFullUrl(item.url))">
      <div class="file">
        <el-image v-if="fileClassify(item.url) === 'pic'" :src="getFullUrl(item.url)" fit="cover" />
        <el-image v-else-if="fileClassify(item.url) === 'doc'" :src="doc" fit="fit" />
        <el-image v-else-if="fileClassify(item.url) === 'xls'" :src="xls" fit="fit" />
        <el-image v-else-if="fileClassify(item.url) === 'pdf'" :src="pdf" fit="fit" />
      </div>
      <div class="name">{{ item.fileName }}</div>
    </div>
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
import { fileClassify } from 'abbott-methods/import'
// settings
import { serveUrl } from '@/settings'
export default {
  name: 'ComponentsFileShow',
  components: {},
  mixins: [],
  props: {
    fileList: { type: Array, default: () => [] }
  },
  data() {
    return {
      fileClassify,
      doc: require(`@/assets/image/fileType/word.png`),
      xls: require(`@/assets/image/fileType/excel.png`),
      pdf: require(`@/assets/image/fileType/PDF.png`)
    }
  },
  created() {},
  methods: {
    // 获取网址
    getFullUrl(url) {
      const arr = url.split('/')
      const path = `${serveUrl}/file/images/${arr[arr.length - 1]}`

      return path
    },
    // 下载
    download(url) {
      window.open(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.fileShow {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .item {
    height: 80px;
    width: 300px;
    display: flex;
    border: 1px solid #ddd;
    padding: 14px;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
    .file {
      margin-right: 10px;
      .el-image {
        width: 50px;
        height: 50px;
      }
    }
    .name {
      display: flex;
      align-items: center; /* 垂直居中 */
    }
  }
}
</style>
