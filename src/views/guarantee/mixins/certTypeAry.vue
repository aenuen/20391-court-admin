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
      certTypeAry: []
    }
  },
  created() {
    this.gain_certTypeAry() // 证件类型
  },
  methods: {
    gain_certTypeAry() {
      dictApi.gain('certType').then(({ code, data, msg }) => {
        if (code === 200) {
          const child = data.child
          this.certTypeAry = [...child]
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
