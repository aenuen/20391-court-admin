<template>
  <See :data="postForm" />
</template>
<script>
// api
import { organizeApi } from '@/api/organize'
// components
import See from './components/See'
// data
// filter
// function
import { getAddressText, getAddressArea, getAreaName } from '@/libs/utils/area'
// mixin
// plugins
import { codeToText } from 'element-china-area-data'
// settings
export default {
  name: 'OrganizeLook',
  components: { See },
  mixins: [],
  data() {
    return {
      postForm: {}
    }
  },
  created() {
    const ParamsId = this.$route.params.id
    this.gainDetail(ParamsId)
  },
  methods: {
    gainDetail(ParamsId) {
      organizeApi.get(ParamsId).then(({ code, data, msg }) => {
        if (code === 200) {
          const newForm = {}
          if (data.orgAddress) {
            newForm.dwellArea = getAreaName(codeToText, getAddressArea(data.orgAddress)).replace(/\//g, '')
            newForm.dwellAddress = getAddressText(data.orgAddress)
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
