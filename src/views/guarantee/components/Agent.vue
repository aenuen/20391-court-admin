<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm">
      <el-row>
        <el-col>
          <el-form-item prop="accuser" :label="fields.accuser" :label-width="labelWidth"> </el-form-item>
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
// plugins
// settings
export default {
  name: '',
  components: {},
  mixins: [DetailMixin],
  data() {
    return {
      fields
    }
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
