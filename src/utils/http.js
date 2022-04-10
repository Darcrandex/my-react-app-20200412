import axios from 'axios'
import queryString from 'qs'

const isDev = process.env.NODE_ENV === 'development'
const defaultProxyPrefix = process.env.REACT_APP_DEFAULT_PROXY_PREFIX
const customProxyRegx = new RegExp(
  process.env.REACT_APP_CUSTOM_PROXY_REGEXP || ''
)
const httpRegx = /^http(s?):\/\//

// 修改请求url
export const withProxy = (url = '') => {
  if (httpRegx.test(url)) {
    return url
  }

  const hasCustomPrefix = customProxyRegx.test(url)
  if (hasCustomPrefix) {
    if (isDev) {
      return url
    }
    const urlArr = url.split('/')
    urlArr.splice(0, 2)
    const baseReqUrl = `/${urlArr.join('/')}`

    return baseReqUrl
  }
  return isDev ? defaultProxyPrefix + url : url
}

const http = axios.create({
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  paramsSerializer: (params) =>
    queryString.stringify(params, { arrayFormat: 'bracket' }),
})

http.interceptors.request.use(
  (config = {}) => {
    const token = window.localStorage.getItem('token')
    if (token)
      config.headers = Object.assign(config.headers, {
        Authorization: `bearer ${token}`,
      })
    config.url = withProxy(config.url)
    return config
  },
  (err) => {
    console.error('配置有误', err)
  }
)

http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err && typeof err.toJSON === 'function') {
      const res = err.toJSON()
      if (res && res.status === 401) {
        console.error('登录过期')
      }
    }
    return Promise.reject(err)
  }
)

export default http
