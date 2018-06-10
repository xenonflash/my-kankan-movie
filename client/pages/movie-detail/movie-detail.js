// pages/movie-detail/movie-detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: null,
    movieDetail: {},
    actionSheetHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.setData({
      movieId: id
    })
    this.getDetailById(id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getDetailById(id) {
    qcloud.request({
      url: `${config.service.movie}/${id}`,
      success: res => {
        this.setData({ movieDetail: res.data.data })
        wx.setNavigationBarTitle({
          title: res.data.data.title
        })
      }
    })
  },
  addComment() {
    app.checkSession({
      success: res => {
        this.setData({
          actionSheetHidden: !this.data.actionSheetHidden
        })
      },
      fail: err => {
        wx.showModal({
          title: '提示',
          content: '请在个人中心登录后操作',
          confirmText: '前往登录',
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/user/user',
              })
            }
          }
        })  
      }
    })
  },
  actionSheetClose(e) {
    this.setData({
      actionSheetHidden: true
    })
  },
  onAction(e) {
    const link = e.currentTarget.dataset.name
    const { title, image } = this.data.movieDetail
    wx.navigateTo({
      url: `/pages/comment-edit/comment-edit?tp=${link}&img=${image}&title=${title}&movieId=${this.data.movieId}`,
    })
  },
  reviewComment() {
    wx.navigateTo({
      url: '/pages/comment-list/comment-list?movieId=' + this.movieId,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      actionSheetHidden: true
    })
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