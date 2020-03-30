const constant = require('../model/constant')
const model = require('../model/index')
const sdk = require('../model/sdkInit');
const hotRes = sdk('119-42');

module.exports = () => {
  hotRes.appendText('date', constant.monthD);
  hotRes.post(async data => {
    const thing = data.showapi_res_body.list
    // 热点新闻排行列表存储
    const todayT = new model.todayThing({
      date: constant.monthD,
      things: thing
    })
    const docLen = await model.todayThing.find({ date: constant.monthD })
    if (docLen.length !== 0) {
      await model.todayThing.updateOne({ date: constant.monthD }, { things: thing })
    } else {
      await todayT.save()
    }
  })
}