// pages/comment-edit/comment-edit.js
const recorderManager = wx.getRecorderManager()

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
    audioLength: 0,
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

    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
      let audioLength = 0
      const match = tempFilePath.match(/durationTime=(\d+)\./)
      if (match) {
        audioLength = +match[1]
      }
      this.setData({
        audioLength,
        audio:tempFilePath
      })
    })
  },
  gotoPreview() {
    const { img, title, tp, text, movieId, audio, audioLength } = this.data
    let url = `/pages/comment-preview/comment-preview?movieId=${movieId}&img=${img}&title=${title}&tp=${tp}`
    if (tp === 'text') {
      url += `&text=${text}`
    } else if(tp === 'audio') {
      // const fAudio = audio.replace(/\./g, '_')
      url +=`&audio=${audio}&audio_length=${audioLength}`
    }
    console.log(url)
    wx.navigateTo({
      url
    })
  },
  toggleRecord() {
    if (this.data.recording) {
      // wx.stopRecord()
      recorderManager.stop()
    } else {
      console.log(this.data.recordOptions)
      recorderManager.start({
        duration: 60000,
        sampleRate: 16000,
        numberOfChannels: 1,
        encodeBitRate: 48000,
        format: 'mp3',
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