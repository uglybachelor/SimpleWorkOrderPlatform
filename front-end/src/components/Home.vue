<template>
  <div>
    <my-header></my-header>
    <div id="home">
      <client-list></client-list>
      <ticket-list></ticket-list>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import ClientList from './ClientList'
import TicketList from './TicketList'

export default {
  name: 'home',

  data () {
    return {

    }
  },

  created() {
    this.$http.get('/h')
    .then(function(response) {
      if(response.body.msg == 'logged out') {
        this.$router.push('/login')
      } 
    }, function(err) {
      console.log('get username err', err)
    })
  },

  method: {

  },

  components: {
    MyHeader,
    MyFooter,
    ClientList,
    TicketList
  }
}
</script>

<style>

#home {
  margin: auto;
}

</style>
