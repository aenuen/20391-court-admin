<template>
  <div class="app-container">
    <div class="icon">
      <el-image :src="image"></el-image>
    </div>
    <div class="stepWrap">
      <div class="roundColor">
        <div class="blue">信息填写</div>
      </div>
      <div class="lineColor"></div>
      <div class="roundColor">
        <div class="blue">审核中</div>
      </div>
      <div class="lineColor"></div>
      <div class="roundColor">
        <div class="blue">准入成功</div>
      </div>
    </div>
    <div class="goSee">
      <el-button type="primary" @click="goSee">查看认证状态</el-button>
    </div>
  </div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'CourtSuccess',
  components: {},
  mixins: [MethodsMixin],
  data() {
    return {
      image: require('@/assets/image/status/success.png')
    }
  },
  created() {},
  methods: {
    goSee() {
      this.routerClose('/court/view')
    }
  }
}
</script>
<style lang="scss" scoped>
.icon {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 向下对齐子元素 */
}
.stepWrap {
  height: 14px;
  line-height: 14px;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.roundColor {
  width: 14px;
  height: 14px;
  background: #3890f9;
  border-radius: 50%;
}
.lineColor {
  width: 280px;
  height: 3px;
  background: #3890f9;
  margin: auto 2px;
}
.lineGray {
  width: 280px;
  height: 3px;
  background: #f0f0f0;
  margin: auto 2px;
}
.roundGray {
  width: 14px;
  height: 14px;
  background: #999;
  border-radius: 50%;
}

.roundColor,
.roundGray {
  position: relative;
  div {
    width: 100px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    position: absolute;
    left: -50px;
    bottom: -30px;
    color: #000;
    &.blue {
      color: rgb(56, 144, 249);
    }
    &.gray {
      color: rgb(153, 153, 153);
    }
  }
}

.goSee {
  margin: 70px auto;
  text-align: center;
}
</style>
