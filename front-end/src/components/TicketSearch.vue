<template>
  <div>
    <my-header></my-header>
    <div id="ticketsearch">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">工单搜索结果列表</span>
        </div>
        <div>
          <el-table :data="tickets" border style="width: 100%">
            <el-table-column fixed="left" prop="ticket_number" label="工单编号" width="150"></el-table-column>
            <el-table-column prop="ticket_name" label="客户名称"></el-table-column>
            <el-table-column prop="ticket_description" show-overflow-tooltip label="工单描述" width="220"></el-table-column>
            <el-table-column prop="open_time" label="开启时间"></el-table-column>
            <el-table-column prop="schedule_time" label="预计解决时间"></el-table-column>
            <el-table-column prop="close_time" label="关闭时间"></el-table-column>
            <el-table-column inline-template label="Active状态">
              <p>{{ showStatus($index) }}</p>
            </el-table-column>
            <el-table-column prop="owner" label="Owner"></el-table-column>
            <el-table-column inline-template fixed="right" label="操作" width="100">
              <span>
                <el-button type="text" size="small" @click="goToTicket($index)">查看</el-button>
                <el-button type="text" size="small" @click="goToEdit($index)">编辑</el-button>
              </span>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>

    <br />
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'

export default {
  name: 'ticketlist',

  data () {
    return {
      tickets: [],
    }
  },

  created() {
    this.getPage()
  },

  methods: {
    getPage: function(pOffset) {
      this.$http.post('/ts', { term: this.$route.params.name })
      .then(function(response) {
        this.tickets = response.body
      }, function(err) {
        console.log('ts gets err: ', err)
      })
    },

    goToTicket: function(i) {
      var num = this.tickets[i].ticket_number
      this.$router.push('/t/'+num)
    },

    goToEdit: function(i) {
      var num = this.tickets[i].ticket_number
      this.$router.push('/et/'+num)
    },

    showStatus: function(i) {
      if(this.tickets[i].active) {
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

</style>
