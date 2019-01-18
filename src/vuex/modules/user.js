import { loginByUsername } from '../../api/login'
// import { Notification } from 'element-ui'
// import router from '../../router'
// initial state
const state = {
  userInfo: {}
}
// getters
const getters = {
  userInfo: state => {
    return state.userInfo
  }
}
// mutations
const mutations = {
  // 数据初始化
  USER_INIT (state) {
    state.userInfo = {}
  },
  // 保存用户登录信息
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}
const actions = {
  /**
   * 登录
   * @param commit
   * @param state
   * @param param
   * @returns {Promise}
   */
  LoginByUsername ({ commit, dispatch }, userInfo) {
    userInfo.account = userInfo.account.trim()
    return new Promise((resolve, reject) => {
      loginByUsername(userInfo).then(response => {
        // debugger
        if (response.status === 200) {
          commit('SET_USER_INFO', {
            roleId: response.data.roleIds,
            userId: response.data.id,
            time: new Date().getTime(),
            ...response.data
          })
          resolve(response)
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 注销
   * @param commit
   * @param state
   */
  LoginOut ({ commit, state }) {
    commit('USER_INIT')
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
