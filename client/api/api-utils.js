const qcloud = require('../vendor/wafer2-client-sdk/index.js')

export function makeRequest(url, method = 'GET') {
  return function (params = {}) {
    const _params = Object.assign({}, {url, method, login: false, data: {}}, params)
    console.log(_params)
    return new Promise((resolve, reject) => {
      qcloud.request({
        ..._params,
        success: res => {
          if (res.statusCode === 200) {
            const data = res.data
            if (data.code === 0) {
              resolve(data.data)
            } else {
              reject('fail')
            }
          } else {
            reject(res.errorMsg)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
}