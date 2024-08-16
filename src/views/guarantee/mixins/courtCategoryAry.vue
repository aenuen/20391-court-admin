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
      courtCategoryAry: []
    }
  },
  created() {
    this.gain_courtCategoryAry() // 保全类别
  },
  methods: {
    gain_courtCategoryAry() {
      dictApi.gain('courtCategory').then(({ code, data, msg }) => {
        if (code === 200) {
          const child = data.child
          this.courtCategoryAry = [...child]
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
