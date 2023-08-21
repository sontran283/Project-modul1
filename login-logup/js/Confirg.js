let users = JSON.parse(localStorage.getItem('users')) || [];
let admin = {
    id: getNewId(),
    name: username,
    email: email,
    full_name: fullName,
    honame: password,
    phanloai: "khach hang",
    avatar: "avatar.jpg",
    time: "06:59",
    datetime: "2023-08-15T06:59",
    cart: []
}