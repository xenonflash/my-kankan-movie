const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const movieApi = require('../../api/movie.api.js')
const commentApi = require('../../api/comment.api.js')

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotMovie:null,
    commentInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '侃侃电影',
    })
    this.getHotMovie()
  },
  getHotMovie() {
    movieApi.getMovieList().then(res => {
      if (res && res.length) {
        this.setData({
          hotMovie: res[0]
        })
        return res[0]
      }
    }).then(hot => {
      const data = {
        movie_id: hot.id,
      }
      return commentApi.getCommentList({ data })
    }).then(res => {
      if (res && res.length) {
        this.setData({
          commentInfo: res[0]
        })
      }
    })
  },
  /**
   * 跳转到推荐者评论详情
   */
  toComment() {
    const { hotMovie = {}, commentInfo = {} } = this.data
    const { id: movieId, title, image} = hotMovie
    const { user_id: userId, username, avatar, type, content, audio_url:audioUrl, audio_length: audioLength, id} = commentInfo
    let url = `/pages/comment-detail/comment-detail?id=${id}&movie_id=${movieId}&user=${userId}&title=${title}&image=${image}&username=${username}&avatar=${avatar}&tp=${type}`
    if (type === 'text') {
      url += `&text=${content}`
    } else if (type === 'audio') {
      url += `&audio_url=${audioUrl}&audio_length=${audioLength}`
    }
    console.log(url)
    wx.navigateTo({ url })
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
    wx.setNavigationBarTitle({
      title: '看看侃侃电影',
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