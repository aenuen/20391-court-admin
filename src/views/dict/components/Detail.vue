<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="formRules">
      <el-row>
        <el-col>
          <el-form-item prop="parentId" :label="fields.parentId" :label-width="labelWidth">
            {{ postForm.parentId }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="name" :label="fields.name" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="fields.name" :style="{ width: commonWidth }" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="dictKey" :label="fields.dictKey" :label-width="labelWidth">
            <el-input v-model="postForm.dictKey" :placeholder="fields.dictKey" :style="{ width: commonWidth }" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="dictValue" :label="fields.dictValue" :label-width="labelWidth">
            <el-input v-model="postForm.dictValue" :disabled="isUpdate" :placeholder="fields.dictValue" :style="{ width: commonWidth }" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="sort" :label="fields.sort" :label-width="labelWidth">
            <el-input v-model="postForm.sort" :placeholder="fields.sort" :style="{ width: commonWidth }" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="description" :label="fields.description" :label-width="labelWidth">
            <el-input v-model="postForm.description" type="textarea" :placeholder="fields.description" :rows="4" resize="none" :style="{ width: commonWidth }" />
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
import { dictApi } from '@/api/dict'
// components
// data
import { fields } from '../modules/fields'
import { detailRules as formRules } from '../modules/rules'
// filter
// function
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'DictDetail',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  props: {
    isUpdate: { type: Boolean, default: false },
    updateNo: { type: Object, default: () => {} },
    parentId: { type: Number, default: 0 }
  },
  data() {
    return {
      fields,
      formRules,
      commonWidth: '500px'
    }
  },
  computed: {
    submitTxt() {
      return this.isUpdate ? '编辑' : '添加'
    }
  },
  created() {
    this.postForm = {
      ...this.postForm,
      ...{ parentId: this.parentId }
    }
    if (this.isUpdate) {
      this.postForm = { ...this.postForm, ...this.updateNo }
    }
  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        if (valid) {
          this.submitLoadingOpen()
          const newPostForm = {
            ...{ parentId: this.parentId },
            ...this.postForm
          }
          if (this.isUpdate) {
            dictApi
              .update(newPostForm)
              .then(({ code, msg }) => {
                if (code === 200) {
                  this.$message.success(msg)
                  this.$emit('onUpdateSuccess')
                } else {
                  this.$message.error(msg)
                }
                this.submitLoadingClose()
              })
              .catch(() => {
                this.submitLoadingClose()
              })
          } else {
            dictApi
              .create(newPostForm)
              .then(({ code, msg }) => {
                if (code === 200) {
                  this.$message.success(msg)
                  this.$emit('onCreateSuccess')
                } else {
                  this.$message.error(msg)
                }
                this.submitLoadingClose()
              })
              .catch(() => {
                this.submitLoadingClose()
              })
          }
        } else {
          this.validateErrHandle(fields)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
