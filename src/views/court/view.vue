<template>
  <See :data="postForm" />
</template>
<script>
// api
import { courtApi } from '@/api/court'
// components
import See from './components/See'
// data
// filter
// function
import { getAreaName } from '@/libs/utils/area'
// mixin
// plugins
import { codeToText } from 'element-china-area-data'
// settings
export default {
  name: 'CourtView',
  components: { See },
  mixins: [],
  data() {
    return {
      postForm: {}
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      courtApi.detail().then(({ code, data, msg }) => {
        if (code === 200) {
          const newForm = {}
          if (data.courtAddress) {
            newForm.courtAddress = getAreaName(codeToText, data.courtAddress.split(',')).replace(/\//g, '')
          }
          this.postForm = { ...this.postForm, ...data, ...newForm }
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
