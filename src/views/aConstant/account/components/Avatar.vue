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
          if (code === 200) {
            this.$store.commit('user/SET_Avatar', data)
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

<style lang="scss" scoped>
.btn {
  border: 1px solid #eee;
  height: 20px;
}
.avatar_wrap {
  width: 100%;
  overflow: hidden;
  .avatar-item {
    float: left;
    position: relative;
    &:hover {
      .avatar-work {
        display: block;
      }
    }
    .avatar-work {
      display: none;
      position: absolute;
      z-index: 1;
      width: 120px;
      height: 120px;
      left: 0;
      top: 0;
      .avatar-half {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
      }
      .avatar-live {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 3;
        .avatar-mode {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .avatar-main {
      width: 120px;
      height: 120px;
      margin-bottom: 20px;
      margin-right: 10px;
      border: 1px solid #eee;
      background-color: #eee;
      border-radius: 50%;
      padding: 20px;
    }
  }
}
</style>
