const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const commentApi = require('../../api/comment.api.js')

// pages/comment-list/comment-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { movie_id: movieId, user: userId } = options
    this.getCommentList({ movieId, userId })
  },
  getCommentList({ movieId, userId }) {
    let data = { movie_id: movieId }
    if (userId) {
      data.user_id = userId
    }
    commentApi.getCommentList({ data }).then(res => {
      this.setData({commentList: res})
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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