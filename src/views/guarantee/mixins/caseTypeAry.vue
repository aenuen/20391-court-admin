<template>
  <div></div>
</template>
<script>
// api
import { dictApi } from '@/api/dict'
// components
// data
// filter
// function
// mixin
// plugins
import Cookie from 'js-cookie'
// settings
export default {
  name: '',
  components: {},
  mixins: [],
  data() {
    return {
      caseTypeAry: []
    }
  },
  created() {
    this.gain_caseTypeAry() // 案件类型
  },
  methods: {
    gain_caseTypeAry() {
      const caseTypeAry = Cookie.get('caseTypeAry')
      if (caseTypeAry) {
        this.caseTypeAry = [...JSON.parse(caseTypeAry)]
      } else {
        dictApi.gain('caseType').then(({ code, data, msg }) => {
          if (code === 200) {
            const child = data.child
            Cookie.set('caseTypeAry', JSON.stringify(child))
            this.caseTypeAry = [...child]
          } else {
            this.$message.error(msg)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
