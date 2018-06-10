//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  userInfo: null,
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  // 登陆函数入口
  login({ success, fail }) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === false) {
          //拒绝过授权, 提示用户授权
          wx.showModal({
            title: '温馨提示',
            content: '请授权用户信息:)',
            showCancel: false,
            success: res => {
              if (res.authSetting['scope.userInfo'] === true) {
                this.qcloudLogin({ success, fail })
              }
            },
          })
        } else {
          //未拒绝, 直接获取
          this.qcloudLogin({ success, fail })
        }
      }
    })
  },
  // 腾讯云登陆
  qcloudLogin({ success, fail }) {
    qcloud.login({
      success: res => {
        if(res) {
          this.userInfo = res
          success && success({ userInfo: res })
        } else {
          // 不是首次登陆, 不会返回用户信息
          this.getUserInfo({ success, fail })
        }
      },
      fail: err => {
        fail && fail()
      }
    })
  },
  //获取用户信息
  getUserInfo({ success, fail }) {
    if(this.userInfo) return this.userInfo
    qcloud.request({
      url: config.service.user,
      login: true,
      success: res => {
        
        if (!res.code) {
          //获取成功, 返回0
          this.userInfo = res.data.data
          success && success({ userInfo: res.data.data })
        } else {
          fail && fail()
        }
      }
    })
  },
 
  //检查是否过期
  checkSession({ success, fail }) {
    if (this.userInfo) {
      return success && success({ userInfo: this.userInfo })
    }
    wx.checkSession({
      success: res => {
        this.getUserInfo({
          success: res => {
            this.userInfo = res.userInfo
            success && success({ userInfo: this.userInfo })
          },
          fail: err => {
            fail && fail()
          }
        })
      },
      fail: err => {
        fail && fail()
      }
    })
  }
})