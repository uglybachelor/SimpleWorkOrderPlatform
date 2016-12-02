<template>
  <div>
    <my-header></my-header>
    <div id="user">
      <el-row>
        <h3>欢迎使用！</h3>
      </el-row>

      <el-row>
        <el-button type="danger" @click="onSubmit">退出登录</el-button>
      </el-row>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'

export default {
  name: 'user',

  data() {
    return {

    }
  },

  components: {
    MyHeader,
    MyFooter
  },

  methods: {
    onSubmit: function() {
      this.$http.get('/logout')
      .then(function(response) {
        if(response.body.msg == 'success') {
          this.$router.push('/')
        }
      }, function(err) {
        console.log('login err: ', err)
      })
    }
  }
}
</script>
