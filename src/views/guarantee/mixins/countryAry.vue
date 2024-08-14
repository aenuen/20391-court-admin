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
      countryAry: []
    }
  },
  created() {
    this.gain_countryAry() // 国别
  },
  methods: {
    gain_countryAry() {
      const countryAry = Cookie.get('countryAry')
      if (countryAry) {
        this.countryAry = [...JSON.parse(countryAry)]
      } else {
        dictApi.gain('country').then(({ code, data, msg }) => {
          if (code === 200) {
            const child = data.child
            Cookie.set('countryAry', JSON.stringify(child))
            this.countryAry = [...child]
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
