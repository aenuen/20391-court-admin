<template>
  <div class="app-container">
    <Steps :step="5" />
    <div class="details">
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">对公汇款信息</div>
        </div>
        <div class="boxContent">
          <el-alert :title="`本次诉讼担保订单金额 ${account.guaranteeMoney} (元)`" type="success" />
          <div class="account">
            <table>
              <tr>
                <th>开户行</th>
                <td>{{ account.bank }}</td>
              </tr>
              <tr>
                <th>账户名</th>
                <td>{{ account.accountName }}</td>
              </tr>
              <tr>
                <th>账号</th>
                <td>{{ controlInputNumberSpace(account.orgAccount, 4) }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">上传汇款凭证</div>
        </div>
        <div class="boxContent">
          <div class="upload">
            <Base :action="action" file-text="汇款凭证" :file-list="fileList" :file-accept="accept" :file-data="{ gId: account.gId }" @onSuccess="onSuccess" />
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center">
      <el-button @click="resetUpload"> 重新上传 </el-button>
      <el-button type="primary" @click="submitForm">提交审核</el-button>
    </div>
  </div>
</template>
<script>
// api
import { guaranteeApi } from '@/api/guarantee'
import { approveApi } from '@/api/approve'
// components
import Steps from './components/Steps'
import Base from '@/components/Upload/Base'
// data
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { controlInputNumberSpace } from 'abbott-methods/import'
// settings
import { apiCourtUrl } from '@/settings'
export default {
  name: 'GuaranteePay',
  components: { Steps, Base },
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      isUpdate: true,
      account: {},
      controlInputNumberSpace,
      accept: ['.jpg', '.jpeg', '.png', '.gif'].join(','),
      fileList: []
    }
  },
  computed: {
    action() {
      return apiCourtUrl + '/guarantee/upload/pay'
    }
  },
  created() {},
  methods: {
    onSuccess(data) {
      this.fileList.push(data)
    },
    resetUpload() {
      this.fileList = []
    },
    submitForm() {
      if (this.fileList.length > 0) {
        approveApi.approve({ gId: this.updateId }).then(({ code, data, msg }) => {
          if (code === 200) {
            this.$message.success('审核成功')
            this.routerClose(`/guarantee/fees/${this.updateId}`)
          } else {
            this.$message.error(msg)
          }
        })
      } else {
        this.$message.error('请上传汇款凭证')
      }
    },
    getDetail() {
      guaranteeApi.details(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          const { guaranteeBaseInfo } = data
          this.account = {
            gId: guaranteeBaseInfo.gId,
            bank: guaranteeBaseInfo.bank,
            orgAccount: guaranteeBaseInfo.orgAccount,
            accountName: guaranteeBaseInfo.accountName,
            guaranteeMoney: guaranteeBaseInfo.guaranteeMoney
          }
          if (guaranteeBaseInfo.payImage) {
            this.fileList.push(guaranteeBaseInfo.payImage)
          }
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('./styles/details.scss');
.account {
  width: 800px;
  margin: 20px auto;
}
.upload {
  width: 800px;
  margin: auto;
}
table,
th,
td {
  border: 1px solid #eee;
  border-collapse: collapse;
}
table {
  width: 100%;
  th,
  td {
    padding: 5px 15px;
    line-height: 30px;
  }
  th {
    width: 150px;
    text-align: right;
    font-weight: bold;
  }
}
</style>
