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
      applyTypeAry: [], // 申请人类型
      caseTypeAry: [], // 案件类型
      certTypeAry: [], // 证件类型
      countryAry: [], // 国别
      courtCategoryAry: [], // 保全类别
      issueStatusAry: [], // 提交人身份
      nationAry: [], // 民族
      outLawsuitTimeAry: [], // 非诉期间
      unitPropertyAry: [] // 单位性质
    }
  },
  created() {},
  methods: {
    // 申请人类型
    async gainDict_applyTypeAry() {
      await dictApi.gain('applyType').then(({ code, data, msg }) => {
        if (code === 200) {
          this.applyTypeAry = data.child
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 案件类型
    async gainDict_caseTypeAry() {
      await dictApi.gain('caseType').then(({ code, data, msg }) => {
        if (code === 200) {
          this.caseTypeAry = data.child
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 证件类型
    async gainDict_certTypeAry() {
      await dictApi.gain('certType').then(({ code, data, msg }) => {
        if (code === 200) {
          const child = data.child
          this.certTypeAry = [...child]
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 国别
    async gainDict_countryAry() {
      await dictApi.gain('country').then(({ code, data, msg }) => {
        if (code === 200) {
          const child = data.child
          this.countryAry = [...child]
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 保全类别
    async gainDict_courtCategoryAry() {
      await dictApi.gain('courtCategory').then(({ code, data, msg }) => {
        if (code === 200) {
          const child = data.child
          this.courtCategoryAry = [...child]
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 提交人身份
    async gainDict_issueStatusAry() {
      await dictApi.gain('issueStatus').then(({ code, data, msg }) => {
        if (code === 200) {
          const child = data.child
          this.issueStatusAry = [...child]
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 民族
    async gainDict_nationAry() {
      await dictApi.nation().then(({ code, data, msg }) => {
        if (code === 200) {
          this.nationAry = [...data]
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 非诉期间
    async gainDict_outLawsuitTimeAry() {
      await dictApi.gain('outLawsuitTime').then(({ code, data, msg }) => {
        if (code === 200) {
          const child = data.child
          this.outLawsuitTimeAry = [...child]
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 单位性质
    async gainDict_unitPropertyAry() {
      await dictApi.gain('unitProperty').then(({ code, data, msg }) => {
        if (code === 200) {
          const child = data.child
          this.unitPropertyAry = [...child]
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
