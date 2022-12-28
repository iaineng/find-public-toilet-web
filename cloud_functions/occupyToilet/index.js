// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await wx.cloud.database()
    .collection('using_toilet')
    .add({
      data: {
        address: event.address,
        started_at: event.startedAt,
        finished_at: event.finishedAt,
        is_using: true,
        _openid: wxContext.OPENID,
      }
    })
}
