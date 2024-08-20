<template>
  <div class="uploadMore">
    <div class="uploadList">
      <div class="item">1</div>
    </div>
    <el-upload class="uploaderItem" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="onSuccess" :before-upload="beforeUpload">
      <i class="el-icon-plus uploaderIcon" />
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
// settings
export default {
  name: 'ComponentsUploadMore',
  components: {},
  mixins: [],
  data() {
    return {}
  },
  created() {},
  methods: {
    onSuccess() {},
    beforeUpload() {}
  }
}
</script>
<style lang="scss" scoped>
.uploadMore {
  display: flex;
}
.uploadList {
  .item {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
}
.uploaderItem {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
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
</style>
