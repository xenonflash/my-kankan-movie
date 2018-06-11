const app = getApp()

// pages/comment-detail/comment-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: undefined,
    title: '',
    userId: undefined,
    username: '',
    image: '',
    avatar: '',
    tp: '',
    audioUrl: '',
    audioLength: 0,
    actionSheetHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { movie_id, title, user, username, image, tp, audio_url = '', text = '', audio_lendgh = '', avatar } = this.options
    this.setData({
      movieId: movie_id,
      audioLength: audio_lendgh,
      audioUrl: audio_url,
      userId: user,
      text, tp, title, username, image, avatar
    })
  },

  playSound() {
    wx.playVoice({
      filePath: this.data.audioUrl,
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
    const { image, tp, movieId, title} = this.data
    wx.navigateTo({
      url: `/pages/comment-edit/comment-edit?tp=${tp}&img=${image}&title=${title}&movieId=${movieId}`,
    })
  },
  addToFav() {
    
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