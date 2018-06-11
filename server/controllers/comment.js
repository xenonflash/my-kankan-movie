const DB = require('../utils/db')

module.exports = {

  /**
   * 添加评论
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let movieId = +ctx.request.body.movie_id
    let text = ctx.request.body.text || null
    let type = ctx.request.body.tp || null
    let audioUrl = ctx.request.body.audio_url || null
    let audioLength = ctx.request.body.audio_length || null

    let images = ctx.request.body.images || []
    images = images.join(';;')


    if (!isNaN(movieId)) {
      await DB.query('INSERT INTO comment(user_id, username, avatar, content, movie_id, type, audio_url, audio_length) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [user, username, avatar, text, movieId, type, audioUrl, audioLength])
    }

    ctx.state.data = {}
  },

  /**
   * 获取评论列表
   */
  list: async ctx => {
    let movieId = +ctx.request.query.movie_id
    let user = +ctx.request.query.user_id

    if (!isNaN(movieId)) {
      if (user) {
        ctx.state.data = await DB.query('select * from comment where comment.movie_id = ? and user_id = ?', [movieId, user])
      } else {
        ctx.state.data = await DB.query('select * from comment where comment.movie_id = ?', [movieId])
      }
    } else {
      ctx.state.data = []
    }
  },
  /**
   * 获取评论列表
   */
  detail: async ctx => {
    let movieId = +ctx.request.query.movie_id

    if (!isNaN(movieId)) {
      ctx.state.data = await DB.query('select * from comment where comment.movie_id = ?', [movieId])
    } else {
      ctx.state.data = []
    }
  },
}