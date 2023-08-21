let userLogin = JSON.parse(localStorage.getItem("userlogin"));
function checkLogin() {
    if (userLogin.name != undefined) {
        return
    }
    window.location.href = "../../login-logup/loginpage/login.html"
}
checkLogin()

function signOut() {
    let check = confirm("Bạn có chắc chắn muốn đăng xuất không?")
    if (check) {
        localStorage.setItem("userlogin", JSON.stringify(""))
        window.location.href = "../../login-logup/loginpage/login.html"
    }
}
