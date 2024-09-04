<template>
  <div class="guide-container">
    <div class="logo"></div>
    <div class="title">智慧法院电子管理平台</div>
    <div class="list-wrap">
      <div class="entry">
        <i class="icon bg1"></i>
        <b>法院诉讼保函平台</b>
        <a @click="openNewWindow(1)">进入平台</a>
      </div>
      <div class="entry">
        <i class="icon bg2"></i>
        <b>法院管理平台</b>
        <a @click="openNewWindow(2)">进入平台</a>
      </div>
      <div class="entry">
        <i class="icon bg3"></i>
        <b>金融机构管理平台</b>
        <a @click="openNewWindow(3)">进入平台</a>
      </div>
      <div class="entry">
        <i class="icon bg4"></i>
        <b>管理员后台</b>
        <a @click="openNewWindow(4)">进入平台</a>
      </div>
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
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
// settings
export default {
  name: 'Guide',
  components: {},
  mixins: [DetailMixin, MethodsMixin, ListMixin],
  data() {
    return {}
  },
  created() {
    localStorage.clear()
  },
  methods: {
    openNewWindow(id) {
      const newWindowURL = window.location.origin + '/#/login?t=' + id // 创建一个新的URL，用于在新窗口中打开
      window.open(newWindowURL, '_blank') // 打开新窗口
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('./modules/index.scss');
</style>
