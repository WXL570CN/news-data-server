const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 连接MongoDB
mongoose.connect('mongodb://localhost:27017/sinaNews', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

// 创建新浪新闻热点新闻排行数据库
const newsList = mongoose.model(
  'lists',
  new Schema({
    date: String,
    lists: [{
      num: Number,
      title: String,
      url: String,
      time: String
    }]
  })
)

// 创建新闻关键词数据库
const newsCloud = mongoose.model(
  'clouds',
  new Schema({
    date: String,
    url: {
        type: String,
        default: 'http://tags.news.sina.com.cn/'
    },
    words: []
  })
)

// 创建历史上的今天数据库
const todayThing = mongoose.model(
  'todayThings',
  new Schema({
    date: String,
    things: []
  })
)

// 创建热搜事件数据库
const hotSearchEvent = mongoose.model(
  'hotSearchEvents',
  new Schema({
    hot: {}
  })
)

// 创建高频率出现人名数据库
const hotPeople = mongoose.model(
  'hotPeoples',
  new Schema({
    date: String,
    lists: []
  })
)

// 创建高频率出现游戏名数据库
const hotGame = mongoose.model(
  'hotGames',
  new Schema({
    hot: {}
  })
)

// 高频率出现的机构名
const hotOrg = mongoose.model(
  'hotOrgs',
  new Schema({
    date: String,
    lists: []
  })
)


// 创建高频率出现地区数据库
const placeNewsCount = mongoose.model(
  'placeNewsCounts',
  new Schema({
    date: String,
    lists: []
  })
)

module.exports = {
  newsList,
  newsCloud,
  todayThing,
  hotSearchEvent,
  hotPeople,
  hotGame,
  hotOrg,
  placeNewsCount,
}