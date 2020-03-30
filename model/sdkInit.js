'use strict';

var showapiSdk = require('showapi-sdk');

var appId='158305';
var secret='8374d7421f9e45f18a58d1810497a113';
if(!(appId&&secret)){
  console.error('id错误！')
  return;
}

//全局默认设置
module.exports =  id => {
  showapiSdk.setting({
    url:'http://route.showapi.com/' + id,
    appId:appId,
    secret:secret,
    timeout:5000,//http超时设置
    options:{
      testParam:'test'
    }
  })
  return showapiSdk.request()
}