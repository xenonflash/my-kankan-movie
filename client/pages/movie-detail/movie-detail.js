// pages/movie-detail/movie-detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: null,
    movieDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.setData({
      movieId : id
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
      url: `https://f3l9mccl.qcloud.la/mpapi/movie-list/${id}`,
      success: res => {
        this.setData({movieDetail: res.data.data})
      }
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