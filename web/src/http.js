import axios from 'axios'

let config = {
    baseURL: 'http://127.0.0.1:3007/api/web/',
};

const http = axios.create(config);

//配置请求的参数
http.interceptors.request.use(config => {
    //配置token
    if (localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token');
    }
    return config;
}, error => {
    return Promise.reject(error);
})
//配置响应的参数
http.interceptors.response.use(response => {
    //当token过期或者不存在时，后台返回状态码401，此时页面跳转到登录页面
    if (response.status === 401) {
        Notification({
            message: "登录信息已过期,请重新登录",
            type: "error",
        });
        return;
    }
    return response
}, error => {
    return Promise.reject(error);
});
export default http