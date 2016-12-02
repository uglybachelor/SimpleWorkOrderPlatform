<template>
  <div>
    <my-header></my-header>
    <el-alert v-if="show_alert" :title="alert_msg" type="warning" show-icon></el-alert>
    <div id="login">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">登陆</span>
        </div>

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'

export default {
  name: 'login',

  data() {
    return {
      form: {},
      show_alert: false,
      alert_msg: ''
    }
  },

  components: {
    MyHeader,
    MyFooter
  },

  methods: {
    onSubmit: function() {
      if(!this.form.username || !this.form.password) {
        this.show_alert = true,
        this.alert_msg = '登陆名或密码不得为空！'
      } else {
        this.$http.post('/login', this.form)
        .then(function(response) {
          if(response.body.msg == 'success') {
            this.$router.push('/u')
          } else {
            console.log('登陆失败')
            this.show_alert = true,
            this.alert_msg = '登陆失败！'
          }
        }, function(err) {
          console.log('login err: ', err)
        })
      }
    }
  }
}
</script>

<style>

#login {
  width: 30%;
  margin: auto;
}

</style>
