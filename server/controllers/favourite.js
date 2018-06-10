const DB = require('../utils/db.js')


// 登录授权接口
module.exports = {
  list: async (ctx, next) => {
    ctx.state.data = [
      {
        cover: 'https://p55u3vy2u.bkt.clouddn.com/mp/kankan/p1461851991.webp',
        title: "瓦力",
        text: '这是个好电影',
        type: 'text',
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKcNkSO9e4X6VE2tqXJBvibswm8cRkrJmX4HHcL1OXickHMt0JVtTc4AnNPdVNaKbtFEW0g6R0Zb9Qw/132",
        userName: 'KC'
      },
      {
        cover: 'https://p55u3vy2u.bkt.clouddn.com/mp/kankan/p1461851991.webp',
        title: "瓦力",
        type: 'audio',
        audioLength: 15,
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKcNkSO9e4X6VE2tqXJBvibswm8cRkrJmX4HHcL1OXickHMt0JVtTc4AnNPdVNaKbtFEW0g6R0Zb9Qw/132",
        userName: 'KC'
      },
    ]
  },
  add: async (ctx, next) => {
    
  }
}