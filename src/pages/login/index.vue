<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left">
      <div class="title-container">
        <h3 class="title">{{systemConfig.systemName}}</h3>
      </div>
      <el-form-item prop="account">
        <el-input name="account" type="text" v-model="loginForm.account" placeholder="请输入登录用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  placeholder="请输入登录密码"/>
        <span class="show-pwd" @click="showPwd">
        </span>
      </el-form-item>
      <el-form-item class="codeValidate" prop="verifyCode" ref="verifyCodeFormItem">
        <el-input v-model="loginForm.verifyCode" auto-complete="off" @keypress.enter.native="handleLogin"
                  placeholder="请输入验证码"></el-input>
        <div id="code" @click="createCode"><img :src="codeImg" style="width:100%;height:100%"/></div>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import UUID from '../../assets/utils/Uuid'
import ActionUrl from '../../assets/utils/loadActionUrl'
import StaticConfig from '../../../static/json/config.json'

export default {
  components: {},
  name: 'login',
  data () {
    return {
      title: '',
      codeImg: '',
      loginForm: {
        account: '',
        password: '',
        verifyCode: '',
        uuid: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 40, message: '用户名过长', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z!@#$%^&*,])(?=.*[a-z]).*$/,
            message: '密码必须为6-8位数字字母或特殊字符混合！',
            trigger: 'blur'
          }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      systemConfig: ''
    }
  },
  mounted () {
    // 获取系统配置
    this.getSystemConfig()
  },
  methods: {
    // 获取系统标题
    getSystemConfig () {
      this.systemConfig = StaticConfig
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
            if (res.isNoLogin) {
              this.loading = false
              this.loginForm.password = null
              this.loginForm.verifyCode = null
              this.createCode()
              this.$notify.error({
                title: '错误',
                message: '请用太仓账号登录'
              })
            } else {
              this.loading = false
              // 登录成功获取景区列表store.state.userInfo.token
              this.$store.dispatch('set_menus_list')
              // 跳转到首页
              if (this.$store.state.user.userInfo.roleId === '62') {
                this.$router.push({ path: '/hufuSys/index' })
              } else {
                this.$router.push({ path: '/visual/index' })
              }
            }
          }).catch(e => {
            console.log(' e:', e)
            this.loading = false
            this.loginForm.password = null
            this.loginForm.verifyCode = null
            this.createCode()
            this.$notify.error({
              title: '错误',
              message: e.msg || '系统错误'
            })
          })
        } else {
          return false
        }
      })
    },
    createCode () {
      // 生成8位16进制的唯一ID
      this.loginForm.uuid = 'JSSESSION' + UUID.getUID(10, 16)
      this.codeImg = ActionUrl.getUpLoadActionUrl() + '/captcha?uuid=' + this.loginForm.uuid
    }
  },
  created () {
    // window.addEventListener('hashchange', this.afterQRScan)
    this.createCode()
  },
  destroyed () {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/mixin.scss';

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  @include relative;
  height: 100vh;
  background-color: $bg;
  background-image: url('../../assets/images/login/bg.png');
  background-size: 100% 100%;
  .el-input {
    display: inline-block;
    height: 47px;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 220px auto;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    .codeValidate {
      .el-input {
        width: 70%;
        float: left;
      }
      #code {
        float: right;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
