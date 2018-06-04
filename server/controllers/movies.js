
// 登录授权接口
module.exports = {
  hello: async (ctx, next) => {
    ctx.state.data = 'hello'
  }
}