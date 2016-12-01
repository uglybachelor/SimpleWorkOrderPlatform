var Promise = require('bluebird')
var express = require('express')
var db = require('../models/db')

var defaultItemsPerPage = 10

var clientFindByPage = function(offset, limit) {
    return new Promise(function(resolve, reject) {
        db.Client.find(null, null, { sort: { launch_time: -1 }, limit: limit, skip: offset }, function(err, clients) {
            if(err) {
                reject(err)
            } else {
                resolve(clients)
            }
        })
    })
}

var ticketFindByPage = function(offset, limit) {
    return new Promise(function(resolve, reject) {
        db.Ticket.find(null, null, { sort: { active: -1 }, limit: limit, skip: offset }, function(err, tickets) {
            if(err) {
                reject(err)
            } else {
                resolve(tickets)
            }
        })
    })
}

var clientFindOne = function(name) {
    return new Promise(function(resolve, reject) {
        db.Client.findOne({ client_name: name }, function(err, client) {
            if(err) {
                reject(err)
            } else {
                resolve(client)
            }
        })
    })
}

var ticketFindOne = function(num) {
    return new Promise(function(resolve, reject) {
        db.Ticket.findOne({ ticket_number: num }, function(err, ticket) {
            if(err) {
                reject(err)
            } else {
                resolve(ticket)
            }
        })
    })
}

var ticketFindSome = function(c_name) {
    return new Promise(function(resolve, reject) {
        db.Ticket.find({ ticket_name: c_name }, null, { sort: { active: -1 } }, function(err, tickets) {
            if(err) {
                reject(err)
            } else {
                resolve(tickets)
            }
        })
    })
}

var clientSave = function(client) {
    return new Promise(function(resolve, reject) {
        client.save(function(err) {
            if(err) {
                reject(err)
            } else {
                resolve('success')
            }
        })
    })
}

var clientUpdate = function(name, new_client) {
    return new Promise(function(resolve, reject) {
        db.Client.findOneAndUpdate({ client_name: name }, new_client, function(err) {
            if(err) {
                reject(err)
            } else {
                resolve('success')
            }
        })
    })
}

var ticketSave = function(ticket) {
    return new Promise(function(resolve, reject) {
        ticket.save(function(err) {
            if(err) {
                reject(err)
            } else {
                resolve('success')
            }
        })
    })
}

var ticketUpdate = function(num, new_ticket) {
    return new Promise(function(resolve, reject) {
        db.Ticket.findOneAndUpdate({ ticket_number: num }, new_ticket, function(err) {
            if(err) {
                reject(err)
            } else {
                resolve('success')
            }
        })
    })
}

var countClients = function(c_name) {
    return new Promise(function(resolve, reject) {
        if(c_name) {
            db.Client.count({ client_name: { $regex: c_name } }, function(err, count) {
                if(err) {
                    reject(err)
                } else {
                    resolve(count)
                }
            })
        } else {
            db.Client.count(function(err, count) {
                if(err) {
                    reject(err)
                } else {
                    resolve(count)
                }
            })
        }
    })
}

var countTickets = function(c_name, is_active) {
    return new Promise(function(resolve, reject) {
        if(c_name && is_active) {
            db.Ticket.count({ ticket_name: { $regex: c_name }, active: is_active }, function(err, count) {
                if(err) {
                    reject(err)
                } else {
                    resolve(count)
                }
            })
        } else if(c_name && !is_active) {
            db.Ticket.count({ ticket_name: { $regex: c_name } }, function(err, count) {
                if(err) {
                    reject(err)
                } else {
                    resolve(count)
                }
            })
        } else if(!c_name && is_active) {
            db.Ticket.count({ active: is_active }, function(err, count) {
                if(err) {
                    reject(err)
                } else {
                    resolve(count)
                }
            })
        } else {
            db.Ticket.count(function(err, count) {
                if(err) {
                    reject(err)
                } else {
                    resolve(count)
                }
            })
        }

    })
}

var clientSearch = function(param) {
    return new Promise(function(resolve, reject) {
        db.Client.find({ client_name: { $regex: param } }, function(err, clients) {
            if(err) {
                reject(err)
            } else {
                resolve(clients)
            }
        })
    })
}

var ticketSearch = function(param) {
    return new Promise(function(resolve, reject) {
        db.Ticket.find({ ticket_name: { $regex: param } }, function(err, tickets) {
            if(err) {
                reject(err)
            } else {
                resolve(tickets)
            }
        })
    })
}

var findUser = function(username) {
    return new Promise(function(resolve, reject) {
        db.User.find({ username: username }, function(err, user) {
            if(err) {
                reject(err)
            } else {
                resolve(user)
            }
        })
    })
}

module.exports = {
    clientFindByPage,
    ticketFindByPage,
    clientFindOne,
    ticketFindOne,
    ticketFindSome,
    clientSave,
    clientUpdate,
    ticketSave,
    ticketUpdate,
    countClients,
    countTickets,
    clientSearch,
    ticketSearch,
    findUser
}
