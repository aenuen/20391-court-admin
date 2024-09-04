<script>
// api
import { guaranteeApi } from '@/api/guarantee'
// components
// data
// filter
// function
import { downloadSave } from '../modules/utils'
// mixin
// plugins
// settings
export default {
  name: 'GuaranteeDownload',
  components: {},
  mixins: [],
  data() {
    return {}
  },
  created() {},
  methods: {
    download(url) {
      guaranteeApi.download({ path: url }).then((data) => {
        downloadSave('电子保函' + Date.now(), 'pdf', data)
        this.$message.success('下载成功')
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
