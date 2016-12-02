<template>
  <div>
    <my-header></my-header>
    <div id="ticket">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">工单详情</span>
          <el-button style="float: right;" type="primary" @click="goToEdit">修改工单信息</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="4"><div class="grid-content"><h3>工单编号</h3></div></el-col>
          <el-col :span="4"><div class="grid-content"><h3>客户名称</h3></div></el-col>
          <el-col :span="4"><div class="grid-content"><h3>开启时间</h3></div></el-col>
          <el-col :span="4"><div class="grid-content"><h3>预计解决时间</h3></div></el-col>
          <el-col :span="4"><div class="grid-content"><h3>关闭时间</h3></div></el-col>
          <el-col :span="4"><div class="grid-content"><h3>Owner</h3></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4"><div class="grid-content">{{ ticket.ticket_number }}</div></el-col>
          <el-col :span="4"><div class="grid-content">{{ ticket.ticket_name }}</div></el-col>
          <el-col :span="4"><div class="grid-content">{{ ticket.open_time }}</div></el-col>
          <el-col :span="4"><div class="grid-content">{{ ticket.schedule_time }}</div></el-col>
          <el-col :span="4"><div class="grid-content">{{ ticket.close_time }}</div></el-col>
          <el-col :span="4"><div class="grid-content">{{ ticket.owner }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content"><h3>状态</h3></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content">{{ showStatus(ticket) }}</div></el-col>
        </el-row>
      </el-card>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'

export default {
  name: 'ticket',

  data() {
    return {
      ticket: {}
    }
  },

  created() {
    this.$http.get('/t/'+this.$route.params.num)
    .then(function(response) {
      this.ticket = response.body
    }, function(err) {
      console.log('get ticket info err； ', err)
    })
  },

  methods: {
    goToEdit: function() {
      var num = this.ticket.ticket_number
      this.$router.push('/et/'+num)
    },

    showStatus: function(t) {
      if(t.active) {
        return "开启"
      } else {
        return "关闭"
      }
    }
  },

  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
