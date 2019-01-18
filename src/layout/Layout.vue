<template>
  <div class="app-wrapper">
    <!--header-->
    <navbar></navbar>
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>

<script type="">
import { Navbar, AppMain } from './components/Index'

export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain
  },
  computed: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../styles/mixin.scss";

.app-wrapper {
  position: relative;
  height: 100%;
}
</style>
