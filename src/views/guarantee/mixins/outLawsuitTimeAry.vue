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
      outLawsuitTimeAry: []
    }
  },
  created() {
    this.gain_outLawsuitTimeAry() // 非诉期间
  },
  methods: {
    gain_outLawsuitTimeAry() {
      dictApi.gain('outLawsuitTime').then(({ code, data, msg }) => {
        if (code === 200) {
          const child = data.child
          this.outLawsuitTimeAry = [...child]
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
