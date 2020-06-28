<template>
  <div>
    <h2>物品列表</h2> 
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240">
      </el-table-column>
      <el-table-column prop="name" label="物品名称">
      </el-table-column>
      <el-table-column prop="icon" label="图标">
        <!-- 使用template自定义显示内容 -->
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" style="height:3rem;">
      </template>
      </el-table-column>
      <el-table-column label="操作"  align="right" width="200">
        <template  v-slot:="scope">
          <el-button size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
          <el-button size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name:'itemlist',
    data() {
      return {
        items:[]
      }
    },
    // 默认进入页面就要做的事，从服务器获取数据
    methods: {
      async fetch(){
        const res = await this.$http.get('rest/items')
        // 只取data
        this.items= res.data
      },
      async remove(row){
        this.$confirm(`是否删除分类:${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = this.$http.delete(`rest/items/${row._id}`)
          res
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });         
      }
    },
    created() {
      // 执行获取数据
      this.fetch()
    },
  };
</script>
<style>

</style>
