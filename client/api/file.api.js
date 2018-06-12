const { makeRequest } = require('./api-utils.js')
const config = require('../config.js')
const util = require("../utils/util.js")

let api = {}
api.upload = ({ filePath, name }) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      header: {
        'content-type': 'audio/mp3'
      }, 
      url: config.service.uploadUrl,
      filePath,
      name,
      success: function (res) {
        if (res.statusCode == 200) {
          util.showSuccess('上传成功')
          res = JSON.parse(res.data)
          if (res.code === 0) {
            resolve(res.data.imgUrl)
          } else {
            reject(res.error)
          }
        } else {reject(res.data)}
      },

      fail: function (e) {
        reject(e)
        util.showModel('上传失败')
      }
    })
  })  
}

module.exports = api
