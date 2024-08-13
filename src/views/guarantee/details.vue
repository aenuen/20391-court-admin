<template>
  <div class="app-container">
    <Steps :step="0" />
    <div class="details">
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">基本资料</div>
          <a class="titleIcon" @click="DetailVisible = true"><i class="el-icon-edit" />编辑</a>
        </div>
        <div class="boxContent">
          <ul class="details">
            <li v-for="(item, index) in details" :key="index">
              <b>{{ item.label }}</b>
              <u>：</u>
              <i>{{ item.value }}</i>
            </li>
          </ul>
        </div>
      </div>
      <!-- 申请人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">申请人（必填）</div>
          <a class="titleIcon" @click="ApplicantCreate()"><i class="el-icon-plus" />添加</a>
        </div>
        <div class="boxContent">
          <TableApp :data="tableData" @ApplicantDelete="ApplicantDelete" />
        </div>
      </div>
      <!-- 被申请人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">被申请人（必填）</div>
          <a class="titleIcon" @click="RespondentCreate()"><i class="el-icon-plus" />添加</a>
        </div>
        <div class="boxContent">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
            <el-table-column prop="name" label="申请人名称"> </el-table-column>
            <el-table-column prop="country" label="国别"> </el-table-column>
            <el-table-column prop="type" label="证件类型"> </el-table-column>
            <el-table-column prop="number" label="证件号码"> </el-table-column>
            <el-table-column prop="mobile" label="手机号码"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="RespondentUpdate(3)">编辑</el-button>
                <el-button size="mini" type="warning" icon="el-icon-delete" @click="RespondentDelete(4)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 原告代理人 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">原告代理人</div>
          <a class="titleIcon" @click="AgentCreate()"><i class="el-icon-plus" />添加</a>
        </div>
        <div class="boxContent">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
            <el-table-column prop="name" label="所属原告"> </el-table-column>
            <el-table-column prop="country" label="代理人姓名"> </el-table-column>
            <el-table-column prop="type" label="证件类型"> </el-table-column>
            <el-table-column prop="number" label="证件号码"> </el-table-column>
            <el-table-column prop="mobile" label="手机号码"> </el-table-column>
            <el-table-column label="操作" align="center">
              <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button size="mini" type="warning" icon="el-icon-delete">删除</el-button>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 财产线索 -->
      <div class="itemBox">
        <div class="boxTitle">
          <div class="titleName">财产线索（必填）</div>
          <a class="titleIcon" @click="PropertyCreate()"><i class="el-icon-plus" />添加</a>
        </div>
        <div class="boxContent">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
            <el-table-column prop="name" label="财产金额"> </el-table-column>
            <el-table-column prop="country" label="财产类型"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size="mini" type="warning" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog width="950px" :close-on-click-modal="false" title="基本资料" :visible.sync="DetailVisible">
      <Detail is-update />
    </el-dialog>
    <el-dialog width="950px" :close-on-click-modal="false" title="申请人" :visible.sync="ApplicantVisible">
      <Applicant :applicant="true" :is-update="ApplicantIsUpdate" />
    </el-dialog>
    <el-dialog width="950px" :close-on-click-modal="false" title="被申请人" :visible.sync="RespondentVisible">
      <Applicant :applicant="false" :is-update="RespondentIsUpdate" />
    </el-dialog>
    <el-dialog width="950px" :close-on-click-modal="false" title="原告代理人" :visible.sync="AgentVisible">
      <Agent :is-update="AgentIsUpdate" />
    </el-dialog>
    <el-dialog width="950px" :close-on-click-modal="false" title="财产线索" :visible.sync="PropertyVisible">
      <Property :is-update="PropertyIsUpdate" />
    </el-dialog>
  </div>
</template>
<script>
// api
// components
import Steps from './components/Steps'
import Detail from './components/Detail'
import Applicant from './components/Applicant'
import Agent from './components/Agent'
import Property from './components/Property'
import TableApp from './components/TableApp'
// data
// filter
// function
// mixins
// plugins
// settings
export default {
  name: 'GuaranteeDetails',
  components: { Steps, Detail, Applicant, Agent, Property, TableApp },
  mixins: [],
  data() {
    return {
      DetailVisible: false, // 基本资料
      // 申请人
      ApplicantVisible: false,
      ApplicantIsUpdate: false,
      ApplicantId: 0,
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
      details: [
        { label: '申请法院', value: '鼓楼区人民法院' },
        { label: '保全类别', value: '诉前保全' },
        { label: '非诉期间', value: '未起诉或提起仲裁前' },
        { label: '申请保全额', value: '3000.00' },
        { label: '建议保全费', value: '3000.00' },
        { label: '提交人', value: '黄靖' },
        { label: '提交人身份', value: '律师' },
        { label: '提交时间', value: '2021-08-07' }
      ],
      tableData: [
        {
          class: '自然人',
          name: '王小虎',
          country: '中国',
          type: '身份证',
          number: '35010101010101',
          mobile: '13055297758'
        },
        {
          class: '非法人组织',
          name: '华润万象科技有限公司',
          country: '中国',
          type: '营业执照',
          number: '8955652354',
          mobile: '15866998856'
        }
      ]
    }
  },
  created() {},
  methods: {
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
    ApplicantDelete(data) {
      console.log(data)
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
