<template>
  <div class="app-container">
    <template v-if="isPreview === false">
      <StepPre v-if="isPreserve" :step="2" />
      <Steps v-else :step="3" />
    </template>
    <div class="details">
      <!-- 基本资料 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">基本资料</div>
        </div>
        <div class="boxContent">
          <BaseData :data-ary="baseData" />
        </div>
      </div>
      <!-- 申请人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">申请人</div>
        </div>
        <div class="boxContent">
          <div v-for="(item, key) in ApplicantData" :key="key" class="listBox">
            <ul class="showTable">
              <li v-for="(line, index) in item" :key="index">
                <b>{{ line.label }}</b>
                <u>：</u>
                <el-tooltip v-if="line.tip" :content="String(line.value)" effect="dark" placement="top">
                  <i>
                    {{ line.value }}
                  </i>
                </el-tooltip>
                <i v-else>{{ line.value }}</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 被申请人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">被申请人</div>
        </div>
        <div class="boxContent">
          <div v-for="(item, key) in RespondentData" :key="key" class="listBox">
            <ul class="showTable">
              <li v-for="(line, index) in item" :key="index">
                <b>{{ line.label }}</b>
                <u>：</u>
                <el-tooltip v-if="line.tip" :content="String(line.value)" effect="dark" placement="top">
                  <i>
                    {{ line.value }}
                  </i>
                </el-tooltip>
                <i v-else>{{ line.value }}</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 原告代理人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">原告代理人</div>
        </div>
        <div class="boxContent">
          <div v-for="(item, key) in AgentData" :key="key" class="listBox">
            <ul class="showTable">
              <li v-for="(line, index) in item" :key="index">
                <b>{{ line.label }}</b>
                <u>：</u>
                <el-tooltip v-if="line.tip" :content="String(line.value)" effect="dark" placement="top">
                  <i>
                    {{ line.value }}
                  </i>
                </el-tooltip>
                <i v-else>{{ line.value }}</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 财产线索 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">财产线索</div>
        </div>
        <div class="boxContent">
          <div v-for="(item, key) in PropertyData" :key="key" class="listBox">
            <ul class="showTable">
              <li v-for="(line, index) in item" :key="index" :style="{ width: line.need ? '1000px' : '25%' }">
                <b>{{ line.label }}</b>
                <u>：</u>
                <el-tooltip v-if="line.tip" :content="String(line.value)" effect="dark" placement="top-start">
                  <i :style="{ width: line.need ? '890px' : 'auto' }">
                    {{ line.value }}
                  </i>
                </el-tooltip>
                <i v-else>{{ line.value }}</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 上传材料 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">上传材料</div>
        </div>
        <div class="boxContent">
          <table>
            <tr>
              <td width="200"><div class="liTitle">保全申请书</div></td>
              <td><FileShow :file-list="fileListOne" /></td>
            </tr>
            <tr>
              <td><div class="liTitle">起诉状</div></td>
              <td><FileShow :file-list="fileListTwo" /></td>
            </tr>
            <tr>
              <td><div class="liTitle">立案受理通知书</div></td>
              <td><FileShow :file-list="fileListThree" /></td>
            </tr>
            <tr>
              <td><div class="liTitle">身份证明材料(申请人)</div></td>
              <td><FileShow :file-list="fileListFour" /></td>
            </tr>
            <tr>
              <td><div class="liTitle">身份证明材料(被申请人)</div></td>
              <td><FileShow :file-list="fileListFive" /></td>
            </tr>
            <tr>
              <td><div class="liTitle">身份证明材料(原告代理人)</div></td>
              <td><FileShow :file-list="fileListSix" /></td>
            </tr>
            <tr>
              <td><div class="liTitle">证据材料</div></td>
              <td><FileShow :file-list="fileListSeven" /></td>
            </tr>
            <tr>
              <td><div class="liTitle">其它材料</div></td>
              <td><FileShow :file-list="fileListEight" /></td>
            </tr>
            <!-- 电子保函 -->
            <tr v-if="fileLIstNine.url">
              <!-- gFileUrl -->
              <td><div class="liTitle">电子保函</div></td>
              <td>
                <div class="fileShow">
                  <div class="item" @click="download(fileLIstNine.url)">
                    <div class="file">
                      <el-image v-if="fileClassify(fileLIstNine.url) === 'pic'" :src="getFullUrl(item.url)" fit="cover" />
                      <el-image v-else-if="fileClassify(fileLIstNine.url) === 'doc'" :src="doc" fit="fit" />
                      <el-image v-else-if="fileClassify(fileLIstNine.url) === 'xls'" :src="xls" fit="fit" />
                      <el-image v-else-if="fileClassify(fileLIstNine.url) === 'pdf'" :src="pdf" fit="fit" />
                    </div>
                    <div class="name">{{ fileLIstNine.fileName }}</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="fileLIstTen.url">
              <!-- 发票 -->
              <td><div class="liTitle">发票</div></td>
              <td>
                <div class="fileShow">
                  <div class="item" @click="download(fileLIstTen.url, '发票')">
                    <div class="file">
                      <el-image v-if="fileClassify(fileLIstTen.url) === 'pic'" :src="getFullUrl(item.url)" fit="cover" />
                      <el-image v-else-if="fileClassify(fileLIstTen.url) === 'doc'" :src="doc" fit="fit" />
                      <el-image v-else-if="fileClassify(fileLIstTen.url) === 'xls'" :src="xls" fit="fit" />
                      <el-image v-else-if="fileClassify(fileLIstTen.url) === 'pdf'" :src="pdf" fit="fit" />
                    </div>
                    <div class="name">{{ fileLIstTen.fileName }}</div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div v-if="isPreview === false" style="text-align: center; padding: 50px 0">
      <el-button @click="routerClose(`/guarantee/select/${updateId}`)"> 上一步 </el-button>
      <el-button type="primary" @click="submitForm">提交审核</el-button>
    </div>
  </div>
</template>
<script>
// api
import { guaranteeApi } from '@/api/guarantee'
import { fileApi } from '@/api/file'
import { approveApi } from '@/api/approve'
import { preserveApi } from '@/api/preserve.js'
// components
import Steps from './components/Steps'
import StepPre from './components/StepPre'
import BaseData from './components/BaseData'
import FileShow from '@/components/FileShow'
// data
// filter
// function
import { baseData, baseGain, applicantData, agentData, propertyData } from './modules/utils'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import Download from './mixin/Download'
// plugins
import { fileClassify } from 'abbott-methods/import'
// settings
export default {
  name: 'GuaranteePreview',
  components: { Steps, StepPre, BaseData, FileShow },
  mixins: [DetailMixin, MethodsMixin, Download],
  props: {
    isPreview: { type: Boolean, default: false },
    isPreserve: { type: Boolean, default: false }
  },
  data() {
    return {
      fileClassify,
      doc: require(`@/assets/image/fileType/word.png`),
      xls: require(`@/assets/image/fileType/excel.png`),
      pdf: require(`@/assets/image/fileType/PDF.png`),
      isUpdate: true,
      baseObj: {},
      baseData: [],
      ApplicantData: [],
      RespondentData: [],
      AgentData: [],
      PropertyData: [],
      fileListOne: [],
      fileListTwo: [],
      fileListThree: [],
      fileListFour: [],
      fileListFive: [],
      fileListSix: [],
      fileListSeven: [],
      fileListEight: [],
      fileLIstNine: [],
      fileLIstTen: []
    }
  },
  created() {},
  methods: {
    getDetail() {
      guaranteeApi.details(this.updateId).then(async ({ code, data, msg }) => {
        if (code === 200) {
          const { guaranteeBaseInfo, applicant, respondent, agent, assetClue } = data
          if (!this.isPreserve && guaranteeBaseInfo) {
            this.step = guaranteeBaseInfo.step ? guaranteeBaseInfo.step : 0
            this.baseObj = guaranteeBaseInfo
            this.baseData = baseData(guaranteeBaseInfo)
            this.getFile()
          } else {
            await this.getPreserveDetails()
          }
          this.ApplicantData = applicantData(applicant)
          this.RespondentData = applicantData(respondent)
          this.AgentData = agentData(agent)
          this.PropertyData = propertyData(assetClue)
        } else {
          this.$message.error(msg)
        }
      })
      this.getUpload()
    },
    async getPreserveDetails() {
      preserveApi.details(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          const { courtBaseInfo } = data
          this.baseObj = courtBaseInfo
          this.step = courtBaseInfo.step ? courtBaseInfo.step : 0
          this.baseData = baseGain(courtBaseInfo)
          this.getFile()
        } else {
          this.$message.error(msg)
        }
      })
    },
    getFile() {
      if (this.baseObj.gFileUrl) {
        this.fileLIstNine = { url: this.baseObj.gFileUrl, fileName: '电子保函' }
      }
      if (this.baseObj.billUrl) {
        this.fileLIstTen = { url: this.baseObj.billUrl, fileName: '发票' }
      }
    },
    // 获取列表
    getUpload() {
      fileApi.list(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.fileListOne = data['1'] || []
          this.fileListTwo = data['2'] || []
          this.fileListThree = data['3'] || []
          this.fileListFour = data['4'] || []
          this.fileListFive = data['5'] || []
          this.fileListSix = data['6'] || []
          this.fileListSeven = data['7'] || []
          this.fileListEight = data['8'] || []
        } else {
          this.$message.error(msg)
        }
      })
    },
    submitForm() {
      this.$confirm('审批后将不能再修改，确定继续审批吗？', '温馨提示', {
        type: 'warning'
      })
        .then(() => {
          this.approve()
        })
        .catch(() => {
          this.$message.info('取消审批')
        })
    },
    approve() {
      if (this.isPreserve) {
        // 保全提交审核
        approveApi.preserveApprove({ cId: this.updateId }).then(({ code, data, msg }) => {
          if (code === 200) {
            this.$message.success(msg)
            this.routerClose(`/preserve/audits/${this.updateId}`)
          } else {
            this.$message.error(msg)
          }
        })
      } else {
        // 担保提交审核
        approveApi.approve({ gId: this.updateId }).then(({ code, data, msg }) => {
          if (code === 200) {
            this.$message.success(msg)
            this.routerClose(`/guarantee/audit/${this.updateId}`)
          } else {
            this.message.error(msg)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('./styles/details.scss');
@import url('./styles/preview.scss');
.fileShow {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .item {
    height: 80px;
    width: 300px;
    display: flex;
    border: 1px solid #ddd;
    padding: 14px;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
    .file {
      margin-right: 10px;
      .el-image {
        width: 50px;
        height: 50px;
      }
    }
    .name {
      display: flex;
      align-items: center; /* 垂直居中 */
    }
  }
}
</style>
