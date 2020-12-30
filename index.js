//判断sessionStorage没有值，就说明没有通过登录的方式进入页面

if (!window.localStorage.getItem('token')) {
    console.log('aaa');
    window.location.href = './login.html'
}

// 使用封装的获取用户登录数据的请求
getInfoUser((res) => {
    //解构服务器返回的数据
    let { email, id, nickname, user_pic, username } = res.data.data
    console.log(res);
    if (nickname === '') {
        nickname = username
    }
    // 将获取到的用户名添加到页面
    $('.username').text(nickname);
    // 如果没有头像就显示用户名的首字母大写
    if (user_pic === null) {
        $('.avatar').html(nickname[0].toUpperCase()).css('display','inline-block')

    } else {
        $('.avatar').hide()
        //如果有就直接将img的路径修改并显示
        $('.layui-nav-img').attr('src', user_pic).show();
    }
})

// 退出
$('#logout').on('click', () => {
    //使用layui框架的提示框
    layer.confirm('确定退出？', { icon: 1, title: '提示' }, function () {
        //移除token
        window.localStorage.removeItem('token');    
        //跳转到login页面
        window.location.href = './login.html';        
    });

})