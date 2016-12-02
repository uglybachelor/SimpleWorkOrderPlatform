<template>
  <div>
    <my-header></my-header>
    <div id="client">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">客户详情</span>
          <el-button style="float: right;" type="primary" @click="goToEdit">修改客户信息</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="4"><div class="grid-content"><h3>客户名称</h3></div></el-col>
          <el-col :span="4"><div class="grid-content"><h3>接入类型</h3></div></el-col>
          <el-col :span="4"><div class="grid-content"><h3>预计上线时间</h3></div></el-col>
          <el-col :span="4"><div class="grid-content"><h3>接入状态</h3></div></el-col>
          <el-col :span="4"><div class="grid-content"><h3>工单数量(Active)</h3></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4"><div class="grid-content">{{ client.client_name }}</div></el-col>
          <el-col :span="4"><div class="grid-content">{{ client.type }}</div></el-col>
          <el-col :span="4"><div class="grid-content">{{ client.launch_time }}</div></el-col>
          <el-col :span="4"><div class="grid-content">{{ client.client_status }}</div></el-col>
          <el-col :span="4"><div class="grid-content">{{ active_tickets }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content"><h3>备注</h3></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content">
              <el-tooltip class="item" effect="dark" :content="client.remarks" placement="bottom-end">
                {{ client.remarks }}
              </el-tooltip>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <el-row>
      <el-col :span="6">
        <el-button type="text" @click="goToTickets">查看{{ client.client_name }}相关所有工单</el-button>
      </el-col>
    </el-row>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import TicketList from './TicketList'

export default {
  name: 'client',

  data() {
    return {
      client: {},
      tClient: '',
      active_tickets: 0
    }
  },

  created() {
    this.$http.get('/c/'+this.$route.params.name)
    .then(function(response) {
      this.client = response.body
    }, function(err) {
      console.log('get client info err； ', err)
    })
  },

  methods: {
    goToEdit: function() {
      this.$router.push('/ec/'+this.client.client_name)
    },

    goToTickets: function() {
      this.$router.push('/ts/'+this.client.client_name)
    }
  },

  components: {
    MyHeader,
    MyFooter,
    TicketList
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
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
