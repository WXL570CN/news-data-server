const constant = require('../model/constant')
const model = require('../model/index')
const sdk = require('../model/sdkInit');
const hotRes = sdk('313-2');

module.exports = () => {
  hotRes.appendText('typeId', '1');
  hotRes.post(function (data) {
    const obj = {}
    obj['nowSearch'] = data.showapi_res_body.list
    hotRes.appendText('typeId', '341');
    hotRes.post(function (data) {
      obj['todaySearch'] = data.showapi_res_body.list
      hotRes.appendText('typeId', '42');
      hotRes.post(function (data) {
        obj['sevenSearch'] = data.showapi_res_body.list
        hotRes.appendText('typeId', '342');
        hotRes.post(function (data) {
          obj['manLiveSearch'] = data.showapi_res_body.list
          hotRes.appendText('typeId', '344');
          hotRes.post(function (data) {
            obj['funSearch'] = data.showapi_res_body.list
            hotRes.appendText('typeId', '11');
            hotRes.post(async data => {
              obj['sportSearch'] = data.showapi_res_body.list
              // 热搜事件存储
              const hotSE = new model.hotSearchEvent({
                hot: obj
              })
              const docLen = await model.hotSearchEvent.find({})
              if (docLen.length !== 0) {
                await model.hotSearchEvent.updateOne({ hot: obj })
              } else {
                await hotSE.save()
              }
            })
          })
        })
      })
    })
  })
}







