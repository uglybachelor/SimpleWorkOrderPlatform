<template>
  <div>
    <my-header></my-header>
    <el-alert v-if="show_alert" :title="alert_msg" type="warning" show-icon></el-alert>
    <div id="newticket">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">新建工单</span>
        </div>

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="客户名称">
            <el-input v-model="form.ticket_name"></el-input>
          </el-form-item>
          <el-form-item label="开启时间">
            <el-input v-model="form.open_time" placeholder="yyyy-MM-DD"></el-input>
          </el-form-item>
          <el-form-item label="预计解决时间">
            <el-input v-model="form.schedule_time" placeholder="yyyy-MM-DD"></el-input>
          </el-form-item>
          <el-form-item label="关闭时间">
            <el-input v-model="form.close_time" placeholder="yyyy-MM-DD"></el-input>
          </el-form-item>
          <el-form-item label="Owner">
            <el-input v-model="form.owner"></el-input>
          </el-form-item>
          <el-form-item label="工单描述">
            <el-input type="textarea" v-model="form.ticket_description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
  name: 'newticket',

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
      if(!this.form.open_time) {
        this.show_alert = true,
        this.alert_msg = '开启时间不得为空！'
      } else {
        this.$http.post('/nt', this.form)
        .then(function(response) {
          if(response.body.msg == 'success') {
            var ntUrl = '/t/' + response.body.ticket_number
            this.$router.push(ntUrl)
          } else {
            console.log('服务器新建用户失败')
          }
        }, function(err) {
          console.log('new ticket err: ', err)
        })
      }
    }
  }
}
</script>

<style>

#newticket {
  width: 40%;
  margin: auto;
}

</style>
