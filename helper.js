var util = require('./models/util')
var request = require('request')

var randomNum = function() {
    return Math.round(Math.random()*10000)
}

var ticketNumGen = function() {
    return (new Date()).valueOf()
}

var alertOwner = function(user_name) {
    util.findUser(user_name).then(function(user) {
        var content = encodeURI('工单更新提醒：与你相关的工单有更新，请到源通讯项目管理平台查看：http://123.56.238.87:3000/')
        var requestUrlDing = 'http://123.56.19.101:5000/ding2?secret=fskd2endprx&phone=' + user[0].phone + '&content=' + content
        console.log(requestUrlDing)
        request.get({
            url: requestUrlDing
        }, function(err, response, body) {
            if(err) {
                console.log('dingding msg err', err)
                return
            } else if(response.statusCode != 200) {
                console.log('dingding msg err statusCode: ', response.statusCode)
            } else {
                console.log('dingding msg statusCode: ', response.statusCode)
            }
        })
    }).catch(function(err) {
        console.log('alert owner err', err)
    })
}

module.exports = {
    randomNum,
    ticketNumGen,
    alertOwner
}
