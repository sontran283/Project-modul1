let users = JSON.parse(localStorage.getItem('users')) || [];

const handleLogin = () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (username.trim() === "" || password.trim() === "") {
        document.getElementById("error").innerText = "Tên đăng nhập hoặc mật khẩu không được để trống";
        return;
    }

    let userLogin = checkLogin(username, password)
    if (userLogin == null) {
        document.getElementById("error").innerText = "Tên đăng nhập hoặc mật khẩu không chính xác , vui lòng thử lại";
        return;
    }
    localStorage.setItem("userlogin", JSON.stringify(userLogin))

    if (userLogin.phanloai === "quan tri vien") {
        location.href = "../../admin/adminpage/index.html"
    } else {
        location.href = "../../user/userindex.html"
    }
}

const checkLogin = (username, password) => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.name === username && user.honame === password) {
            return user;
        }
    }
    return null;
}