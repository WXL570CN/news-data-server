const express = require('express')
const router = express.Router()
const constant = require('../model/constant')
const model = require('../model/index')
const getDetail = require('../model/getNewsDetail')

// 新闻列表
router.get('/news', function(req, res){
    model.newsList.find({date: constant.yearMD}, function(err, doc){
        if(err){
            res.json({
                status: '404',
                msg: err.message
            })
        } else{
            res.json({
                meta: {
                    "msg": '',
                    "status": 200
                },
                data: {
                    count: doc.length,
                    list: doc[0]
                }
            })
        }
    })
})
// 新闻详情
router.post('/newsDetail', async function(req, res) {
    const url = req.body.url
    const obj = await getDetail(url)
    console.log(obj)
    res.json({
        meta: {
            "msg": '',
            "status": 200
        },
        data: obj
    })
})
// 新闻关键词
router.get('/cloud', function(req, res){
    model.newsCloud.find({date: constant.yearMD}, function(err, doc){
        if(err){
            res.json({
                status: '404',
                msg: err.message
            })
        } else{
            res.json({
                meta: {
                    "msg": '',
                    "status": 200
                },
                data: {
                    count: doc.length,
                    list: doc[0]
                }
            })
        }
    })
})
// 历史上的今天
router.get('/todayThing', function(req, res){
    model.todayThing.find({date: constant.monthD}, function(err, doc){
        if(err){
            res.json({
                status: '404',
                msg: err.message
            })
        } else{
            res.json({
                meta: {
                    "msg": '',
                    "status": 200
                },
                data: {
                    count: doc.length,
                    list: doc[0]
                }
            })
        }
    })
})
// 网络热搜事件
router.get('/hotSearchEvent', function(req, res){
    model.hotSearchEvent.find({}, function(err, doc){
        if(err){
            res.json({
                status: '404',
                msg: err.message
            })
        } else{
            res.json({
                meta: {
                    "msg": '',
                    "status": 200
                },
                data: {
                    count: doc.length,
                    list: doc[0]
                }
            })
        }
    })
})
// 热点人名
router.get('/hotPeople', function(req, res){
    model.hotPeople.find({date: constant.yearMD}, function(err, doc){
        if(err){
            res.json({
                status: '404',
                msg: err.message
            })
        } else{
            res.json({
                meta: {
                    "msg": '',
                    "status": 200
                },
                data: {
                    count: doc.length,
                    list: doc[0]
                }
            })
        }
    })
})
// 网络热搜游戏
router.get('/hotGame', function(req, res){
    model.hotGame.find({}, function(err, doc){
        if(err){
            res.json({
                status: '404',
                msg: err.message
            })
        } else{
            res.json({
                meta: {
                    "msg": '',
                    "status": 200
                },
                data: {
                    count: doc.length,
                    list: doc[0]
                }
            })
        }
    })
})
// 热点机构
router.get('/hotOrg', function(req, res){
    model.hotOrg.find({date: constant.yearMD}, function(err, doc){
        if(err){
            res.json({
                status: '404',
                msg: err.message
            })
        } else{
            res.json({
                meta: {
                    "msg": '',
                    "status": 200
                },
                data: {
                    count: doc.length,
                    list: doc[0]
                }
            })
        }
    })
})
// 热点新闻地区分布
router.get('/newsDistribute', function(req, res){
    model.placeNewsCount.find({date: constant.yearMD}, function(err, doc){
        if(err){
            res.json({
                status: '404',
                msg: err.message
            })
        } else{
            res.json({
                meta: {
                    "msg": '',
                    "status": 200
                },
                data: {
                    count: doc.length,
                    list: doc[0]
                }
            })
        }
    })
})

module.exports = router
