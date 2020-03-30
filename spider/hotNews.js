// 获取新浪新闻热点新闻排行
// 导入常量模块
const constant = require("../model/constant");
// 导入 request-promise 模块
const rp = require("request-promise");
// 导入 cheerio 模块
const cheerio = require("cheerio");
// 导入 mongoose 模块
const mongoose = require("mongoose");
// 导入封装的url请求
const req = require('../model/req')
// 导入 数据库文档
const model = require('../model/index')
// 导入词云处理模块
const hotNewsCloud = require('./hotNewsCloud')
// 导入新闻详情处理模块
const savaArticle = require('./savaArticle')

module.exports = () => {
  rp(constant.url).then(async res => {
    // console.log(res);
    // 去除前缀 var all_1_data01 =
    const str = res.replace("var all_1_data01 = ", "");
    // 去除尾部的 ; ,得到 json 字符串
    const jsonStr = str.replace(";", "");
    // console.log(resStr);
    // 获取到 data 的 json 格式
    const dataJson = JSON.parse(jsonStr)["data"];
    // console.log(dataJson)
    // 整理获得有效数据
    const lists = dataJson.map((item, index) => {
      const obj = {}
      obj.num = index
      obj.title = item.title
      obj.url = item.url
      obj.time = item.create_date
      return obj
    })
    // 热点新闻排行列表存储
    const news = new model.newsList({
      date: constant.yearMD,
      lists: lists
    })
    const docLen = await model.newsList.find({ date: constant.yearMD })
    if (docLen.length !== 0) {
      await model.newsList.updateOne({ date: constant.yearMD }, { lists: lists })
    } else {
      await news.save()
    }
    // 获取热点词云并存储
    hotNewsCloud(lists)
    // 保存新闻详情至本地
    await savaArticle(lists)
  });
}