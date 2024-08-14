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
      courtCategoryAry: []
    }
  },
  created() {
    this.gain_courtCategoryAry() // 保全类别
  },
  methods: {
    gain_courtCategoryAry() {
      const courtCategoryAry = Cookie.get('courtCategoryAry')
      if (courtCategoryAry) {
        this.courtCategoryAry = [...JSON.parse(courtCategoryAry)]
      } else {
        dictApi.gain('courtCategory').then(({ code, data, msg }) => {
          if (code === 200) {
            const child = data.child
            Cookie.set('courtCategoryAry', JSON.stringify(child))
            this.courtCategoryAry = [...child]
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
