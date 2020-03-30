// 封装一个根据对象数组中对象的value值排序的函数
// 第一个参数为对象数组
// 第二个对象为升降序，false为降序，true为升序，默认为升序
// 与sort方法搭配使用，该函数放置在sort中
module.exports = (attr, rev) => {
  if (rev == undefined) {
    rev = 1;
  } else {
    rev = (rev) ? 1 : -1;
  }
  return function (a, b) {
    a = a[attr];
    b = b[attr];
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev * 1;
    }
    return 0;
  }
}