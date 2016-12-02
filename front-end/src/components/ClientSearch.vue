<template>
  <div>
    <my-header></my-header>
    <div id="clientsearch">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">客户搜索结果列表</span>
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
    </div>

    <br />
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
export default {
  name: 'clientsearch',

  data () {
    return {
      clients: []
    }
  },

  methods: {
    getPage: function() {
      this.$http.post('/cs', { term: this.$route.params.name } )
      .then(function(response) {
        this.clients = response.body
      }, function(err) {
        console.log('cs gets err: ', err)
      })
    },

    goToClient: function(i) {
      var name = this.clients[i].client_name
      this.$router.push('/c/'+name)
    },

    goToEdit: function(i) {
      var name = this.clients[i].client_name
      this.$router.push('/ec/'+name)
    }
  },

  created() {
    this.getPage()
  },

  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style>

</style>
