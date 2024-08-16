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
      dictApi.gain('caseType').then(({ code, data, msg }) => {
        if (code === 200) {
          this.caseTypeAry = data.child
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
