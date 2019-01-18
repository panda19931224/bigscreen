<template>
  <section>
    <div class="app-main">
      <transition name="fade" mode="out-in">
        <router-view :key="key"></router-view>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {}
  },
  mounted () {
    // areaConfig.map(item => {
    //   console.log(item.areaId === parseInt(this.$route.query.areaId))
    // })
  },
  computed: {},
  methods: {}
}
</script>
