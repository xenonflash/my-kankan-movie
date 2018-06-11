const DB = require('../utils/db.js')


// 登录授权接口
module.exports = {
  list: async (ctx, next) => {
    const data = await DB.query("SELECT * FROM movies;")
    ctx.state.data = data
  },
  detail: async (ctx, next) => {
    const id = +ctx.params.id
    let data
    if (!isNaN(id)){
      data = (await DB.query('select * from movies where movies.movie_id = ?', [id]))[0]
    } else {
      data = {}
    }
    ctx.state.data = data
  }
}