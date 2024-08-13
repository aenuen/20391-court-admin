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
// plugins
// settings
export default {
  name: '',
  components: {},
  mixins: [],
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
