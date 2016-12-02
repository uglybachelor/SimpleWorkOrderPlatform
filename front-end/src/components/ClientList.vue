<template>
  <div id="clientlist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">客户列表</span>
        <el-button style="float: right;" type="primary" @click="$router.push('/nc')">新增客户</el-button>
        <el-input placeholder="请输入搜索条件" v-model="term" style="float:right; width: 300px; padding-right: 10px;">
          <el-button slot="append" icon="search" @click="goToSearch"></el-button>
        </el-input>
      </div>
      <div>
        <el-table :data="clients" border style="width: 100%">
          <el-table-column prop="client_name" fixed="left" label="客户名称"></el-table-column>
          <el-table-column prop="type" label="接入类型"></el-table-column>
          <el-table-column prop="launch_time" label="预计上线时间"></el-table-column>
          <el-table-column prop="client_status" label="接入状态"></el-table-column>
          <el-table-column prop="active_tickets" label="工单数量(Active)"></el-table-column>
          <el-table-column inline-template fixed="right" label="操作" width="100">
            <span>
              <el-button type="text" size="small" @click="goToClient($index)">查看</el-button>
              <el-button type="text" size="small" @click="goToEdit($index)">编辑</el-button>
            </span>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <br />

    <el-row>
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
  name: 'clientlist',

  data () {
    return {
      clients: [],
      currPage: 1,
      pageSize: 10,
      totalRows: 0
    }
  },

  methods: {
    getPage: function(pOffset) {
      this.$http.get('/cl', { params: { offset: pOffset, limit: 10} } )
      .then(function(response) {
        this.clients = response.body
      }, function(err) {
        console.log('cl gets err: ', err)
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
      this.$http.get('/cc')
      .then(function(response) {
        this.totalRows = response.body.client_count
      }, function(err) {
        console.log('get total rows err', err)
      })
    },

    goToClient: function(i) {
      var name = this.clients[i].client_name
      this.$router.push('/c/'+name)
    },

    goToEdit: function(i) {
      var name = this.clients[i].client_name
      this.$router.push('/ec/'+name)
    },

    goToSearch: function() {
      this.$router.push('/cs/' + this.term)
    }
  },

  created() {
    this.getPage(0)
    this.getTotal()
  },

  components: {

  }
}
</script>

<style>

</style>
