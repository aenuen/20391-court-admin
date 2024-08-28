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
          <span class="txt">{{ +data.orgStatus === 1 ? '已认证' : '未认证' }}</span>
        </div>
      </div>
    </el-card>
    <el-card shadow="hover" class="mt20">
      <div class="item">
        <div class="title">证件信息</div>
        <div class="cert">
          <div class="list">
            <div>营业执照</div>
            <el-image v-if="data.license" :src="getFullUrl(data.license)" fit="contain" @click="view(getFullUrl(data.license))" />
          </div>
          <div class="list">
            <div>公司LOGO</div>
            <el-image v-if="data.logo" :src="getFullUrl(data.logo)" fit="contain" @click="view(getFullUrl(data.logo))" />
          </div>
          <div class="list">
            <div>法人身份证正面</div>
            <el-image v-if="data.legalCertImage1" :src="getFullUrl(data.legalCertImage1)" fit="contain" @click="view(getFullUrl(data.legalCertImage1))" />
          </div>
          <div class="list">
            <div>法人身份证背面</div>
            <el-image v-if="data.legalCertImage2" :src="getFullUrl(data.legalCertImage2)" fit="contain" @click="view(getFullUrl(data.legalCertImage2))" />
          </div>
          <div class="list">
            <div>经办人身份证正面</div>
            <el-image v-if="data.agentCertImage1" :src="getFullUrl(data.agentCertImage1)" fit="contain" @click="view(getFullUrl(data.agentCertImage1))" />
          </div>
          <div class="list">
            <div>经办人身份证背面</div>
            <el-image v-if="data.agentCertImage2" :src="getFullUrl(data.agentCertImage2)" fit="contain" @click="view(getFullUrl(data.agentCertImage2))" />
          </div>
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
                <div class="key">{{ fields.name }}</div>
                <div class="value">{{ data.name }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="line">
                <div class="key">{{ fields.orgCode }}</div>
                <div class="value">{{ data.orgCode }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="line">
                <div class="key">{{ fields.orgEmail }}</div>
                <div class="value">{{ data.orgEmail }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="line foot">
                <div class="key">{{ fields.orgTelephone }}</div>
                <div class="value">{{ data.orgTelephone }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="l"></div>
        <div class="lines">
          <el-row>
            <el-col :span="24">
              <div class="line foot" style="padding-left: 20px">
                <div class="key">{{ fields.dwellAddress }}</div>
                <div class="value">{{ data.dwellArea + data.dwellAddress }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <el-card shadow="hover" class="mt20">
      <div class="item">
        <div class="title">法人信息</div>
        <div class="lines">
          <el-row>
            <el-col :span="6">
              <div class="line head">
                <div class="key">{{ fields.orgLegal }}</div>
                <div class="value">{{ data.orgLegal }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="line">
                <div class="key">{{ fields.legalTelephone }}</div>
                <div class="value">{{ data.legalTelephone }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="line foot">
                <div class="key">{{ fields.legalCertNo }}</div>
                <div class="value">{{ data.legalCertNo }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <el-card shadow="hover" class="mt20">
      <div class="item">
        <div class="title">经办人信息</div>
        <div class="lines">
          <el-row>
            <el-col :span="6">
              <div class="line head">
                <div class="key">{{ fields.orgAgent }}</div>
                <div class="value">{{ data.orgAgent }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="line">
                <div class="key">{{ fields.agentTelephone }}</div>
                <div class="value">{{ data.agentTelephone }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="line foot">
                <div class="key">{{ fields.agentCertNo }}</div>
                <div class="value">{{ data.agentCertNo }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
// api

// components
// data
import { organizeApi } from '@/api/organize.js'
import { fields } from '../modules/fields.js'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins

// settings
import { serveUrl } from '@/settings'
export default {
  name: 'OrganizeSee',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  props: {
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      fields,
      dialogVisible: '',
      dialogImageUrl: ''
    }
  },
  created() {},
  methods: {
    getFullUrl(url) {
      const arr = url ? url.split('/') : ['', '']
      const full = `${serveUrl}/file/org/${arr[arr.length - 2]}/${arr[arr.length - 1]}`
      return full
    },
    view(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    resetUpdate() {
      organizeApi.Update({ orgId: this.data.orgId }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.routerClose('/organize/index')
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('../styles/view.scss');
</style>
