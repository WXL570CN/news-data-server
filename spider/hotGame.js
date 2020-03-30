// 获取当前热度高的游戏
const constant = require('../model/constant')
const model = require('../model/index')
const sdk = require('../model/sdkInit');
const hotRes = sdk('313-2');

module.exports = () => {
  hotRes.appendText('typeId', '62');
  hotRes.post(data => {
    const obj = {}
    obj['网络游戏'] = data.showapi_res_body.list
    hotRes.appendText('typeId', '524');
    hotRes.post(data => {
      obj['手机游戏'] = data.showapi_res_body.list
      hotRes.appendText('typeId', '451');
      hotRes.post(data => {
        obj['单机游戏'] = data.showapi_res_body.list
        hotRes.appendText('typeId', '173');
        hotRes.post(async data => {
          obj['网页游戏'] = data.showapi_res_body.list
          // 高频率出现游戏名存储
          const game = new model.hotGame({
            hot: obj
          })
          const docLen = await model.hotGame.find({})
          if (docLen.length !== 0) {
            await model.hotGame.updateOne({ hot: obj })
          } else {
            await game.save()
          }
        })
      })
    })
  })
}




