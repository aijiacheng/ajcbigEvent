/*
   1. 注册/登录 表单 切换
*/
$('#goto-register').on('click',() => {
    $('#register').stop().show();
});
$('#goto-login').on('click',() => {
    $('#register').stop().hide();
})