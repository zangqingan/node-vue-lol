<template>
  <div>
    <h2>分类列表</h2> 
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240">
      </el-table-column>
      <el-table-column prop="parent.name" label="上级分类">
      </el-table-column>
      <el-table-column prop="name" label="分类名称">
      </el-table-column>
      <el-table-column label="操作"  align="right" width="200">
        <template  v-slot:default="scope">
          <el-button size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
          <el-button size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name:'categorylist',
    data() {
      return {
        items:[]
      }
    },
    // 默认进入页面就要做的事，从服务器获取数据
    methods: {
      async fetch(){
        const res = await this.$http.get('rest/categories')
        // 只取data
        this.items= res.data
      },
      async remove(row){
        this.$confirm(`是否删除分类:${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = this.$http.delete(`rest/categories/${row._id}`)
          res
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })          
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
