// pages/comment-edit/comment-edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: 'about:blank',
    title:'',
    tp: '',
    text: '',
    audio: '',
    recording: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { movieId, img, title, tp } = options
    this.setData({
      img, title, tp, movieId
    })
  },
  gotoPreview() {
    const { img, title, tp, text, movieId, audio } = this.data
    let url = `/pages/comment-preview/comment-preview?movieId=${movieId}&cover=${img}&title=${title}&tp=${tp}`
    if (tp === 'text') {
      url += `&text=${text}`
    } else if(tp === 'audio') {
      url +=`&audio=${audio}`
    }
    console.log(url)
    wx.navigateTo({
      url
    })
  },
  toggleRecord() {
    if (this.data.recording) {
      wx.stopRecord()
    } else {
      wx.startRecord({
        success: res => {
          var tempFilePath = res.tempFilePath
          this.setData({
            audio: tempFilePath
          })
        },
        fail: function (res) {
          //录音失败
          wx.showModal({
            title: '提示',
            content: '录音失败',
          })
        }
      })
    }
    this.setData({
      recording: !this.data.recording
    })
  },
  handleInput(e) {
    this.setData({
      text: e.detail.value
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
    this.data.recording = false
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.data.recording = false
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