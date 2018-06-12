const app = getApp()
const favApi = require('../../api/favourite.api.js')
const commentApi= require('../../api/comment.api.js')
const { playSound } = require('../../utils/util.js')

// pages/comment-detail/comment-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const{ commentId }= options
    console.log(commentApi.getCommentDetail)
    commentApi.getCommentDetail(commentId).then(res => {
      if(res && res.length) {
        this.setData({
          detail:res[0]
        })
      }
    })
  },

  playSound() {
    playSound(this.data.detail.audio_url)
  },
  addComment() {
    app.checkSession({
      success: res => {
        this.setData({
          actionSheetHidden: !this.data.actionSheetHidden
        })
      },
      fail: err => {
        this.notifyLogin()
      }
    })
  },
  notifyLogin() {
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

  },
  actionSheetClose(e) {
    this.setData({
      actionSheetHidden: true
    })
  },
  onAction(e) {
    const link = e.currentTarget.dataset.name
    const {
      image,
      movie_id,
      title
    } = this.data.detail
    wx.navigateTo({
      url: `/pages/comment-edit/comment-edit?tp=${link}&img=${image}&title=${title}&movieId=${movie_id}`,
    })
  },
  addToFav() {
    app.checkSession({
      success: res => {
        const {
          comment_id
        } = this.data.detail

        const data = {
          comment_id
        }
        favApi.addFav({
          data
        }).then(res => {
          wx.showToast({
            title: '收藏成功',
          })
        }).catch(err => {
          wx.showToast({
            title: '收藏失败',
          })
        })
      },
      fail: err => {
        this.notifyLogin()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})