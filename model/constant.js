// 导入时间模块
const date = require('date-and-time')
// 导入 path 模块
const path = require('path')
const yearMD = date.format(new Date(), 'YYYYMMDD')
const monthD = date.format(new Date(), 'MMDD')
// const time = '20200202'
// 每日新闻url
const url = `http://top.news.sina.com.cn/ws/GetTopDataList.php?top_type=day&top_cat=www_www_all_suda_suda&top_time=${yearMD}&top_show_num=100&top_order=DESC&js_var=all_1_data01`;
// 新闻详情存储路径
const p = path.resolve(__dirname, '..')
const articlePath = `${p}\\public\\article\\${yearMD}.txt`

module.exports = { yearMD, monthD, url, articlePath }