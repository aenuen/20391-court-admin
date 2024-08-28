<template>
  <div>
    <div class="notice">
      <div><b>为方便当事人、代理人（以下统称申请人）便捷、高效、合理使用网上保全系统，请您在申请保全之前认真阅读以下须知：</b></div>
      <div><span class="space">第一条</span>我们通过网上保全系统接收您提交的保全申请书及相关材料。网上申请保全应当遵循诚实信用原则，申请人应对上传材料的合法性、真实性负责。</div>
      <div><span class="space">第二条</span>当事人申请财产保全错误造成案外人损失的，应当依法承担赔偿责任。</div>
      <div><span class="space">第三条</span>申请保全的条件：</div>
      <ul>
        <li>1、必须具有给付内容;</li>
        <li>2、必须是利害关系人因情况紧急，不立即申请财产保全将会使其合法权益受到难予弥补的损失;有可能使将来的裁判不能执行或者难以执行的情形;</li>
        <li>3、申请人应当提供相应价值的担保。诉讼财产保全申请中，若被申请人财产信息不明的，申请人在保全申请时，须一并提交财产查控申请书。</li>
      </ul>
      <div><span class="space">第四条</span>申请诉讼保全时，必须填写正确的案号、案由、案件类型。如果诉讼案号填写错误，将无法办理诉讼保全申请。</div>
      <div><span class="space">第五条</span>申请时必须提交的材料 ：</div>
      <ul>
        <li>1、非诉保全申请应记明下列事项：</li>
        <ul>
          <li>（1）申请人的姓名、性别、年龄、民族、职业、工作单位和住所;法人或者其他组织的名称、住所和法定代表人或者主要负责人的姓名、职务;</li>
          <li>（2）申请请求和所根据的事实理由;</li>
          <li>（3）请求保全的标的物或者有关财产的种类、数量、价额及所在地。</li>
        </ul>
        <li>2、起诉书申请人需提供申请保全的起诉书，说明保全原由、经过及被保全人基本信息。</li>
        <li>3、立案受理通知书 诉讼保全申请时，需提交诉讼案件在法院的立案受理通知书。</li>
        <li>4、身份证明：</li>
        <ul>
          <li>（1）申请人系公民的，应提交身份证;</li>
          <li>（2）申请人系法人或其他组织的，应提交法人营业执照、组织机构代码本和法定代表人身份证明;</li>
          <li>（3）委托代理人代为起诉的，除提交上述身份证明外，还必须同时提交授权委托书。</li>
        </ul>
        <li>5、担保</li>
        <ul>
          <li>（1）现金或者有价证券担保，担保物的价值与保全财物的价额要相当，担保价值应等于或大于所要保全的财产价值;</li>
          <li>（2）必须提交担保财产权利证书复印件。</li>
          <li>（3）网上保全系统支持使用诉讼财产保全责任险作担保。目前已开通中国人民保险的网上担保申请业务。</li>
        </ul>
        <li>6、证据提供与保全申请案件相关的有效证据。</li>
        <li>7、其他材料，即与保全申请相关或法院要求的其他材料。</li>
      </ul>
      <div><span class="space">第六条</span>申请人在人民法院申请诉前保全，采取保全措施后30日内应该依法向法院提起诉讼，否则，诉前保全到期后人民法院将依法予以解除</div>
      <div><span class="space">第七条</span>对财产保全担保，人民法院经审查，认为违反物权法、担保法、公司法等有关法律禁止性规定的，应当责令保全申请人在指定期限内提供其他担保;逾期未提供的，裁定驳回申请。</div>
      <div><span class="space">第八条</span>财产保全期间，申请保全人提供的担保不足以赔偿可能给被保全人造成的损失的，人民法院可以责令其追加相应的担保;拒不追加的，可以裁定解除或部分解除保全</div>
      <div><span class="space">第九条</span>申请人保全申请续行财产保全的，应当在保全期限届满七日前向人民法院提出;逾期申请或者不申请续保的，申请人自行承担保全到期自动解除的法律后果。</div>
      <div><span class="space">第十条</span>变更担保信息的，申请人要在变更担保申请中明确变更原因及变更后的财产信息。法官审核通过后，可变更担保。</div>
      <div><span class="space">第十一条</span>如需提前解除保全的，申请人可在保全到期前30天以内提交解除保全申请书，明确解除保全原因。法官审核通过后，可解除保全。</div>
      <div><span class="space">第十二条</span>网上保全系统不支持诉讼费用的减、免、缓申请业务。</div>
      <div><span class="space">第十三条</span>网上保全系统仅支持线上交纳保全费用。若申请人不能线上交费，可直接到法院办理申请保全业务。</div>
      <div><span class="space">第十四条</span>网上保全系统提供网上保全申请，法官审核通过后，申请人须在指定时间内携带相关材料前往法院做面谈笔录。确认无误后，交纳保全费用，法官予以裁。</div>
    </div>
    <div class="buttonWrap">
      <el-button type="primary" @click="IAgree">我同意此需知</el-button>
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
  name: 'PreserveNotice',
  components: {},
  mixins: [],
  data() {
    return {}
  },
  created() {},
  methods: {
    IAgree() {
      this.$emit('IAgree')
    }
  }
}
</script>
<style lang="scss" scoped>
.buttonWrap {
  border-top: 1px solid #eee;
  padding: 10px 15px;
  margin-top: 10px;
  text-align: center;
}
.notice {
  width: 800px;
  height: 500px;
  overflow-x: hidden;
  font-size: 14px;
  line-height: 30px;
  color: #333;
  text-align: left;
  border-top: 1px solid #eee;
  div {
    margin-top: 15px;
    text-indent: 2em;
    span {
      font-weight: bold;
      padding-right: 1em;
    }
  }
  ul {
    margin-left: 1em;
  }
}
</style>
