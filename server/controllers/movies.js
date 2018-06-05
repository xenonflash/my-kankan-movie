const DB = require('../utils/db.js')


// 登录授权接口
module.exports = {
  hello: async (ctx, next) => {
    const data = await DB.query("SELECT * FROM movies;")
    ctx.state.data = data
  }
}