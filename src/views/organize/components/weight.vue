<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="weight" label="排序" :label-width="labelWidth">
            <el-input v-model="postForm.weight" placeholder="排序" />
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
import { organizeApi } from '@/api/organize.js'
// components
// data
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'OrganizeWeight',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  props: {
    orgId: { type: String, default: '' },
    weight: { type: Number, default: 0 }
  },
  data() {
    return {
      submitTxt: '修改'
    }
  },
  created() {
    this.postForm = { weight: this.weight, orgId: this.orgId }
    console.log('🚀 ~ created ~ this.postForm', this.postForm)
  },
  methods: {
    submitForm() {
      organizeApi.set({ orgId: this.orgId, weight: this.postForm.weight }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.$emit('weightSuccess')
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
