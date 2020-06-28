<template>
  <div>
    <h2>{{id ? '编辑':'新建'}}物品</h2> 
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- action属性绑定上传地址 -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    name:'itemedit',
    data() {
      return {
        model:{
          name:'',
          icon:''
        },
      }
    },
    methods: {
      async afterUpload(res){
        // window.console.log(res)
        // 在上传图标上显示上传图片
        this.model.icon = res.url
        // 使用 $set 显性添加属性
        // this.$set(this.model,'icon',req.url)
      },
      async save(){
        //请求接口提交表单数据，安装axios。
        //如果有id为修改更新使用put接口，否则为新建使用post接口
        let res
        if(this.id){
          res = await this.$http.put(`rest/items/${this.id}`,this.model)
        }else{
          res = await this.$http.post('rest/items',this.model)
        }
        res
        //跳转都分类列表页
        this.$router.push('/items/list')
        // elementui提供的一个提示信息方法
        this.$message({
          type:'success',
           message: '保存成功',
        })
      },
      // 向后端请求分类详情数据
      async fetch(){
        const res = await this.$http.get(`rest/items/${this.id}`)
        // 只取data
        this.model= res.data
      },
    },
    created() {
      // 执行获取数据
      this.id && this.fetch()
    },
    
  };
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
