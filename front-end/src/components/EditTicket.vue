<template>
  <div>
    <my-header></my-header>
    <div id="editticket">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">修改工单信息</span>
        </div>

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="工单编号">
            <el-input v-model="form.ticket_number" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="form.ticket_name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="开启时间">
            <el-input v-model="form.open_time" placeholder="yyyy-MM-DD" :disabled="true"></el-input>
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
          <el-form-item label="工单状态">
            <el-switch v-model="form.active" on-text="open" off-text="close"></el-switch>
          </el-form-item>
          <el-form-item label="工单描述">
            <el-input type="textarea" v-model="form.ticket_description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即提交</el-button>
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
  name: 'editticket',

  data() {
    return {
      form: {}
    }
  },

  components: {
    MyHeader,
    MyFooter
  },

  created() {
    this.$http.get('/t/'+this.$route.params.num)
    .then(function(response) {
      this.form = response.body
    }, function(err) {
      console.log('edit ticket err: ', err)
    })
  },

  methods: {
    onSubmit: function() {
      this.$http.post('/et', this.form)
      .then(function(response) {
        if(response.body.msg == 'success') {
          var ntUrl = '/t/' + this.form.ticket_number
          this.$router.push(ntUrl)
        } else {
          console.log('服务器更新工单失败')
        }
      }, function(err) {
        console.log('edit ticket err: ', err)
      })
    }
  }
}
</script>

<style>

#editticket {
  width: 40%;
  margin: auto;
}

</style>
