<script>
// api
// components
// data
import bgOne from '@/assets/image/bg/1.jpg'
import bgTwo from '@/assets/image/bg/2.png'
import bgThree from '@/assets/image/bg/3.jpg'
import bgFour from '@/assets/image/bg/4.jpg'
// filter
// function
// mixin
// plugins
// settings
export default {
  name: 'AccountMixinsBg',
  data() {
    return {
      nowType: 0,
      useBg: '',
      bigTitle: '',
      bgOne: {
        backgroundImage: `url(${bgOne})`
      },
      bgTwo: {
        backgroundImage: `url(${bgTwo})`,
        backgroundSize: 'cover'
      },
      bgThree: {
        backgroundImage: `url(${bgThree})`,
        // backgroundPosition: 'center top',
        // backgroundRepeat: 'none',
        backgroundSize: 'cover'
      },
      bgFour: {
        backgroundImage: `url(${bgFour})`
      }
    }
  },
  computed: {
    formBg() {
      return {
        backgroundColor: +this.nowType === 2 || +this.nowType === 3 || +this.nowType === 4 ? '#fff' : 'none',
        borderRadius: '20px'
      }
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
  methods: {
    // 开始处理
    startHandle() {
      this.selectRoles()
    },
    // 选择角色
    selectRoles() {
      const { t } = this.otherQuery
      if (t) {
        localStorage.setItem('userRoles', t)
        this.nowType = t
      } else {
        this.nowType = localStorage.getItem('userRoles')
      }
      switch (this.nowType) {
        case '1':
          this.userRoles = '用户'
          this.useBg = this.bgOne
          this.bigTitle = '法院诉讼保函平台'
          break
        case '2':
          this.userRoles = '法官'
          this.useBg = this.bgTwo
          this.bigTitle = '法院管理平台'
          break
        case '3':
          this.userRoles = '金融机构'
          this.useBg = this.bgThree
          this.bigTitle = '金融机构管理平台'
          break
        case '4':
          this.userRoles = '管理员'
          this.useBg = this.bgFour
          this.bigTitle = '管理员后台'
          break
        default:
          this.userRoles = '用户'
          this.useBg = this.bgOne
          this.bigTitle = '法院诉讼保函平台'
          break
      }
    },
    // 获取其它参数
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') acc[cur] = query[cur]
        return acc
      }, {})
    }
  }
}
</script>
<style lang="scss" scoped></style>
