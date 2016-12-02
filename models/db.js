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

//add your user info here, so when the system init, the users will be added to mongodb
var admin = new User({ username: 'admin', password: '123', capacity: 'admin', category: 'admin', phone: '123456' })

var users = [admin]

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
