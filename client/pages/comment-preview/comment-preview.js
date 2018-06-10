const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')

// pages/comment-preview/comment-preview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { movieId, text, tp, audio } = options
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  submit() {
    const { movieId, text, tp, audio } = this.data
    qcloud.request({
      url: config.service.comment,
      method: 'PUT',
      data: {
        movieId, text, tp, audio
      },
      success: res => {
        wx.showModal({
          title: '提示',
          content: '提交成功',
        })
      },
      fail: err => {
        wx.showModal({
          title: '提示',
          content: '提交失败, 请重试',
        })
      }
    })

  },
  backEdit() {
    wx.navigateBack({
      delta: -1
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})