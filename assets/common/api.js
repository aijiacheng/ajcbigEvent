// 整个项目的请求方法
// 调用方法，提供服务器返回的数据

//相同路径部分可以单独抽离，在axios中提供了baseURL方法抽离并在使用url时自动拼接到前面，使用路径时写不同的部分就行
axios.defaults.baseURL = `http://ajax.frontend.itheima.net`

//结构layui框架的提示框方法
const { layer } = window.layui
// 添加请求拦截器
// 请求拦截器，是在请求之前
axios.interceptors.request.use(
    // 型参config是ajax请求
    function (config) {
        // 在发送请求之前添加请求头
        config.headers['Authorization'] = window.localStorage.getItem('token')
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

// 添加响应拦截器
// 响应拦截器，是在响应数据进入then的函数处理之前先处理响应数据
axios.interceptors.response.use(
    //这里函数里面的型参response是返回的响应数据res
    function (response) {
        // 解构响应数据
        const { status, message } = response.data
        layer.msg(message)//layui框架的提示框

        // 如果是注册页面则不执行下面的跳转
        if (response.config.url == '/api/reguser') {
            return response;
        }

        //如果status是1，也就是token失效，则移除token,并跳转到登录页面
        if (status === 1) {
            window.localStorage.removeItem('token')
            window.location.href = './login.html'
        }
        //返回响应数据
        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

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
const getInfoUser = (fn) => {
    axios.get('/my/userinfo', {
        /* //设置请求头，
         headers: {
             Authorization: window.localStorage.getItem('token')
         }
         此处设置请求头使用请求拦截器设置了
         */
    }).then((res) => {
        fn(res);
    })
}

//更新用户基本信息
const getInfouser2 = (data, fn) => {
    axios.post('/my/userinfo', data).then((res) => {
        fn(res);
    })
}
// 重置密码
const rePassword = (data, fn) => {
    axios.post('/my/updatepwd', data).then((res) => {
        fn(res);
    })
}
//上传头像
const upHeadImgAPI = (data, fn) => {
    axios.post('/my/update/avatar', data).then((res) => {
        fn(res);
    })
}
//获取文章类别
const cateListAPI = (fn) => {
    axios.get('/my/article/cates').then((res) => {
        fn(res);
    })
}
//新增文章类别
const addCateAPI = (data, fn) => {
    axios.post('/my/article/addcates', data).then((res) => {
        fn(res);
    })
}
//删除类别
const delCateAPI = (data, fn) => {
    axios.get(`/my/article/deletecate/${data}`).then((res) => {
        fn(res);
    })
}
//编辑类别
const updateCateAPI = (data,fn) => {
    axios.post('/my/article/updatecate',data).then((res)=> {
        fn(res);
    })
}
//发布新文章
const postArticleAdd = (fd,fn) => {
    axios.post('/my/article/add',fd).then((res) => {
        fn(res);
    })
}
//获取文章
const artListAPI = (data,fn) => {
    axios.get('/my/article/list',{
        params: data
    }).then((res) => {
        fn(res);
    })
}
//根据文章id删除文章
const getArticleDelById = (data, fn) => {
    axios.get(`/my/article/delete/${data}`).then((res) => {
        fn(res);
    })
}