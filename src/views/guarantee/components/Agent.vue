<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm">
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="accuser" :label="fields.accuser" :label-width="labelWidth">
            <el-select v-model="postForm.accuser" :placeholder="fields.accuser" :style="{ width: commonWidth }">
              <el-option v-for="(item, key) in accuserAry" :key="key" :value="String(item.value)" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="agentType" :label="fields.agentType" :label-width="labelWidth">
            <el-select v-model="postForm.agentType" :placeholder="fields.agentType" :style="{ width: commonWidth }">
              <el-option v-for="(item, key) in agentTypeAry" :key="key" :value="String(item.value)" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="agent" :label="fields.agent" :label-width="labelWidth">
            <el-input v-model="postForm.agent" :placeholder="fields.agent" maxlength="10" :style="{ width: commonWidth }" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="sex" :label="fields.sex" :label-width="labelWidth">
            <el-radio v-model="postForm.sex" :label="1">男性</el-radio>
            <el-radio v-model="postForm.sex" :label="2">女性</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="idType" :label="fields.idType" :label-width="labelWidth">
            <el-select v-model="postForm.idType" :placeholder="fields.idType" :style="{ width: commonWidth }">
              <el-option v-for="(item, key) in idTypeAry" :key="key" :value="String(item.value)" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="idNumber" :label="fields.idNumber" :label-width="labelWidth">
            <el-input v-model="postForm.idNumber" :placeholder="fields.idNumber" maxlength="18" :style="{ width: commonWidth }" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="license" :label="fields.license" :label-width="labelWidth">
            <el-input v-model="postForm.license" :placeholder="fields.license" maxlength="18" :style="{ width: commonWidth }" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item :label-width="labelWidth">
            <el-button type="primary" @click="submitForm">{{ submitTxt }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// api
// components
// data
import { AgentFields as fields } from '../modules/fields'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'GuaranteeAgent',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  props: {
    isUpdate: { type: Boolean, default: false } // true为编辑模式，false为添加模式
  },
  data() {
    return {
      fields,
      commonWidth: '500px',
      accuserAry: [],
      agentTypeAry: [{ label: '执业律师', value: '' }],
      idTypeAry: []
    }
  },
  computed: {
    submitTxt() {
      return '原告代理人' + (this.isUpdate ? '编辑' : '添加')
    }
  },
  created() {},
  methods: {
    submitForm() {}
  }
}
</script>
<style lang="scss" scoped></style>
