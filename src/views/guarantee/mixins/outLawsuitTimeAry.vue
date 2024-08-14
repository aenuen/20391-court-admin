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
      outLawsuitTimeAry: []
    }
  },
  created() {
    this.gain_outLawsuitTimeAry() // 非诉期间
  },
  methods: {
    gain_outLawsuitTimeAry() {
      const outLawsuitTimeAry = Cookie.get('outLawsuitTimeAry')
      if (outLawsuitTimeAry) {
        this.outLawsuitTimeAry = [...JSON.parse(outLawsuitTimeAry)]
      } else {
        dictApi.gain('outLawsuitTime').then(({ code, data, msg }) => {
          if (code === 200) {
            const child = data.child
            Cookie.set('outLawsuitTimeAry', JSON.stringify(child))
            this.outLawsuitTimeAry = [...child]
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
