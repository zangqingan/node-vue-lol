//创建axios实例并返回
import axios from 'axios'

//创建实例
const http = axios.create({
    baseURL:'http://localhost:3000/admin/api',
})

export default http