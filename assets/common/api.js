// 整个项目的请求方法
// 调用方法，提供服务器返回的数据

//相同路径部分可以单独抽离，在axios中提供了baseURL方法抽离并在使用url时自动拼接到前面，使用路径时写不同的部分就行
axios.defaults.baseURL = `http://ajax.frontend.itheima.net`

//结构layui框架的提示框方法
const {layer} = window.layui
// 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 结构响应数据
//     const { status, message } = response.data
//     layer.msg(message)//layui框架的提示框

//     if ( status === 1 ) {
//         window.localStorage.removeItem('token')
//         window.location.href = '/login.html'
//     }
//     return response;
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });
//注册请求
const postReguser = function (data, fn) {
    //axios请求方法一
    axios({
        method: 'post',
        data: data,
        url: '/api/reguser'
    }).then(function (res) {
        //回调函数,使用回调函数可以获取异步操作的值
        fn(res);
        //异步操作：因为 定时器、ajax请求、事件,等不是一开始就执行的，需要触发才可以执行。所以从外部获取这三个里面的数据是获取不到的（undefinde）,这种情况需要调用型参函数，将所要的结果进行传递

    })
}

//登录请求
const postLogin = (data, fn) => {
    //axios请求方法二
    axios.post('/api/login', data).then((res) => {
        //回调函数，原因同上
        fn(res);
    })
}

//用户登录数据获取请求
const getInfoUser = (fn) =>{
    axios.get('/my/userinfo',{
        //设置请求头，
        headers: {
            Authorization:window.localStorage.getItem('token')
        }
    }).then((res)=> {
         fn(res);
    })
}
