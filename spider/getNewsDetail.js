const req = require('../model/req')

// 根据对应url爬取详情页面数据
module.exports = async url => {
  try {
    const $ = await req(url)
    // 去除进入专题内容
    $('.wap_special').remove()
    // 获取文章标题
    const title = $('.main-title').text()
    // console.log(title)
    const html = $.html('#article')
    return {
      title,
      html
    }
  } catch (error) {
    console.log(error)
  }
}