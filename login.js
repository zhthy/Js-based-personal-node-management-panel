document.addEventListener('DOMContentLoaded', function() {
    var userData = `
    user1;${md5('123')}
    user2;${md5('password2')}
    user3;${md5('password3')}
    `;

    document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();

    validateCredentials(userData, username, password);
    });

    function validateCredentials(userData, username, password) {
    var lines = userData.trim().split('\n');
    var valid = false;
    lines.forEach(line => {
        var [storedUsername, storedPassword] = line.trim().split(';');
        if (username === storedUsername && md5(password) === storedPassword) {
            valid = true;
            return;
        }
    });

    if (valid) {
        window.location.href = './user/index.html';
    } else {
        alert('Incorrect username or password');
    }
    }

    function md5(str) {
    // 以下为MD5的一个简单实现，不保证与常规MD5库的兼容性和安全性
    var hash = 0;
    if (str.length === 0) {
        return hash;
    }
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
    }
});
