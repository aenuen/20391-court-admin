<template>
  <div class="app-container">
    <div class="itemBox">
      <div class="boxTitle">
        <div class="titleName">基本资料</div>
        <a class="titleIcon"><i class="el-icon-edit" />编辑</a>
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
        <a class="titleIcon"><i class="el-icon-edit" />添加</a>
      </div>
      <div class="boxContent">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="申请人名称"> </el-table-column>
          <el-table-column prop="country" label="国别"> </el-table-column>
          <el-table-column prop="type" label="证件类型"> </el-table-column>
          <el-table-column prop="number" label="证件号码"> </el-table-column>
          <el-table-column prop="mobile" label="手机号码"> </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 被申请人 -->
    <div class="itemBox">
      <div class="boxTitle">
        <div class="titleName">被申请人（必填）</div>
        <a class="titleIcon"><i class="el-icon-edit" />添加</a>
      </div>
      <div class="boxContent">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="申请人名称"> </el-table-column>
          <el-table-column prop="country" label="国别"> </el-table-column>
          <el-table-column prop="type" label="证件类型"> </el-table-column>
          <el-table-column prop="number" label="证件号码"> </el-table-column>
          <el-table-column prop="mobile" label="手机号码"> </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 原告代理人 -->
    <div class="itemBox">
      <div class="boxTitle">
        <div class="titleName">原告代理人</div>
        <a class="titleIcon"><i class="el-icon-edit" />添加</a>
      </div>
      <div class="boxContent"></div>
    </div>
    <!-- 财产线索 -->
    <div class="itemBox">
      <div class="boxTitle">
        <div class="titleName">财产线索（必填）</div>
        <a class="titleIcon"><i class="el-icon-edit" />添加</a>
      </div>
      <div class="boxContent"></div>
    </div>
  </div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
// settings
export default {
  name: 'GuaranteeDetail',
  components: {},
  mixin: [],
  data() {
    return {
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
          name: '王小虎',
          country: '中国',
          type: '身份证',
          number: '35010101010101',
          mobile: '13055297758'
        },
        {
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
  methods: {}
}
</script>
<style lang="scss" scoped>
.app-container {
  padding: 20px 50px 50px;
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.itemBox {
  width: 100%;
  font-size: 14px;
  .boxTitle {
    height: 45px;
    border-bottom: 1px solid #f5f5f5;
    padding: 15px 0;
    display: flex;
    .titleName {
      width: 180px;
      height: 25px;
      line-height: 25px;
      border-left: 8px solid #1890ff;
      text-indent: 22px;
      font-weight: bold;
    }
    .titleIcon {
      display: block;
      height: 25px;
      line-height: 25px;
      margin-left: 50px;
      color: #1189ff;
    }
  }
  .boxContent {
    padding: 30px;
    width: 100%;
    .details {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 25%;
        display: flex;
        b,
        i,
        u {
          display: block;
          text-decoration: none;
          font-weight: normal;
          font-style: normal;
          height: 35px;
          line-height: 35px;
          color: #666;
        }
        b {
          width: 100px;
          text-align: right;
        }
      }
    }
  }
}
</style>
