<template>
  <div class="navbar">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data () {
    return {}
  },
  mounted () {
    console.log(this.userInfo)
  },
  computed: {
    ...mapState({
      userInfo: ({ user }) => user.userInfo
    }),
    // 标题
    title () {
      return this.menus.find(_x => _x.id === this.activeColumn).name
    }
  },
  methods: {
    // 切換板塊
    changeColumn (item) {
      try {
        this.$store.dispatch('set_active_colume', item.id)
        let route = this.menus.find(_x => _x.id === this.activeColumn).children[0].link
        this.$router.push({
          path: route
        })
      } catch (e) {
        this.$notify.error({
          title: '错误',
          message: '跳转失败，请稍后再试'
        })
      }
    },
    // 关闭平台
    close () {
      this.$message.warning({ message: '平台正在运行，请勿关闭！' })
    },
    // 退出登录
    loginOut () {
      this.$store.dispatch('LoginOut')
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/font";
$headerHeight: 80px;
.navbar {
  height: $headerHeight;
  width: 100%;
  display: flex;
  background-color: #049cbf;
  justify-content: center;
  top: 0;
  box-shadow: 0px 1px 1px #ccc;
  z-index: 100;
  .title-logo {
    flex: 0 0 45%;
    position: relative;
    padding: 0 20px;
    p {
      color: #ffffff;
      &.title {
        font-size: $font-size-xxxxl;
        padding-left: 10px;
        line-height: $headerHeight;
      }
      &:not(.title) {
        padding-top: 17px;
        padding-bottom: 11px;
        padding-left: 6px;
        font-size: 13px;
      }
      span {
        display: block;
      }
    }

    img {
      width: 60px;
      border-radius: 50%;
      margin-top: 10px;
    }
    p, img {
      float: left;
    }
  }
  .first-menus {
    flex: 0 0 55%;
    color: #ffffff;
    .content {
      float: right;
      margin-right: 30px;
      line-height: $headerHeight;
      .vline {
        margin: 0 5px;
      }
    }
  }
}
</style>
