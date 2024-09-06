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
import { fileSuffixName } from 'abbott-methods/import'
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
    download(url, fileName) {
      fileName = fileName || '电子保函'
      guaranteeApi.download({ path: url }).then((data) => {
        downloadSave(fileName + Date.now(), fileSuffixName(url), data)
        this.$message.success('下载成功')
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
