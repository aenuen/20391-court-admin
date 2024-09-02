<template>
  <div class="app-container">
    <el-card shadow="hover">
      <div class="header">
        <div class="info">
          <div>{{ data.name }}</div>
          <div>
            <el-button type="primary" style="margin-top: 20px" @click="resetUpdate">重新认证</el-button>
          </div>
        </div>
        <div class="icon">
          <span class="dot">
            <svg-icon icon-class="attestation" style="color: #1890ff" />
          </span>
          <span class="txt">{{ +data.courtStatus === 1 ? '已认证' : '未认证' }}</span>
        </div>
      </div>
    </el-card>
    <el-card shadow="hover" class="mt20">
      <div class="item">
        <div class="title">机构信息</div>
        <div class="lines">
          <el-row>
            <el-col :span="6">
              <div class="line head">
                <div class="key">{{ fields.courtName }}</div>
                <div class="value">{{ data.courtName }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="line">
                <div class="key">{{ fields.courtCode }}</div>
                <div class="value">{{ data.courtCode }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="line">
                <div class="key">{{ fields.courtCharge }}</div>
                <div class="value">{{ data.courtCharge }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="line foot">
                <div class="key">{{ fields.telephone }}</div>
                <div class="value">{{ data.telephone }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="l"></div>
        <div class="lines">
          <el-row>
            <el-col :span="24">
              <div class="line foot" style="padding-left: 20px">
                <div class="key">{{ fields.courtAddress }}</div>
                <div class="value">{{ data.dwellArea }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
// api
import { courtApi } from '@/api/court'
// components
// data
import { fields } from '../modules/fields.js'
// filter
// function
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'CourtSee',
  components: {},
  mixins: [MethodsMixin],
  props: {
    data: { type: Object, required: true }
  },
  data() {
    return {
      fields
    }
  },
  created() {},
  methods: {
    resetUpdate() {
      courtApi.update({ courtId: this.data.courtId }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.routerClose('/court/index')
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../organize/styles/view.scss';
</style>
