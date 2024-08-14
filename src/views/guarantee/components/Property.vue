<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm">
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="amount" :label="fields.amount" :label-width="labelWidth">
            <el-input v-model="postForm.amount" :placeholder="fields.amount" maxlength="10" :style="{ width: commonWidth }" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="type" :label="fields.type" :label-width="labelWidth">
            <el-select v-model="postForm.type" :placeholder="fields.type" :style="{ width: commonWidth }">
              <el-option v-for="(item, key) in typeAry" :key="key" :value="String(item.value)" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="amount" :label="fields.amount" :label-width="labelWidth">
            <el-input v-model="postForm.amount" type="textarea" :placeholder="fields.amount" maxlength="10" :rows="3" resize="none" :style="{ width: commonWidth }" />
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
import { PropertyFields as fields } from '../modules/fields'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: '',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  props: {
    isUpdate: { type: Boolean, default: false } // true为编辑模式，false为添加模式
  },
  data() {
    return {
      fields,
      commonWidth: '500px',
      typeAry: []
    }
  },
  computed: {
    submitTxt() {
      return '财产线索' + (this.isUpdate ? '编辑' : '添加')
    }
  },
  created() {},
  methods: {
    submitForm() {}
  }
}
</script>
<style lang="scss" scoped></style>
