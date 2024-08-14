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
      issueStatusAry: []
    }
  },
  created() {
    this.gain_issueStatusAry() // 提交人身份
  },
  methods: {
    gain_issueStatusAry() {
      const issueStatusAry = Cookie.get('issueStatusAry')
      if (issueStatusAry) {
        this.issueStatusAry = [...JSON.parse(issueStatusAry)]
      } else {
        dictApi.gain('issueStatus').then(({ code, data, msg }) => {
          if (code === 200) {
            const child = data.child
            Cookie.set('issueStatusAry', JSON.stringify(child))
            this.issueStatusAry = [...child]
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
