
const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const commentApi = require('../../api/comment.api.js')
const fileApi =require('../../api/file.api.js')
const { playSound } = require('../../utils/util.js')

const app = getApp()

// pages/comment-preview/comment-preview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    userInfo:null,
    movieId : undefined,
    text :'',
    tp: '',
    audio : '',
    audioLength: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      movieId,
      text = '',
      tp,
      audio = '',
      audio_length = 0,
      img
    } = options
    // 展示userInfo
    const userInfo = app.userInfo
    // if(audio) {
    //   audio += `=${audio_length}.mp3`
    // }
    this.setData({
      img,
      userInfo,
      movieId,
      text,
      tp,
      audio,
      audioLength: audio_length
    })
    console.log(audio)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  submit() {
    const { tp } = this.data
    if (tp === 'text') {
      this.submitTextComment()
    } else if(tp === 'audio') {
      this.submitAudioComment()
    }
  },
  /**
   * 提交文字评论
   */
  submitTextComment() {
    const data = {
      movie_id: movieId,
      text,
      tp
    }
    commentApi.addComment({
      data
    }).then(res => {
      wx.navigateBack({
        delta: -2
      })
      wx.showModal({
        title: '提示',
        content: '提交成功',
      })
    }).catch(err => {
      wx.showModal({
        title: '提示',
        content: '提交失败, 请重试',
      })
    })
  },
  /**
   * 提交音频评论
   */
  submitAudioComment() {
    const {
      movieId,
      tp,
    } = this.data
   // 声音文件上传先
    const data = {
      filePath: this.data.audio,
      name: `file`
    }
    
    fileApi.upload(data).then(res => {
      const data = {
        movie_id: movieId,
        tp,
        audio_url: res,
        audio_length: this.data.audioLength
      }
      return commentApi.addComment({data})
    }).then(res => {
      wx.navigateBack({
        delta: -2
      })
      wx.showToast({
        title: '提交成功',
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  backEdit() {
    wx.navigateBack({
      delta: -1
    })
  },
  playAudio() {
    playSound(this.data.audio)
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