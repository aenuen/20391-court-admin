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
    dataAry: { type: Array, default: () => [] }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.showTable {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 25%;
    display: flex;
    b,
    i,
    u {
      display: block;
      text-decoration: none;
      font-weight: normal;
      font-style: normal;
      height: 35px;
      line-height: 35px;
      color: #666;
    }
    b {
      width: 100px;
      text-align: right;
    }
    &:last-child {
      i {
        width: 500px;
      }
    }
  }
}
</style>
