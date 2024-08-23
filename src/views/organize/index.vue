<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <!-- 法院 -->
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="name" :label="fields.name" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="fields.name" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="type" :label="fields.type" :label-width="labelWidth">
            <el-input v-model="postForm.type" :placeholder="fields.type" clearable style="width: 100%" />
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
import { fields } from './modules/fields'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'OrganizeIndex',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      fields
    }
  },
  created() {},
  methods: {
    startHandle() {
      this.submitTxt = '信息' + (this.isUpdate ? '编辑' : '提交')
    }
  }
}
</script>
<style lang="scss" scoped></style>
