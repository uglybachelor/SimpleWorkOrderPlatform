var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    username: String,
    password: String,
    capacity: String,
    category: String,
    phone: String
})

var clientSchema = new Schema({
    client_name: String,
    type: String,
    launch_time: String,
    client_status: String,
    active_tickets: Number,
    remarks: String
})

var ticketSchema = new Schema({
    ticket_number: Number,
    ticket_name: String,
    ticket_description: String,
    open_time: String,
    schedule_time: String,
    close_time: String,
    owner: String,
    active: Boolean,
    comments: [{
        user: String,
        content: String,
        time: String
    }]
})

var User = mongoose.model('User', userSchema),
    Client = mongoose.model('Client', clientSchema),
    Ticket = mongoose.model('Ticket', ticketSchema)

var admin = new User({ username: 'admin', password: '123', capacity: '管理员', category: '管理员', phone: '18600192935' })
var cj = new User({ username: '蔡杰', password: 'caijie', capacity: '主管', category: '主管', phone: '15813849723' })

var zzh = new User({ username: '周正海', password: 'zhouzhenghai', capacity: '售前', category: '售前', phone: '18600192935' })
var gf = new User({ username: '龚非', password: 'gongfei', capacity: '售前', category: '售前', phone: '13910727158' })

var lt = new User({ username: '刘涛', password: 'liutao', capacity: '技术', category: '总监', phone: '18928495951' })
var yxb = new User({ username: '杨雪兵', password: 'yangxuebing', capacity: '技术', category: '业务组', phone: '13632778621' })
var wxb = new User({ username: '吴晓波', password: 'wuxiaobo', capacity: '技术', category: 'CB Owner', phone: '15123864695' })
var lls = new User({ username: '林凌舒', password: 'linlingshu', capacity: '技术', category: '95-业务组 Owner', phone: '15815573123' })
var fyq = new User({ username: '奉尧奇', password: 'fengyaoqi', capacity: '技术', category: 'Android Owner', phone: '18988752327' })
var kxw = new User({ username: '康小武', password: 'kangxiaowu', capacity: '技术', category: 'IOS Owner', phone: '18666024535' })
var cjw = new User({ username: '陈家伟', password: 'chenjiawei', capacity: '技术', category: 'SIP&云通知 Owner', phone: '15112665350' })
var czz = new User({ username: '程振中', password: 'chengzhenzhong', capacity: '技术', category: 'SIP Owner', phone: '18565682850' })

var sxy = new User({ username: '宋晓芸', password: 'songxiaoyun', capacity: '产品', category: '产品', phone: '13736157898' })
var fl = new User({ username: '冯璐', password: 'fenglu', capacity: '产品', category: '产品', phone: '18511588570' })
var zxy = new User({ username: '朱晓艳', password: 'zhuxiaoyan', capacity: '产品', category: '总监', phone: '18923776300' })

var zy = new User({ username: '郑洋', password: 'zhengyang', capacity: '商务', category: '商务', phone: '15901509083' })
var ljn = new User({ username: '李晋宁', password: 'lijinning', capacity: '商务', category: '商务', phone: '18588207533' })
var sw = new User({ username: '盛伟', password: 'shengwei', capacity: '商务', category: '商务', phone: '13129554432' })

var users = [admin, cj, zzh, gf, lt, yxb, wxb, lls, fyq, kxw, cjw, czz, sxy, fl, zxy, zy, ljn, sw]

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/platform')
mongoose.set('debug', true)

var db = mongoose.connection

db.on('error', function () {
        console.log('error')
    })

db.once('open', function () {
        console.log('opened')

        User.find(null, function(err, user) {
            if(err) {
                console.log('初始注入错误', err)
            } else {
                if(!user[0]) {
                    for(user of users) {
                        user.save(function(err) {
                            if(err) {
                                console.log('初始注入错误', err)
                            } else {
                                console.log('初始注入成功')
                            }
                        })
                    }
                } else {
                    User.remove({}, function(err) {
                        if(err) {
                            console.log('初始注入错误', err)
                        } else {
                            for(user of users) {
                                user.save(function(err) {
                                    if(err) {
                                        console.log('初始注入错误', err)
                                    } else {
                                        console.log('初始注入成功')
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    })

module.exports = {
    User: User,
    Client: Client,
    Ticket: Ticket
}
