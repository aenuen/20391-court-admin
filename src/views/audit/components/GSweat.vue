<template>
  <div class="app-container">
    <div style="height: 50px; line-height: 30px; font-size: 16px">担保编号：{{ gId }}</div>
    <Base file-text="电子保函" :action="action" :file-list="fileList" :file-accept="accept" :file-data="{ gId }" @onSuccess="onSuccess" />
  </div>
</template>
<script>
// api
// components
import Base from '@/components/Upload/Base'
// data
// filter
// function
// mixin
// plugins
// settings
import { apiCourtUrl } from '@/settings'
export default {
  name: 'AuditGSweat',
  components: { Base },
  mixins: [],
  props: {
    gId: { type: String, default: '' }
  },
  data() {
    return {
      accept: ['.pdf'].join(','),
      fileList: []
    }
  },
  computed: {
    action() {
      return apiCourtUrl + '/guarantee/upload/file'
    }
  },
  created() {},
  methods: {
    onSuccess(data) {
      this.fileList.push(data)
      this.$emit('onSweatSuccess')
    }
  }
}
</script>
<style lang="scss" scoped></style>
