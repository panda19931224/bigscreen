/* eslint-disable space-infix-ops */
/**
 * Created by chang on 2017/8/2.
 */
import localStorage from '../assets/utils/LocalStorage'
import axios from './XAxios'
import config from '../../config/index'
import qs from 'qs'

/**
 * 以form表单方式提交数据
 * Using application/x-www-form-urlencoded format
 */
axios.defaults.paramsSerializer = function (data) {
  return qs.stringify(data)
}

axios.defaults.transformRequest = [
  function (data) {
    return qs.stringify(data)
  }
]
/**
 * 成功处理
 * @param res
 * @param load
 */
function successParse (res, load) {
  try {
    return JSON.parse(res.data)
  } catch (ex) {
    return res.data
  }
}

/**
 * 失败处理
 * @param ex
 * @param load
 * @returns {Promise.<*>|Promise<R>}
 */
function errorParse (ex) {
  try {
    switch (ex && ex.status) {
      case 401:
        // 权限过期
        return Promise.reject({ status: 401, msg: '您的权限已过期，请重新登录！' }) // eslint-disable-line
      case 400:
        // 请求参数错误
        return Promise.reject({ status: 400, msg: '提交的数据有错误！' }) // eslint-disable-line
      case 500:
        // 系统错误
        return Promise.reject({ status: 500, msg: '系统报错啦，请联系管理员！' }) // eslint-disable-line
      default:
        // 其它
        return Promise.reject({ status: 500, msg: '网络异常，请稍后再试' }) // eslint-disable-line
    }
  } catch (e) {
    return Promise.reject({ status: 500, msg: '网络异常，请稍后再试' }) // eslint-disable-line
  }
}

/**
 * 生成请求接口地址
 * @param url 接口地址
 * @returns {*}
 */
function requestUrl (url) {
  // 生产/测试环境
  if (process.env.NODE_ENV !== 'development') {
    if (url.startsWith('iVisual')) {
      // 测试环境
      if (process.env.NODE_ENV === 'testing') {
        // 测试环境，访问测试接口
        url = url.replace('iVisual', config.build.offlineApiUrl)
      } else {
        url = url.replace('iVisual', config.build.onlineApiUrl)
      }
    } else if (url.startsWith('location')) {
      // 测试环境
      if (process.env.NODE_ENV === 'testing') {
        // 测试环境，访问测试接口
        url = url.replace('location', config.build.locationOfflineApiUrl)
      } else {
        url = url.replace('location', config.build.locationOnlineApiUrl)
      }
    }
  } else {
    if (url.startsWith('iVisual')) {
      // 本地开发环境，调用测试接口
      url = url.replace('iVisual', config.build.offlineApiUrl)
    } else if (url.startsWith('location')) {
      // 本地开发环境，调用测试接口
      url = url.replace('location', config.build.locationOfflineApiUrl)
    }
  }
  return url
}

/**
 * Ajax请求方法
 * @param url 接口地址
 * @param method 请求方式
 * @param body 请求参数
 * @param options header参数
 * @param load 是否显示请求loading
 * @param loadMsg loading的提示
 * @returns {Promise<U>|*|Promise|Promise.<T>}
 */
function send (url, method, queryString, body, options, load, loadMsg) {
// 生成请求的url
  url = requestUrl(url)
  if (load) {
    // Vue.$vux.loading.show(loadMsg)
  }
  // const opts = {...options}
  // opts.headers = {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json',
  //   ...opts.headers
  // }
  // switch (method) {
  //   case 'get':
  //     return axios.get(url)
  //       .then(res => successParse(res, load))
  //       .catch(ex => errorParse(ex.response, load))
  //   case 'post':
  //     return axios.post(url, body)
  //       .then(res => successParse(res, load))
  //       .catch(ex => errorParse(ex.response, load))
  // }
  return axios({
    url: url,
    method: method,
    params: queryString,
    data: body,
    headers: {
      token: localStorage.get(config.build.assetsPublicPath + 'vuex').user.userInfo.token
    }
  }).then(res => successParse(res, load)).catch(ex => errorParse(ex.response, load))
}

export default {
  get (url, queryString, options, {load = true, loadMsg = '加载中...'} = {}) {
    return send(url, 'get', queryString, null, options, load, loadMsg)
  },
  post (url, body, options, {load = true, loadMsg = '加载中...'} = {}) {
    return send(url, 'post', null, body, options, load, loadMsg)
  }
}
