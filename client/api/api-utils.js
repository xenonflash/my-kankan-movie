const qcloud = require('../vendor/wafer2-client-sdk/index.js')

export function makeRequest(url) {
  return function (params = {}) {
    const _params = Object.assign({}, {method: 'GET', login: false, data: {}}, params)
    return new Promise((resolve, reject) => {
      qcloud.request({
        ..._params,
        url,
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