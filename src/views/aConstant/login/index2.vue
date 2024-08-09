<!--suppress ALL -->
<template>
  <div class="login-container">
    <div class="logo"></div>
    <div class="title">智慧法院电子管理平台</div>
    <loginForm :login-form="loginForm" @loginSubmit="loginSubmit" />
  </div>
</template>

<script>
import loginForm from './components/loginForm'

export default {
  name: 'ViewsLoginIndex',
  components: {
    loginForm
  },
  props: {
    /* 定义传值 */
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    loginSubmit() {
      this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') acc[cur] = query[cur]
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background: url('~@/assets/image/bg.jpg') no-repeat center center;

  > .logo {
    position: absolute;
    left: 50px;
    top: 50px;
    height: 60px;
    width: 300px;
    background: url('~@/assets/image/full_logo.png') no-repeat;
    background-size: contain;
  }
  > .title {
    position: absolute;
    left: 0;
    top: 150px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 40px;
    text-align: center;
  }
}
</style>
