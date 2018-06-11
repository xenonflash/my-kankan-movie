/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://f3l9mccl.qcloud.la';
var prefix = '/mpapi'

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        user: `${host}/mpapi/user`,
        movie: `${host}/mpapi/movie`,
        comment: `${host}/mpapi/comment`,
        currComment: `${host}/mpapi/commentOfCurrUser`,
        fav: `${host}/mpapi/fav`,
        // 登录地址，用于建立会话
        loginUrl: `${host}/mpapi/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/mpapi/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/mpapi/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/mpapi/upload`
    }
};

module.exports = config;
