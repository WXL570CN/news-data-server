var Segment = require('segment');
const fs = require('fs')
const arrProcessing = require('../model/arrProcessing')
const model = require('../model')
const constant = require('../model/constant')

// 创建实例
var segment = new Segment();
// 配置，可根据实际情况增删，详见segment.useDefault()方法
segment.use('URLTokenizer');  // 载入识别模块，详见lib/module目录，或者是自定义模块的绝对路径
segment.loadStopwordDict(constant.stopPath);
segment.loadDict(constant.dictPath); // 载入字典，详见dicts目录，或者是自定义字典文件的绝对路径
segment.useDefault();

fs.readFile(constant.articlePath, 'utf-8', async (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const arr = segment.doSegment(data, {
      // 去除指定词
      stripStopword: true,
      // 去除标点
      stripPunctuation: true
    })
    const cities = [
      '北京',
      '天津',
      '河北',
      '山西',
      '内蒙古',
      '辽宁',
      '吉林',
      '黑龙江',
      '上海',
      '江苏',
      '浙江',
      '安徽',
      '福建',
      '江西',
      '山东',
      '河南',
      '湖北',
      '湖南',
      '重庆',
      '四川',
      '贵州',
      '云南',
      '西藏',
      '陕西',
      '甘肃',
      '青海',
      '宁夏',
      '新疆',
      '广东',
      '广西',
      '海南',
      '香港',
      '澳门',
      '台湾'
    ]
    // 地名
    const placeArr = []
    let placEndArr = []
    // 人名
    const peopleArr = []
    let peopleEndArr = []
    // 机构
    const orgArr = []
    let orgEndArr = []
    // 根据词性划分分词词组
    arr.forEach(element => {
      // 地名词性为64
      if (element.p == 64 && cities.indexOf(element.w) !== -1) {
        placeArr.push(element.w)
      }
      // 人名词性为128
      if (element.p == 128) {
        peopleArr.push(element.w)
      }
      // 机构词性为32
      if(element.p == 32) {
        orgArr.push(element.w)
      }
    });
    // 数组处理
    placEndArr = arrProcessing(placeArr)
    peopleEndArr = arrProcessing(peopleArr)
    orgEndArr = arrProcessing(orgArr)
    // console.log(endArr)
    // 热点新闻地区分布存储
    const count = new model.placeNewsCount({
      date: constant.yearMD,
      lists: placEndArr
    })
    const placeDocLen = await model.placeNewsCount.find({ date: constant.yearMD })
    if (placeDocLen.length !== 0) {
      await model.placeNewsCount.updateOne({ date: constant.yearMD }, { lists: placEndArr })
    } else {
      await count.save()
    }
    // 热点人物存储
    const people = new model.hotPeople({
      date: constant.yearMD,
      lists: peopleEndArr
    })
    const peopleDocLen = await model.hotPeople.find({ date: constant.yearMD })
    if (peopleDocLen.length !== 0) {
      await model.hotPeople.updateOne({ date: constant.yearMD }, { lists: peopleEndArr })
    } else {
      await people.save()
    }
    // 热点机构存储
    const org = new model.hotOrg({
      date: constant.yearMD,
      lists: orgEndArr
    })
    const orgDocLen = await model.hotOrg.find({ date: constant.yearMD })
    if (orgDocLen.length !== 0) {
      await model.hotOrg.updateOne({ date: constant.yearMD }, { lists: orgEndArr })
    } else {
      await org.save()
    }
  }
})