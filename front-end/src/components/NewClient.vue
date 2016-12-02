<template>
  <div>
    <my-header></my-header>
    <el-alert v-if="show_alert" :title="alert_msg" type="warning" show-icon></el-alert>
    <div id="newclient">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">新建客户</span>
        </div>

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="客户名称">
            <el-input v-model="form.client_name"></el-input>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-select v-model="form.type" placeholder="请选择接入类型">
              <el-option label="类型1" value="类型1"></el-option>
              <el-option label="类型2" value="类型2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计上线时间">
            <el-input v-model="form.launch_time" placeholder="yyyy-MM-DD"></el-input>
          </el-form-item>
          <el-form-item label="客户状态">
            <el-select v-model="form.client_status" placeholder="请选择客户状态">
              <el-option label="前期洽谈" value="前期洽谈"></el-option>
              <el-option label="接入测试" value="接入测试"></el-option>
              <el-option label="功能联调" value="功能联调"></el-option>
              <el-option label="已上线" value="已上线"></el-option>
              <el-option label="已下线" value="已下线"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remarks"></el-input>
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
  name: 'newclient',

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
      if(!this.form.client_name) {
        this.show_alert = true,
        this.alert_msg = "客户名不得为空！"
      } else {
        this.$http.post('/nc', this.form)
        .then(function(response) {
          if(response.body.msg == 'success') {
            var ncUrl = '/c/' + this.form.client_name
            this.$router.push(ncUrl)
          } else if (response.body.msg == 'existed') {
            this.show_alert = true,
            this.alert_msg = "客户已存在，请勿重复创建！"
          }
        }, function(err) {
          console.log('new client err: ', err)
        })
      }
    }
  }
}
</script>

<style>

#newclient {
  width: 40%;
  margin: auto;
}

</style>
