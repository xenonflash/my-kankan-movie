const { makeRequest } = require('./api-utils.js')
const config = require('../config.js')
const util = require("../utils/util.js")

let api = {}
api.upload = ({ filePath, name }) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      header: {
        'content-type': 'multipart/form-data'
      },
      url: config.service.uploadUrl,
      filePath,
      name,
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          util.showSuccess('上传成功')
          res = JSON.parse(res.data)
          resolve(res.data.imgUrl)
        } else {reject(res.data)}
      },

      fail: function (e) {
        reject(e)
        util.showModel('上传图片失败')
      }
    })
  })  
}

module.exports = api
