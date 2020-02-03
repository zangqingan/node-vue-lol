<template>
  <div>
    <h2>{{id ? '编辑':'新建'}}分类</h2> 
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props:{
      id:{}
    },
    name:'categoryedit',
    data() {
      return {
        model:{},
        parents:[]
      }
    },
    methods: {
      async save(){
        //请求接口提交表单数据，安装axios。
        //如果有id为修改更新使用put接口，否则为新建使用post接口
        let res
        if(this.id){
          res = await this.$http.put(`rest/categories/${this.id}`,this.model)
        }else{
          res = await this.$http.post('rest/categories',this.model)
        }
        res
        //跳转都分类列表页
        this.$router.push('/categories/list')
        // elementui提供的一个提示信息方法
        this.$message({
          type:'success',
           message: '保存成功',
        })
      },
      // 向后端请求分类详情数据
      async fetch(){
        const res = await this.$http.get(`rest/categories/${this.id}`)
        // 只取data
        this.model= res.data
      },
      async fetchParents(){
        const res = await this.$http.get('rest/categories')
        this.parents = res.data
      }
    },
    created() {
      // 执行获取数据
      this.id && this.fetch()
      this.fetchParents()
    },
    
  };
</script>
<style>

</style>
