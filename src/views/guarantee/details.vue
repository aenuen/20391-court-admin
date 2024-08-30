<template>
  <div class="app-container">
    <StepPre v-if="isPreserve" :step="0" />
    <Steps v-else :step="0" />
    <div class="details">
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">基本资料</div>
          <a class="titleIcon" @click="DetailUpdate"> <i class="el-icon-edit" />编辑 </a>
        </div>
        <div class="boxContent">
          <BaseData :data-ary="baseData" />
        </div>
      </div>
      <!-- 申请人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">申请人（必填）</div>
          <a class="titleIcon" @click="ApplicantCreate()"> <i class="el-icon-plus" />添加 </a>
        </div>
        <div class="boxContent">
          <TableApp :data="ApplicantData" @ApplicantDelete="ApplicantDelete" @ApplicantUpdate="ApplicantUpdate" />
        </div>
      </div>
      <!-- 被申请人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">被申请人（必填）</div>
          <a class="titleIcon" @click="RespondentCreate()"> <i class="el-icon-plus" />添加 </a>
        </div>
        <div class="boxContent">
          <TableRes :data="RespondentData" @RespondentDelete="RespondentDelete" @RespondentUpdate="RespondentUpdate" />
        </div>
      </div>
      <!-- 原告代理人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">原告代理人</div>
          <a class="titleIcon" @click="AgentCreate()"> <i class="el-icon-plus" />添加 </a>
        </div>
        <div class="boxContent">
          <TableAgent :data="AgentData" @AgentDelete="AgentDelete" @AgentUpdate="AgentUpdate" />
        </div>
      </div>
      <!-- 财产线索 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">财产线索（必填）</div>
          <a class="titleIcon" @click="PropertyCreate()"> <i class="el-icon-plus" />添加 </a>
        </div>
        <div class="boxContent">
          <TablePro :data="PropertyData" @PropertyDelete="PropertyDelete" @PropertyUpdate="PropertyUpdate" />
        </div>
      </div>
    </div>
    <div style="text-align: center; padding: 50px 0">
      <el-button type="primary" @click="submitForm">保存，继续下一步</el-button>
    </div>
    <!-- 基本资料 -->
    <el-dialog v-if="DetailVisible" width="950px" :close-on-click-modal="false" title="基本资料" :visible.sync="DetailVisible" :before-close="DetailClosed">
      <Detail is-update :base-obj="baseObj" @onDetailSuccess="DetailSuccess" />
    </el-dialog>
    <!-- 申请人 -->
    <el-dialog v-if="ApplicantVisible" width="950px" :close-on-click-modal="false" title="申请人" :visible.sync="ApplicantVisible">
      <Applicant :id="updateId" :applicant-id="ApplicantId" :applicant="true" :is-update="ApplicantIsUpdate" @ApplicantCreateSuccess="ApplicantCreateSuccess" @ApplicantUpdateSuccess="ApplicantUpdateSuccess" />
    </el-dialog>
    <!-- 被申请人 -->
    <el-dialog v-if="RespondentVisible" width="950px" :close-on-click-modal="false" title="被申请人" :visible.sync="RespondentVisible">
      <Applicant :id="updateId" :respondent-id="RespondentId" :applicant="false" :is-update="RespondentIsUpdate" @RespondentCreateSuccess="RespondentCreateSuccess" @RespondentUpdateSuccess="RespondentUpdateSuccess" />
    </el-dialog>
    <!-- 原告代理人 -->
    <el-dialog v-if="AgentVisible" width="950px" :close-on-click-modal="false" title="原告代理人" :visible.sync="AgentVisible">
      <Agent :id="updateId" :is-update="AgentIsUpdate" :agent-id="AgentId" @AgentCreateSuccess="AgentCreateSuccess" @AgentUpdateSuccess="AgentUpdateSuccess" />
    </el-dialog>
    <!-- 财产线索 -->
    <el-dialog v-if="PropertyVisible" width="950px" :close-on-click-modal="false" title="财产线索" :visible.sync="PropertyVisible">
      <Property :id="updateId" :is-update="PropertyIsUpdate" :clue-id="PropertyId" @PropertyCreateSuccess="PropertyCreateSuccess" @PropertyUpdateSuccess="PropertyUpdateSuccess" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { guaranteeApi } from '@/api/guarantee'
import { applicantApi } from '@/api/applicant'
import { respondentApi } from '@/api/respondent'
import { agentApi } from '@/api/agent'
import { propertyApi } from '@/api/property'
import { preserveApi } from '@/api/preserve.js'
// components
import Steps from './components/Steps'
import StepPre from './components/StepPre'
import Detail from './components/Detail'
import BaseData from './components/BaseData'
import Applicant from './components/Applicant'
import Agent from './components/Agent'
import Property from './components/Property'
import TableApp from './components/TableApp'
import TableRes from './components/TableRes'
import TableAgent from './components/TableAgent'
import TablePro from './components/TablePro'
// data
// filter
// function
import { baseData, baseGain } from './modules/utils'
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'GuaranteeDetails',
  components: {
    Steps,
    StepPre,
    Detail,
    BaseData,
    Applicant,
    Agent,
    Property,
    TableApp,
    TableRes,
    TableAgent,
    TablePro
  },
  mixins: [DetailMixin, MethodsMixin],
  props: {
    isPreserve: { type: Boolean, default: false }
  },
  data() {
    return {
      isUpdate: true,
      // 基本资料
      DetailVisible: false,
      // 申请人
      ApplicantVisible: false,
      ApplicantIsUpdate: false,
      ApplicantId: '',
      ApplicantData: [],
      // 被申请人
      RespondentVisible: false,
      RespondentIsUpdate: false,
      RespondentId: '',
      RespondentData: [],
      // 原告代理人
      AgentVisible: false,
      AgentIsUpdate: false,
      AgentId: '',
      AgentData: [],
      // 财产线索
      PropertyVisible: false,
      PropertyIsUpdate: false,
      PropertyId: '',
      PropertyData: [],
      // 基本资料
      baseData: [],
      baseObj: {},
      tableData: [],
      // 步聚
      step: 0
    }
  },
  created() {},
  methods: {
    getDetail() {
      guaranteeApi.details(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          const { guaranteeBaseInfo, applicant, respondent, agent, assetClue } = data
          if (!this.isPreserve && guaranteeBaseInfo) {
            this.baseObj = guaranteeBaseInfo
            this.step = guaranteeBaseInfo.step ? guaranteeBaseInfo.step : 0
            this.baseData = baseData(guaranteeBaseInfo)
          } else {
            this.getPreserveDetails()
          }
          this.ApplicantData = applicant
          this.RespondentData = respondent
          this.AgentData = agent
          this.PropertyData = assetClue
        } else {
          this.$message.error(msg)
        }
      })
    },
    getPreserveDetails() {
      preserveApi.details(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          const { courtBaseInfo } = data
          console.log('🚀 ~ preserveApi.details ~ baseInfo', courtBaseInfo)
          this.baseObj = courtBaseInfo
          this.step = courtBaseInfo.step ? courtBaseInfo.step : 0
          this.baseData = baseGain(courtBaseInfo)
        } else {
          this.$message.error(msg)
        }
      })
    },
    applicantList() {
      applicantApi.list(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.ApplicantData = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    respondentList() {
      respondentApi.list(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.RespondentData = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    agentList() {
      agentApi.list(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.AgentData = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    propertyList() {
      propertyApi.list(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.PropertyData = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    submitForm() {
      if (+this.step === -1) {
        if (this.isPreserve) {
          this.routerClose(`/preserve/upload/${this.updateId}`)
        } else {
          this.routerClose(`/guarantee/upload/${this.updateId}`)
        }
      } else {
        if (this.isPreserve) {
          preserveApi.step({ cId: this.updateId, step: 2 }).then(({ code, data, msg }) => {
            if (code === 200) {
              this.routerClose('/preserve/upload/' + this.updateId)
            } else {
              this.$message.error(msg)
            }
          })
        } else {
          guaranteeApi.step({ gId: this.updateId, step: 2 }).then(({ code, data, msg }) => {
            if (code === 200) {
              this.routerClose(`/guarantee/upload/${this.updateId}`)
            } else {
              this.$message.error(msg)
            }
          })
        }
      }
    },
    // 基本资料
    DetailUpdate() {
      this.DetailVisible = true
    },
    DetailClosed() {
      this.DetailVisible = false
    },
    DetailSuccess() {
      this.DetailVisible = false
      this.getDetail()
    },
    // 申请人
    ApplicantCreate() {
      this.ApplicantVisible = true
      this.ApplicantIsUpdate = false
    },
    ApplicantCreateSuccess() {
      this.ApplicantVisible = false
      this.ApplicantIsUpdate = false
      this.applicantList()
    },
    ApplicantUpdate(id) {
      this.ApplicantVisible = true
      this.ApplicantIsUpdate = true
      this.ApplicantId = id
    },
    ApplicantUpdateSuccess() {
      this.ApplicantVisible = false
      this.ApplicantIsUpdate = false
      this.ApplicantId = ''
      this.applicantList()
    },
    ApplicantDelete(applyId) {
      applicantApi.remove(applyId).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.applicantList()
        } else {
          this.$message.error(msg)
        }
      })
    },
    ApplicantClosed() {
      this.ApplicantVisible = false
    },
    // 被申请人
    RespondentCreate() {
      this.RespondentVisible = true
      this.RespondentIsUpdate = false
    },
    RespondentCreateSuccess() {
      this.RespondentVisible = false
      this.RespondentIsUpdate = false
      this.respondentList()
    },
    RespondentUpdate(id) {
      this.RespondentVisible = true
      this.RespondentIsUpdate = true
      this.RespondentId = id
    },
    RespondentUpdateSuccess() {
      this.RespondentVisible = false
      this.RespondentIsUpdate = false
      this.RespondentId = ''
      this.respondentList()
    },
    RespondentDelete(applyId) {
      respondentApi.remove(applyId).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.respondentList()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 原告代理人
    AgentCreate() {
      this.AgentVisible = true
      this.AgentIsUpdate = false
    },
    AgentCreateSuccess() {
      this.AgentVisible = false
      this.AgentIsUpdate = false
      this.agentList()
    },
    AgentUpdate(id) {
      this.AgentVisible = true
      this.AgentIsUpdate = true
      this.AgentId = id
    },
    AgentUpdateSuccess() {
      this.AgentVisible = false
      this.AgentIsUpdate = false
      this.AgentId = ''
      this.agentList()
    },
    AgentDelete(agentId) {
      agentApi.remove(agentId).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.agentList()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 财产线索
    PropertyCreate() {
      this.PropertyVisible = true
      this.PropertyIsUpdate = false
    },
    PropertyCreateSuccess() {
      this.PropertyVisible = false
      this.PropertyIsUpdate = false
      this.propertyList()
    },
    PropertyUpdate(id) {
      this.PropertyVisible = true
      this.PropertyIsUpdate = true
      this.PropertyId = id
    },
    PropertyUpdateSuccess() {
      this.PropertyVisible = false
      this.PropertyIsUpdate = false
      this.PropertyId = ''
      this.propertyList()
    },
    PropertyDelete(clueId) {
      propertyApi.remove(clueId).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.propertyList()
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
</style>
