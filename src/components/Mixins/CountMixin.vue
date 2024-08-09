<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      countdown: 60, // 初始化倒计时为60秒
      countTime: null
    }
  },
  beforeDestroy() {
    this.clearCountdown() // 清除计时器，防止内存泄露
  },
  methods: {
    // 开始倒计时函数
    startCountdown() {
      this.countTime = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
          Cookies.set('countdown', this.countdown)
        } else {
          this.clearCountdown()
        }
      }, 1000)
    },
    // 清除倒计时函数
    clearCountdown() {
      clearInterval(this.countTime)
      Cookies.remove('countdown')
      this.countdown = 60
      this.countTime = null
      this.disable = false
    }
  }
}
</script>
