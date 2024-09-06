<script>
// api
import { guaranteeApi } from '@/api/guarantee'
// components
// data
// filter
// function
// mixin
// plugins
import { fileSuffixName, fileSave } from 'abbott-methods/import'
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
    fileDownload(url, fileName) {
      fileName = fileName || '电子保函'
      guaranteeApi.download({ path: url }).then((data) => {
        fileSave(fileName + Date.now(), fileSuffixName(url), data)
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
