<template>
  <div class="app-container">
    <Steps :step="0" />
    <Detail />
  </div>
</template>
<script>
// api
// components
import Steps from './components/Steps'
import Detail from './components/Detail'
// data
// filter
// function
// mixins
// plugins
// settings
export default {
  name: 'GuaranteeCreate',
  components: { Steps, Detail },
  mixins: [],
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
