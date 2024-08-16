<template>
  <div class="app-container">
    <Steps :step="0" />
    <div class="details">
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">基本资料</div>
          <a class="titleIcon" @click="DetailUpdate"><i class="el-icon-edit" />编辑</a>
        </div>
        <div class="boxContent">
          <BaseData :data-ary="baseData" />
        </div>
      </div>
      <!-- 申请人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">申请人（必填）</div>
          <a class="titleIcon" @click="ApplicantCreate()"><i class="el-icon-plus" />添加</a>
        </div>
        <div class="boxContent">
          <TableApp :data="tableData" @ApplicantDelete="ApplicantDelete" @ApplicantUpdate="ApplicantUpdate" />
        </div>
      </div>
      <!-- 被申请人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">被申请人（必填）</div>
          <a class="titleIcon" @click="RespondentCreate()"><i class="el-icon-plus" />添加</a>
        </div>
        <div class="boxContent">
          <TableRes :data="tableData" @RespondentDelete="RespondentDelete" @RespondentUpdate="RespondentUpdate" />
        </div>
      </div>
      <!-- 原告代理人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">原告代理人</div>
          <a class="titleIcon" @click="AgentCreate()"><i class="el-icon-plus" />添加</a>
        </div>
        <div class="boxContent">
          <TableAgent :data="tableData" @AgentDelete="AgentDelete" @AgentUpdate="AgentUpdate" />
        </div>
      </div>
      <!-- 财产线索 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">财产线索（必填）</div>
          <a class="titleIcon" @click="PropertyCreate()"><i class="el-icon-plus" />添加</a>
        </div>
        <div class="boxContent">
          <TablePro :data="tableData" @PropertyDelete="PropertyDelete" @PropertyUpdate="PropertyUpdate" />
        </div>
      </div>
    </div>
    <div style="text-align: center; padding: 50px 0">
      <el-button type="primary" @click="submitForm">保存，继续下一步</el-button>
    </div>
    <el-dialog v-if="DetailVisible" width="950px" :close-on-click-modal="false" title="基本资料" :visible.sync="DetailVisible" :before-close="DetailClosed">
      <Detail is-update :base-obj="baseObj" />
    </el-dialog>
    <el-dialog v-if="ApplicantVisible" width="950px" :close-on-click-modal="false" title="申请人" :visible.sync="ApplicantVisible">
      <Applicant :applicant="true" :is-update="ApplicantIsUpdate" />
    </el-dialog>
    <el-dialog v-if="RespondentVisible" width="950px" :close-on-click-modal="false" title="被申请人" :visible.sync="RespondentVisible">
      <Applicant :applicant="false" :is-update="RespondentIsUpdate" />
    </el-dialog>
    <el-dialog v-if="AgentVisible" width="950px" :close-on-click-modal="false" title="原告代理人" :visible.sync="AgentVisible">
      <Agent :is-update="AgentIsUpdate" />
    </el-dialog>
    <el-dialog v-if="PropertyVisible" width="950px" :close-on-click-modal="false" title="财产线索" :visible.sync="PropertyVisible">
      <Property :is-update="PropertyIsUpdate" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { guaranteeApi } from '@/api/guarantee'
// components
import Steps from './components/Steps'
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
import { baseData, fieldsReplace } from './utils'
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'GuaranteeDetails',
  components: { Steps, Detail, BaseData, Applicant, Agent, Property, TableApp, TableRes, TableAgent, TablePro },
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      isUpdate: true,
      // 基本资料
      DetailVisible: false,
      // 申请人
      ApplicantVisible: false,
      ApplicantIsUpdate: false,
      ApplicantId: 0,
      applicantData: [],
      // 被申请人
      RespondentVisible: false,
      RespondentIsUpdate: false,
      RespondentId: 0,
      // 原告代理人
      AgentVisible: false,
      AgentIsUpdate: false,
      AgentId: 0,
      // 财产线索
      PropertyVisible: false,
      PropertyIsUpdate: false,
      PropertyId: 0,
      // 基本资料
      baseData: [],
      baseObj: {},
      tableData: []
    }
  },
  created() {},
  methods: {
    getDetail() {
      guaranteeApi.details(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          const { guaranteeBaseInfo, applicant } = data
          this.baseObj = fieldsReplace(guaranteeBaseInfo)
          this.baseData = baseData(guaranteeBaseInfo)
          this.applicantData = applicant
        } else {
          this.$message.error(msg)
        }
      })
    },
    submitForm() {
      this.$router.push({
        path: `/guarantee/upload/1`
      })
    },
    // 基本资料
    DetailUpdate() {
      this.DetailVisible = true
    },
    DetailClosed() {
      this.DetailVisible = false
    },
    // 申请人
    ApplicantCreate() {
      this.ApplicantVisible = true
      this.ApplicantIsUpdate = false
      this.Applicant = 0
    },
    ApplicantUpdate(id) {
      this.ApplicantVisible = true
      this.ApplicantIsUpdate = true
      this.ApplicantId = id
    },
    ApplicantDelete(data) {},
    ApplicantClosed() {
      this.ApplicantVisible = false
    },
    // 被申请人
    RespondentCreate() {
      this.RespondentVisible = true
      this.RespondentIsUpdate = false
      this.RespondentId = 0
    },
    RespondentUpdate(id) {
      this.RespondentVisible = true
      this.RespondentIsUpdate = true
      this.RespondentId = id
    },
    RespondentDelete(id) {},
    // 原告代理人
    AgentCreate() {
      this.AgentVisible = true
      this.AgentIsUpdate = false
      this.AgentId = 0
    },
    AgentUpdate(id) {
      this.AgentVisible = true
      this.AgentIsUpdate = true
      this.AgentId = id
    },
    AgentDelete(id) {},
    // 财产线索
    PropertyCreate() {
      this.PropertyVisible = true
      this.PropertyIsUpdate = false
      this.PropertyId = 0
    },
    PropertyUpdate(id) {
      this.PropertyVisible = true
      this.PropertyIsUpdate = true
      this.PropertyId = id
    },
    PropertyDelete(id) {}
  }
}
</script>
<style lang="scss" scoped>
@import url('./styles/details.scss');
</style>
