import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import $ from 'jquery'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import Home from './components/Home'
import NewClient from './components/NewClient'
import Client from './components/Client'
import EditClient from './components/EditClient'
import NewTicket from './components/NewTicket'
import Ticket from './components/Ticket'
import EditTicket from './components/EditTicket'
import Login from './components/Login'
import User from './components/User'
import ClientSearch from './components/ClientSearch'
import TicketSearch from './components/TicketSearch'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

const myRouter = new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/nc', component: NewClient },
        { path: '/c/:name', component: Client },
        { path: '/ec/:name', component: EditClient },
        { path: '/nt', component: NewTicket },
        { path: '/t/:num', component: Ticket },
        { path: '/et/:num', component: EditTicket },
        { path: '/login', component: Login },
        { path: '/u', component: User},
        { path: '/cs/:name', component: ClientSearch },
        { path: '/ts/:name', component: TicketSearch }
    ]
})

const app = new Vue({
  router: myRouter
}).$mount('#root')
