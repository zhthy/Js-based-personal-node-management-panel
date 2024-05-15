document.addEventListener('DOMContentLoaded', function() {
    // 函数用于检查当前 URL 的第一个 ? 后的所有值是否等于 'abc'
    function checkABCInURL() {
        // 获取当前 URL
        var url = window.location.href;

        // 解析 URL 中的查询参数
        var params = new URLSearchParams(url.split('?')[1]);

        // 获取第一个参数的值
        var firstParam = params.keys().next().value;

        // 如果第一个参数不存在或者参数后的值为空，则返回 true
        if (!firstParam || params.getAll(firstParam).length === 0) {
            return true;
        }

        // 获取第一个参数后的所有值，并将它们转换成一个数组
        var paramValues = Array.from(params.getAll(firstParam));

        // 判断所有值是否等于 'abc'
        return paramValues.every(function(value) {
            return value === 'abc';
        });
    }

    // 函数用于重定向到上级目录的 login.html
    function redirectToLogin() {
        window.location.href = '../login.html';
    }

    // 调用函数检查当前 URL 的第一个参数后的所有值是否等于 'abc'
    if (!checkABCInURL()) {
        // 如果不符合条件，则重定向到上级目录的 login.html
        redirectToLogin();
    }
});
