<template>
  <div></div>
</template>

<script>
import BLL from './index'

export default {
  components: {},
  data () {
    return {}
  },
  created () {
    this.BLL = new BLL(this)
    // this.month = this.$utils.Date.add(new Date(), 0, 'day', 'MM月dd日')
  },
  mounted () {
  },
  computed: {},
  methods: {
  }
}
</script>
