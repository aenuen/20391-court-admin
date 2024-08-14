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
      unitPropertyAry: []
    }
  },
  created() {
    this.gain_unitPropertyAry() // 案件类型
  },
  methods: {
    gain_unitPropertyAry() {
      const unitPropertyAry = Cookie.get('unitPropertyAry')
      if (unitPropertyAry) {
        this.unitPropertyAry = [...JSON.parse(unitPropertyAry)]
      } else {
        dictApi.gain('unitProperty').then(({ code, data, msg }) => {
          if (code === 200) {
            const child = data.child
            Cookie.set('unitPropertyAry', JSON.stringify(child))
            this.unitPropertyAry = [...child]
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
