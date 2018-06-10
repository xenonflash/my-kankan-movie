const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')

// pages/comment-list/comment-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [
      {
        id:'1',
        avatar: "",
        userName: "培松",
        type: "text",
        text: "今天是个好天气"
      },
      {
        id:'2',
        avatar: "",
        userName: "小黑",
        type: "audio",
        text: "",
        audioUrl: "",
        audioLength: 20
      },
      {
        id:'1',
        avatar: "",
        userName: "培松",
        type: "text",
        text: "今天是个好天气"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { movieId, userId } = options
    this.getCommentList({ movieId, userId })
  },
  getCommentList({ movieId, userId }) {
    let url = `${config.service.comment}?movieId=${movieId}`
    if (userId) {
      url += `&userId=${userId}`
    }
    qcloud.request({
      url,
      method: 'GET',
      success: res => {
        this.setData({
          commentList: res.data.data
        })
      },
      fail: err => {
        wx.showToast({
          title: '获取评论列表失败',
        })
      }
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