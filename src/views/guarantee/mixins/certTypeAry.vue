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
      certTypeAry: []
    }
  },
  created() {
    this.gain_certTypeAry() // 证件类型
  },
  methods: {
    gain_certTypeAry() {
      const certTypeAry = Cookie.get('certTypeAry')
      if (certTypeAry) {
        this.certTypeAry = [...JSON.parse(certTypeAry)]
      } else {
        dictApi.gain('certType').then(({ code, data, msg }) => {
          if (code === 200) {
            const child = data.child
            Cookie.set('certTypeAry', JSON.stringify(child))
            this.certTypeAry = [...child]
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
