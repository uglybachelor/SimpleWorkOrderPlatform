<template>
  <div id="ticketlist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">工单列表</span>
        <el-button style="float: right;" type="primary" @click="$router.push('/nt')">新增工单</el-button>
        <el-input placeholder="请输入搜索条件" v-model="term" style="float:right; width: 300px; padding-right: 10px;">
          <el-button slot="append" icon="search" @click="goToSearch"></el-button>
        </el-input>
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

    <br />

    <el-row v-show="!tClient">
      <el-col :span="6" :offset="9">
        <el-pagination
          :current-page="currPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="totalRows"
          @current-change="currPageChange">
        </el-pagination>
      </el-col>
    </el-row>

    <br />
  </div>
</template>

<script>
export default {
  name: 'ticketlist',

  data () {
    return {
      tickets: [],
      currPage: 1,
      pageSize: 10,
      totalRows: 0
    }
  },

  created() {
    this.getPage(0)
    this.getTotal()
  },

  methods: {
    getPage: function(pOffset) {
      this.$http.get('/tl', { params: { offset: pOffset, limit: this.pageSize} })
      .then(function(response) {
        this.tickets = response.body
      }, function(err) {
        console.log('tl gets err: ', err)
      })
    },

    currPageChange: function(currPage) {
      if(currPage == 1) {
        var offset = 0
        this.getPage(offset)
      } else {
        var offset = (currPage-1)*10
        this.getPage(offset)
      }
    },

    getTotal: function() {
      this.$http.get('/tc')
      .then(function(response) {
        this.totalRows = response.body.ticket_count
      }, function(err) {
        console.log('get total rows err', err)
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

    goToSearch: function() {
      this.$router.push('/ts/' + this.term)
    },

    showStatus: function(i) {
      if(this.tickets[i].active) {
        return "开启"
      } else {
        return "关闭"
      }
    }
  }
}
</script>

<style>

</style>
