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
      nationAry: []
    }
  },
  created() {
    this.gain_nationAry() // 民族
  },
  methods: {
    gain_nationAry() {
      const nationAry = Cookie.get('nationAry')
      if (nationAry) {
        this.nationAry = [...JSON.parse(nationAry)]
      } else {
        dictApi.nation().then(({ code, data, msg }) => {
          if (code === 200) {
            Cookie.set('nationAry', JSON.stringify(data))
            this.nationAry = [...data]
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
