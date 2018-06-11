const DB = require('../utils/db.js')


// 登录授权接口
module.exports = {
  list: async(ctx, next) => {
    let user = ctx.state.$wxInfo.userinfo.openId
    ctx.state.data = await DB.query('select * from favourite where favourite.user_id = ?', [user])
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