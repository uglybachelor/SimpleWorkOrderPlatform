<template>
  <div id="myheader">
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><el-button type="text" @click="$router.push('/')">Simple Work Order Platform</el-button></el-menu-item>
      <el-menu-item index="2" style="float:right">
        <el-button v-show="!showUser" type="text" @click="$router.push('/login')">请登录</el-button>
        <el-button v-show="showUser" type="text" @click="$router.push('/u')">{{ username }}</el-button>
      </el-menu-item>
    </el-menu>

    <br />
  </div>
</template>

<script>
export default {
  name: 'myheader',

  data() {
    return {
      username: '',
      showUser: false
    }
  },

  created() {
    this.$http.get('/h')
    .then(function(response) {
      if(response.body.user) {
        this.username = response.body.user.username,
        this.showUser = true
      } else {
        this.showUser = false
      }
    }, function(err) {
      console.log('get username err', err)
    })
  },


}
</script>
