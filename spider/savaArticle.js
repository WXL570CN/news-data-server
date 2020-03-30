const constant = require('../model/constant')
const req = require('../model/req')
const fs = require('fs')

module.exports = async lists => {
  try {
    // 获取新闻详情并存储
    lists.forEach(async item => {
      try {
        const $ = await req(item.url)
        fs.appendFile('./spider/article/test.txt', $("#article > p").text(), function (err) {
          if (err) {
              console.log(err);
          }
        })
      } catch (error) {
        console.log(error)
      }
    })
  } catch (err) {
    console.log(err)
  }
}