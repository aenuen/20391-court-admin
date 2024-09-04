<template>
  <div class="app-container">
    <el-form>
      <el-form-item :label-width="labelWidth">
        <el-button :type="cutterControl ? 'primary' : 'default'" class="el-icon-upload" @click="cutterToggle"> 上传头像 </el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-if="cutterControl" title="上传头像" width="800px" :visible.sync="cutterControl">
      <ImgCutter @onCutSuccess="onCutSuccess" />
    </el-dialog>
  </div>
</template>

<script>
// api
import { userApi } from '@/api/user'
// components
// data
import { fields } from '../modules/fields'
// filter
// function
// mixins
// plugins
import { mapGetters } from 'vuex'
import ImgCutter from '@/components/ImgCutter'
// settings
import { serveUrl } from '@/settings'
export default {
  name: 'AccountAvatar',
  components: { ImgCutter },
  mixins: [],
  data() {
    return {
      fields,
      labelWidth: '120px',
      cutterControl: false
    }
  },
  computed: {
    ...mapGetters(['aid', 'avatar'])
  },
  methods: {
    // 剪切框打开关闭切换
    cutterToggle() {
      this.cutterControl = !this.cutterControl
    },
    // 剪切成功
    onCutSuccess(res) {
      userApi
        .upload({ userId: this.aid, base64Str: ((res.dataURL || '').split(',') || ['', ''])[1] })
        .then(({ code, data, msg }) => {
          const imageUrl = serveUrl + data + '?' + Date.now()
          if (code === 200) {
            this.$store.commit('user/SET_Avatar', imageUrl)
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        })
        .catch(() => {
          //
        })
      // 关闭剪切窗口
      this.cutterToggle()
    }
  }
}
</script>

<style lang="scss" scoped></style>
