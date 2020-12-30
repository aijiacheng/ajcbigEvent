/*
   1. 注册/登录 表单 切换
*/
$('#goto-register').on('click', () => {
    $('#register').stop().show();
});
$('#goto-login').on('click', () => {
    $('#register').stop().hide();
})


/*
   2. 验证输入框
*/
//引用layui.js之后，会将layui对象挂载在window上,使用结构对象将layui对象里的form对象结构出来，使用方便
const { form } = window.layui
form.verify({
    usern: [//用户名
        /^[a-z0-9]{6,10}$/,
        '账号名是6到10位由数字, 小写字母组成'
    ],
    pwd: [//密码
        /^[\S]{6,10}$/,
        '密码是6到10位, 不能有空格'
    ],
    //注册页-确认密码
    repwd: function (value) {
        //这里使用函数是因为不光要获取这个规则对应的标签的值，还要Jq获取另一个标签的值
        return ($('.pwd').val() !== value) && '两次密码不相同'
    }
})

/*
   3. 注册-提交
*/
$("#register .layui-form").on('submit', e => {
    //在form表单中的按钮会有默认行为，需要禁止
    e.preventDefault();
    //因为后台需要key=value&key=value的提交字符串，所以将输入框的值用对象存起来转换类型方便
    let data = {
        username: $("#register input[name=username]").val(),//input[name=username]属性选择器
        password: $("#register input[name=password]").val()
    }
    /*
    //转换成key=value&key=value字符串
    let arr = [];
    //遍历对象
    for (const key in data) {
        arr.push(`${key}=${data[key]}`);
    }
    let argString = arr.join('&');
    此处封装成了一个公用方法
    */
    //使用封装的数据格式处理函数
    const dataStr = objToArg(data)

    //使用封装的注册请求函数
    postReguser(dataStr, (res) => {
        // 结构对象赋值
        const { status, message } = res.data
        console.log( res );
        if (status === 0) {
            // 显示登录页面 - 让用户登录
            $("#register").stop().hide();
        } else {
            $('#login input[name=username]').val('')
            $('#login input[name=password]').val('')
        }
    })

})

/*
   4. 登录
*/
$('#login .layui-form').on('submit', (e) => {
    //阻止默认行为
    e.preventDefault();
    //获取表单输入框的数据
    const data = {
        username: $('#login input[name=username]').val(),
        password: $('#login input[name=password]').val(),
    }
    /*
    //遍历对象
    let arr = [];
    for (const key in data) {
        //此处遍历对象只能使用data[key]方法取对象的值,因为key是个变量，所以不能用点语法
        arr.push(`${key}=${data[key]}`)
    }
    const dataStr = arr.join('&')//数组的join方法是将数组的每一项拼接成字符串
    console.log(dataStr);
    此处封装成一个公用方法
    */
    //使用数据格式处理函数
    const dataStr = objToArg(data);

    //使用封装的登录数据请求函数
    postLogin(dataStr, (res) => {
        //将返回的数据解构
        const { status, message, token } = res.data
        

        if (status === 0) {
            //每个用户都有一个唯一的token与之对应，有时候是需要token来实现功能的，所以需要存储起来
            //不同页面都需要使用的数据，用localStorage方法存储
            //localStorage将保存的数据 存到浏览器里的某个位置F12->Application->localStorage
            //特点：永久存储(网页关掉 再打开 还有这个数据)
            //setltem('key值',要存储的数据)
            window.localStorage.setItem('token',token)

            //跳转到首页
            setTimeout(() => {
                window.location.href = './index.html'
            }, 1000)

        } else {
            layer.msg(message);
            $('#login input[name=username]').val('')
            $('#login input[name=password]').val('')
        }
    })
})