// 数组处理封装
// 将数组处理成对象数组
// 对象为{ name:String, value: Number }格式
module.exports = arr => {
  const obj = {}
  const endArr = []
  arr.map((a) => {
    if (a in obj) {
      obj[a]++
    } else {
      obj[a] = 1
    }
  })
  for (const key in obj) {
    const endObj = {
      name: key,
      value: obj[key]
    }
    endArr.push(endObj)
  }
  return endArr
}