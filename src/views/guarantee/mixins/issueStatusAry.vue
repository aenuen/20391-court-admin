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
      issueStatusAry: []
    }
  },
  created() {
    this.gain_issueStatusAry() // 提交人身份
  },
  methods: {
    gain_issueStatusAry() {
      dictApi.gain('issueStatus').then(({ code, data, msg }) => {
        if (code === 200) {
          const child = data.child
          this.issueStatusAry = [...child]
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
