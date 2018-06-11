const DB = require('../utils/db.js')


// 登录授权接口
module.exports = {
  list: async(ctx, next) => {
    let user = ctx.state.$wxInfo.userinfo.openId
    const scope = ['comment.comment_id as comment_id', 'title', 'image', 'type', 'username', 'avatar', 'content', 'audio_url', 'audio_length']
    ctx.state.data = await DB.query('SELECT '+ scope.join(',') +' FROM `favourite`, `comment`, `movies` WHERE favourite.user_id= ? AND favourite.comment_id = comment.comment_id AND comment.movie_id = movies.movie_id' , [user])
  },
  add: async(ctx, next) => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let commentId = +ctx.request.body.comment_id

    if (!isNaN(commentId)) {
      await DB.query('INSERT INTO favourite(user_id, comment_id) VALUES (?, ?)', [user, commentId])
    }

    ctx.state.data = {}
  }
}