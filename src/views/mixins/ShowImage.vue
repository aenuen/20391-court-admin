<template>
  <el-dialog v-if="showImageController" :visible.sync="showImageController" title="支付凭证" :before-close="showImageClose">
    <el-image v-if="showImageController" :src="showImagePhoto" style="width: 100%; height: 100%" fit="contain" />
  </el-dialog>
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
  name: 'MixinsShowImage',
  components: {},
  mixins: [],
  data() {
    return {
      showImageController: false,
      showImagePhoto: ''
    }
  },
  created() {},
  methods: {
    showImageMethods(url) {
      this.showImageController = true
      this.showImagePhoto = url
    },
    showImageClose() {
      this.showImageController = false
      this.showImagePhoto = ''
    }
  }
}
</script>
<style lang="scss" scoped></style>
