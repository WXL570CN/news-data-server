// 获取热点新闻排行中每篇新闻的关键词
const constant = require('../model/constant')
const model = require('../model/index')
const req = require('../model/req')

module.exports = lists => {
  // 热点词
  let words = [];
  const cloud = new model.newsCloud({
    date: constant.yearMD,
    words: words
  })
  // 获取词云并存储
  lists.forEach(async item => {
    try {
      const $ = await req(item.url)
      $("#keywords > a").each((index, item) => {
        words.push($(item).text());
      });
      const docLen = await model.newsCloud.find({ date: constant.yearMD })
      if (docLen.length !== 0) {
        await model.newsCloud.updateOne({ date: constant.yearMD }, { words: words })
      } else {
        await cloud.save()
      }
    } catch (error) {
      console.log(error)
    }
  })
}