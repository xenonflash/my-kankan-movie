const app = getApp()
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const favApi = require('../../api/favourite.api.js')
const commentApi = require('../../api/comment.api.js')

// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    favList: [],
    commentList: [],
    listType: 'fav'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '用户中心',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onLogin() {
    app.login({
      success: res => {
        this.setData({
          userInfo: res.userInfo
        })
        this.fetchData()
      }
    })
  },
  fetchData() {
    const type = this.data.listType
    //获取收藏列表
    if (type === 'fav'){
      favApi.getFavList().then(res => {
        this.setData({
          favList: res
        })
      })
    } else if (type === 'pub') {
      // 获取 已发布列表
      commentApi.getCurrUserComment().then(res => {
        this.setData({
          commentList: res
        })
      })
    }
  },
  /**
   * 跳转到影评详情
   */
  toCommentDetail(e){
    const commentId=e.currentTarget.dataset.id
    dwx.navigateTo({
      url: '/pages/comment-detail/comment-detail',
    })
  },
  onTypeChange(e) {
    const listType = e.target.dataset.type
    if (listType) {
      this.setData({
        listType
      })
      this.fetchData()
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.checkSession({
      success: res => {
        this.setData({ userInfo: res.userInfo })
        this.fetchData()
      }
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