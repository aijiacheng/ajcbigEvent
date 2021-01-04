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
    diff: function (value) {
        return ($(".oldPwd").val() == value) && "新密码和旧密码不能一样"
    },
    // 修改密码页 - 使用
    same: function (value) {
        return ($(".newPwd").val() !== value) && '两次密码不相同'
    },
    ctname: [
        /^[\u4E00-\u9FA5]+$/,
        "分类名只能是中文"
    ],
    aliname: [
        /^[a-z0-9]+$/,
        "小写英文和数字组成"
    ],
    // publisher页面 - 文章标题
    articleTitle: [
        /^[\u4E00-\u9FA5a-zA-Z0-9_-]+$/,
        "标题只能是中英文, 数字下划线中划线组成"
    ],
    // 分类判断
    cate: function () {
        return $("select[name=cate_id]").val().length == 0 && "请选择分类"
    }
})