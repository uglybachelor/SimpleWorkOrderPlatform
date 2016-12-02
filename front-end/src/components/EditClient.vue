<template>
  <div>
    <my-header></my-header>
    <div id="editclient">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">修改客户信息</span>
        </div>

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="客户名称">
            <el-input v-model="form.client_name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-select v-model="form.type" placeholder="请选择业务类型">
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
  name: 'editclient',

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
    this.$http.get('/c/'+this.$route.params.name)
    .then(function(response) {
      this.form = response.body
    }, function(err) {
      console.log('edit client err: ', err)
    })
  },

  methods: {
    onSubmit: function() {
      this.$http.post('/ec', this.form)
      .then(function(response) {
        if(response.body.msg == 'success') {
          var ncUrl = '/c/' + this.form.client_name
          this.$router.push(ncUrl)
        } else {
          console.log('服务器更新用户失败')
        }
      }, function(err) {
        console.log('edit client err: ', err)
      })
    }
  }
}
</script>

<style>

#editclient {
  width: 40%;
  margin: auto;
}

</style>
