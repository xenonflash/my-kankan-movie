const { makeRequest } = require('./api-utils.js')
const config = require('../config.js')
const util = require("../../client/utils/util.js")

let api = {}
api.upload = ({ filePath, name }) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath,
      name,
      success: function (res) {
        util.showSuccess('上传成功')
        console.log(res)
        res = JSON.parse(res.data)
        resolve({url: res.data.imgUrl})
      },

      fail: function (e) {
        reject()
        util.showModel('上传图片失败')
      }
    })

  })  
}

module.exports = api
