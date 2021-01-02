// 修改密码验证 - 刚加的验证
var form = layui.form;

form.verify({
    usern: [ // 用户名
        /^[a-z0-9]{6,10}$/,
        '账号名是6到10位由数字, 小写字母组成'
    ],
    pwd: [ // 密码
        /^[\S]{6,10}$/,
        '密码是6到10位, 不能有空格'
    ],
    // 注册页-确认密码
    repwd: function (value) {
        return ($(".pwd").val() !== value) && '两次密码不相同'
    },
    nickn: [ // 昵称
        /^[\u4E00-\u9FA5]+$/,
        '昵称只能是中文'
    ],

    // 修改密码页面使用 - 新旧密码不能一样
    diff: function(value){
        return ($(".oldPwd").val() == value) && "新密码和旧密码不能一样"
    },
    // 修改密码页 - 使用
    same: function(value) {
        return ($(".newPwd").val() !== value) && '两次密码不相同'
    }
})