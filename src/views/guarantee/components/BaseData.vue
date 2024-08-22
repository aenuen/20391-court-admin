<template>
  <ul class="showTable">
    <li v-for="(item, index) in dataAry" :key="index">
      <b>{{ item.label }}</b>
      <u>：</u>
      <i>{{ item.value }}</i>
    </li>
  </ul>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
// settings
export default {
  name: 'GuaranteeBaseData',
  components: {},
  mixins: [],
  props: {
    dataAry: { type: Array, default: () => {} }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
@import url('../styles/preview.scss');
</style>
