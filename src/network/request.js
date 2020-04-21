import axios from 'axios'

export function request(config,success,failure){
  // 1、创建axios实例
  const  instance = axios.create({
    baseURL:'http://106.54.54.237:8000/api/h8',
    timeout:50000,
  })

// 2、axios的拦截器
// 2.1、请求拦截的作用
  instance.interceptors.request.use(config => {
    // 请求拦截成功
    return config;
  },
    err => {
    // console.log('err :', err);
    })
    // 2.2、响应拦截
    instance.interceptors.response.use(res =>{
      return res.data;
    },err=>{
        console.log('err1 :', err);
      })

  // 3、发送真正的网络请求
  return instance(config);
}


