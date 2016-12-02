/*
helper module:

1. generate random number based on date for work order ticket number.
2. alert ticket owner, if you have a messaging api.
*/


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
        var content = encodeURI('Your work order has been updated!')
        var requestUrlDing = 'http://xxx/'
        console.log(requestUrlDing)
        request.get({
            url: requestUrlDing
        }, function(err, response, body) {
            if(err) {
                console.log('alert msg err', err)
                return
            } else if(response.statusCode != 200) {
                console.log('alert msg err statusCode: ', response.statusCode)
            } else {
                console.log('alert msg statusCode: ', response.statusCode)
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
