let needLoadingRequestCount = 0
import { Loading } from 'element-ui'

let loading

function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.5)'
  })
}

function endLoading () {
  loading.close()
}

/**
 * 显示loading
 */
export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

/**
 * 关闭loading
 */
export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}