var express = require('express')
var Promise = require('bluebird')
var moment = require('moment')
var passport = require('passport')
var LocalStrategy = require('passport-local')

var db = require('../models/db')
var util = require('../models/util')
var helper = require('../helper')

var router = express.Router()

//主页
router.get('/', function(req, res, next) {
    res.render('index')
})

//客户详情页
router.all('/c/:name', isLoggedIn)
router.get('/c/:name', function(req, res, next) {
    var name = req.params.name
    util.clientFindOne(name)
    .then(function(result) {
        res.send(result)
    }).catch(function(err) {
        console.log('client page error', err)
    })
})

//客户列表页
// router.all('/cl', isLoggedIn)
router.get('/cl', function(req, res, next) {
    util.clientFindByPage(parseInt(req.query.offset), parseInt(req.query.limit))
    .then(function(results) {
        res.send(results)
    }).catch(function(err) {
        console.log('client_list error', err)
    })
})

//获取总客户数
router.all('/cc', isLoggedIn)
router.get('/cc', function(req, res, next) {
    util.countClients()
    .then(function(result) {
        res.send({ client_count: result })
    }).catch(function(err) {
        console.log('client count err', err)
    })
})

//新建客户页
router.all('/nc', isLoggedIn)
// router.get('/new_client', function(req, res, next) {
//
// })
router.post('/nc', function(req, res, next) {
    var nc = new db.Client({
        client_name: req.body.client_name,
        type: req.body.type,
        launch_time: req.body.launch_time,
        client_status: req.body.client_status,
        remarks: req.body.remarks,
        active_tickets: 0
    })

    util.clientFindOne(req.body.client_name)
    .then(function(result) {
        if(result) {
            res.send({ msg: 'existed' })
            return
        } else {
            return util.clientSave(nc)
        }
    }).then(function(result) {
        res.send({ msg: 'success' })
    }).catch(function(err) {
        console.log('new client err: ', err)
    })
})

//修改客户信息
router.all('/ec/:name', isLoggedIn)
// router.get('/ec/:name', function(req, res, next) {
//
// })
router.post('/ec', function(req, res, next) {
    var ec = {
        type: req.body.type,
        launch_time: req.body.launch_time,
        client_status: req.body.client_status,
        remarks: req.body.remarks
    }

    util.clientUpdate(req.body.client_name, ec)
    .then(function(result) {
        console.log('update client success')
        res.send({ msg: 'success' })
    }).catch(function(err) {
        console.log('update client err: ', err)
    })
})

//工单详情页
router.all('/t/:num', isLoggedIn)
router.get('/t/:num', function(req, res, next) {
    var num = req.params.num
    util.ticketFindOne(num)
    .then(function(result) {
        res.send(result)
    }).catch(function(err) {
        console.log('ticket page error', err)
    })
})

// 工单列表页
// router.all('/tl', isLoggedIn)
router.get('/tl', function(req, res, next) {
    util.ticketFindByPage(parseInt(req.query.offset), parseInt(req.query.limit))
    .then(function(results) {
        res.send(results)
    }).catch(function(err) {
        console.log('ticket_list error', err)
    })
})
router.get('/tl/:name', function(req, res, next) {
    util.ticketFindSome(req.params.name)
    .then(function(results) {
        console.log(results);
        res.send(results)
    }).catch(function(err) {
        console.log('some ticket_list error', err)
    })
})

//获取总工单数
router.all('/tc', isLoggedIn)
router.get('/tc', function(req, res, next) {
    util.countTickets()
    .then(function(result) {
        res.send({ ticket_count: result })
    }).catch(function(err) {
        console.log('ticket count err', err)
    })
})

//新建工单页
router.all('/nt', isLoggedIn)
// router.get('/nt', function(req, res, next) {
//
// })
router.post('/nt', function(req, res, next) {
    var num = helper.ticketNumGen()
    var nt = new db.Ticket({
        ticket_number: num,
        ticket_name: req.body.ticket_name,
        ticket_description: req.body.ticket_description,
        open_time: req.body.open_time,
        schedule_time: req.body.schedule_time,
        close_time: req.body.close_time,
        owner: req.body.owner,
        active: true,
        comments: []
    })

    util.ticketSave(nt)
    .then(function(result) {
        res.send({ msg: 'success', ticket_number: num })
        helper.alertOwner(req.body.owner)
        return util.clientFindOne(req.body.ticket_name)
    }).then(function(result) {
        return util.clientUpdate(req.body.ticket_name, { active_tickets: result.active_tickets+1 })
    }).then(function(result) {
        console.log('active工单数 + 1')
    }).catch(function(err) {
        console.log('new ticket err: ', err)
    })
})

//修改工单信息
router.all('/et', isLoggedIn)
// router.get('/edit_ticket/:num', function(req, res, next) {
//
// })
router.post('/et', function(req, res, next) {
    var nt = {
        ticket_description: req.body.ticket_description,
        schedule_time: req.body.schedule_time,
        close_time: req.body.close_time,
        owner: req.body.owner,
        active: req.body.active,
    }

    Promise.all([util.ticketFindOne(req.body.ticket_number), util.clientFindOne(req.body.ticket_name)])
    .then(function(results) {
        if(results[0].active == req.body.active) {
            return Promise.all([util.ticketUpdate(req.body.ticket_number, nt),
                util.clientUpdate(req.body.ticket_name, { })])
        } else if(results[0].active == false && req.body.active == true) {
            var old_active_tickets = results[1].active_tickets
            return Promise.all([util.ticketUpdate(req.body.ticket_number, nt),
                util.clientUpdate(req.body.ticket_name, { active_tickets: old_active_tickets+1 })])
        } else if(results[0].active == true && req.body.active == false) {
            var old_active_tickets = results[1].active_tickets
            return Promise.all([util.ticketUpdate(req.body.ticket_number, nt),
                util.clientUpdate(req.body.ticket_name, { active_tickets: old_active_tickets-1 })])
        }
    }).then(function(result) {
        console.log('update ticket success')
        helper.alertOwner(req.body.owner)
        res.send({ msg: 'success' })
    }).catch(function(err) {
        console.log('edit ticket err: ', err)
    })
})

//添加评论
router.all('/cm/:num', isLoggedIn)
router.post('/cm/:num', function(req, res, next) {

})

//搜索客户
// router.all('/cs', isLoggedIn)
router.post('/cs', function(req, res, next) {
    util.clientSearch(req.body.term)
    .then(function(results) {
        console.log(results)
        res.send(results)
    }).catch(function(err) {
        console.log('client search error', err)
    })
})

//搜索工单
// router.all('/ts', isLoggedIn)
router.post('/ts', function(req, res, next) {
    util.ticketSearch(req.body.term)
    .then(function(results) {
        res.send(results)
    }).catch(function(err) {
        console.log('ticket search error', err)
    })
})

//用户页面
// router.all('/u/:name', isLoggedIn)
// router.get('/u/:name', function(req, res, next) {
//
// })

//获取用户名
router.get('/h', function(req, res, next) {
    if(req.user) {
        res.send({ user: req.user[0] })
    } else {
        res.send({ msg: 'logged out' })
    }

})

//处理登陆
// router.get('/login', function(req, res, next) {
//
// })
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.send({ msg: 'success' })
})

router.get('/logout', function (req, res) {
    req.logout()
    res.send({ msg: 'success' })
    console.log('登出成功')
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    console.log('未登录')
}

module.exports = router
