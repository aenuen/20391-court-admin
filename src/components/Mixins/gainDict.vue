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
      expenseTypeAry: [], // 费率类型
      noGuaranteeReasonAry: [], // 无需担保原因
      orgTypeAry: [], // 机构类型
      assetType: [], // 财产类型
      agentTypeAry: [], // 代理人类型
      applyTypeAry: [], // 申请人类型
      caseTypeAry: [], // 案件类型
      certTypeAry: [], // 证件类型
      countryAry: [], // 国别
      courtTypeAry: [], // 保全类型
      courtCategoryAry: [], // 保全类别
      issueStatusAry: [], // 提交人身份
      nationAry: [], // 民族
      outLawsuitTimeAry: [], // 非诉期间
      unitPropertyAry: [] // 单位性质
    }
  },
  created() {},
  methods: {
    // 机构类型
    async gainDict_expenseTypeAry() {
      const data = localStorage.getItem('expenseTypeAry')
      if (data) {
        this.expenseTypeAry = JSON.parse(data)
      } else {
        await dictApi.gain('expenseType').then(({ code, data, msg }) => {
          if (code === 200) {
            this.expenseTypeAry = data.child
            localStorage.setItem('expenseTypeAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 机构类型
    async gainDict_noGuaranteeReasonAry() {
      const data = localStorage.getItem('noGuaranteeReasonAry')
      if (data) {
        this.noGuaranteeReasonAry = JSON.parse(data)
      } else {
        await dictApi.gain('noGuaranteeReason').then(({ code, data, msg }) => {
          if (code === 200) {
            this.noGuaranteeReasonAry = data.child
            localStorage.setItem('noGuaranteeReasonAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 机构类型
    async gainDict_orgTypeAry() {
      const data = localStorage.getItem('orgTypeAry')
      if (data) {
        this.orgTypeAry = JSON.parse(data)
      } else {
        await dictApi.gain('orgType').then(({ code, data, msg }) => {
          if (code === 200) {
            this.orgTypeAry = data.child
            localStorage.setItem('orgTypeAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 代理人类型
    async gainDict_assetTypeAry() {
      const data = localStorage.getItem('assetTypeAry')
      if (data) {
        this.assetTypeAry = JSON.parse(data)
      } else {
        await dictApi.gain('assetType').then(({ code, data, msg }) => {
          if (code === 200) {
            this.assetTypeAry = data.child
            localStorage.setItem('assetTypeAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 代理人类型
    async gainDict_agentTypeAry() {
      const data = localStorage.getItem('agentTypeAry')
      if (data) {
        this.agentTypeAry = JSON.parse(data)
      } else {
        await dictApi.gain('agentType').then(({ code, data, msg }) => {
          if (code === 200) {
            this.agentTypeAry = data.child
            localStorage.setItem('agentTypeAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 申请人类型
    async gainDict_applyTypeAry() {
      const data = localStorage.getItem('applyTypeAry')
      if (data) {
        this.applyTypeAry = JSON.parse(data)
      } else {
        await dictApi.gain('applyType').then(({ code, data, msg }) => {
          if (code === 200) {
            this.applyTypeAry = data.child
            localStorage.setItem('applyTypeAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 案件类型
    async gainDict_caseTypeAry() {
      const data = localStorage.getItem('caseTypeAry')
      if (data) {
        this.caseTypeAry = JSON.parse(data)
      } else {
        await dictApi.gain('caseType').then(({ code, data, msg }) => {
          if (code === 200) {
            this.caseTypeAry = data.child
            localStorage.setItem('caseTypeAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 证件类型
    async gainDict_certTypeAry() {
      const data = localStorage.getItem('certTypeAry')
      if (data) {
        this.certTypeAry = JSON.parse(data)
      } else {
        await dictApi.gain('certType').then(({ code, data, msg }) => {
          if (code === 200) {
            this.certTypeAry = [...data.child]
            localStorage.setItem('certTypeAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 国别
    async gainDict_countryAry() {
      const data = localStorage.getItem('countryAry')
      if (data) {
        this.countryAry = JSON.parse(data)
      } else {
        await dictApi.gain('country').then(({ code, data, msg }) => {
          if (code === 200) {
            this.countryAry = [...data.child]
            localStorage.setItem('countryAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 保全类型
    async gainDict_courtTypeAry() {
      const data = localStorage.getItem('courtTypeAry')
      if (data) {
        this.courtTypeAry = JSON.parse(data)
      } else {
        await dictApi.gain('courtType').then(({ code, data, msg }) => {
          if (code === 200) {
            this.courtTypeAry = [...data.child]
            localStorage.setItem('courtTypeAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 保全类别
    async gainDict_courtCategoryAry() {
      const data = localStorage.getItem('courtCategoryAry')
      if (data) {
        this.courtCategoryAry = JSON.parse(data)
      } else {
        await dictApi.gain('courtCategory').then(({ code, data, msg }) => {
          if (code === 200) {
            this.courtCategoryAry = [...data.child]
            localStorage.setItem('courtCategoryAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 提交人身份
    async gainDict_issueStatusAry() {
      const data = localStorage.getItem('issueStatusAry')
      if (data) {
        this.issueStatusAry = JSON.parse(data)
      } else {
        await dictApi.gain('issueStatus').then(({ code, data, msg }) => {
          if (code === 200) {
            this.issueStatusAry = [...data.child]
            localStorage.setItem('issueStatusAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 民族
    async gainDict_nationAry() {
      const data = localStorage.getItem('nationAry')
      if (data) {
        this.nationAry = JSON.parse(data)
      } else {
        await dictApi.nation().then(({ code, data, msg }) => {
          if (code === 200) {
            this.nationAry = [...data]
            localStorage.setItem('nationAry', JSON.stringify(data))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 非诉期间
    async gainDict_outLawsuitTimeAry() {
      const data = localStorage.getItem('outLawsuitTimeAry')
      if (data) {
        this.outLawsuitTimeAry = JSON.parse(data)
      } else {
        await dictApi.gain('outLawsuitTime').then(({ code, data, msg }) => {
          if (code === 200) {
            this.outLawsuitTimeAry = [...data.child]
            localStorage.setItem('outLawsuitTimeAry', JSON.stringify(data.child))
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 单位性质
    async gainDict_unitPropertyAry() {
      const data = localStorage.getItem('unitPropertyAry')
      if (data) {
        this.unitPropertyAry = JSON.parse(data)
      } else {
        await dictApi.gain('unitProperty').then(({ code, data, msg }) => {
          if (code === 200) {
            this.unitPropertyAry = [...data.child]
            localStorage.setItem('unitPropertyAry', JSON.stringify(data.child))
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
