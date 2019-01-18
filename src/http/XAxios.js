/**
 * axios 拦截器
 */
import axios from 'axios'
import { showFullScreenLoading, tryHideFullScreenLoading } from '../assets/utils/loadingConfig'
// 请求时间设置
axios.defaults.timeout = 25000000
// http请求拦截器
axios.interceptors.request.use(config => {
  // loading 加载
  showFullScreenLoading()
  return config
}, error => {
  tryHideFullScreenLoading()
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
  tryHideFullScreenLoading()
  return data
}, error => {
  tryHideFullScreenLoading()
  return Promise.reject(error)
})
export default axios
