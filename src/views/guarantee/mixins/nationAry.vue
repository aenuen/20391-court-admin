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
      nationAry: []
    }
  },
  created() {
    this.gain_nationAry() // 民族
  },
  methods: {
    gain_nationAry() {
      dictApi.nation().then(({ code, data, msg }) => {
        if (code === 200) {
          this.nationAry = [...data]
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
