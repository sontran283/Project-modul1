let imgFeature = document.querySelector(".img-feature")
let listImg = document.querySelectorAll(".list-image img")
let prevbtn = document.querySelector(".prev")
let nextbtn = document.querySelector(".next")
let currentIndex = 0;
const products = JSON.parse(localStorage.getItem("product"))


function drawProduct(arr = products) {
    let stringHTML_A = ""
    let stringHTML_B = ""
    arr.forEach(e => {
        if (e.phanloai == "Loại A") {
            stringHTML_A +=
                `
            <div class="fruit-card">
                <img style="width: 300px; height: 200px; object-fit: cover;" src="../admin/image/${e.img}" alt="Fresh pineapple">
                <h3>${e.name}</h3>
                <p style="color: red;">Price:${e.sum}$</p>
                <p>The Orange is a popular fruit that comes in various colors and flavors. It is rich in fiber and vitamin C.</p>
                <button onclick="addToCart(${e.id})">
                        Add to cart 
                </button>
                <button onclick="saveInfoProduct(${e.id})">
                    <a style="text-decoration: none; color: white;" href="../introduction/detail.html">
                        Product Details
                    </a>
                </button>
            </div>
                `
        } else {
            stringHTML_B +=
                `
            <div class="fruit-card1">
            <img style="width: 320px; height: 200px; object-fit: cover;"  src="../admin/image/${e.img}" alt="Fresh coconut">
            <h3>${e.name}</h3>
            
            <p style="color: red;">Price:${e.sum}$</p>
            <p>Dragon are elongated tropical fruits with a sweet taste. They are a great source of potassium and vitamin B6.</p>
            <button onclick="addToCart(${e.id})">
                
                    Add to cart
                
            </button>
            <button onclick="saveInfoProduct(${e.id})">
                <a style="text-decoration: none;" href="../introduction/detail.html">
                    Product Details
                </a>
            </button>
            </div>
                `
        }
    })
    document.getElementById("typeA").innerHTML = stringHTML_A
    document.getElementById("typeB").innerHTML = stringHTML_B
}
drawProduct()


function addToCart(id) {
    const userLogin = JSON.parse(localStorage.getItem("userlogin"))
    const users = JSON.parse(localStorage.getItem("users"))

    const checkIndex = userLogin.cart.findIndex(e => e.idProduct == id)

    if (checkIndex != -1) {
        alert("Bạn đã mua hàng rồi!")
    } else {
        userLogin.cart.push({
            idProduct: id,
            quantity: 1
        })

        console.log("==>", userLogin.cart);
        localStorage.setItem("userlogin", JSON.stringify(userLogin))
        alert("Đã thêm, vui lòng kiểm tra giỏ hàng!")
    }
}


function saveInfoProduct(id) {
    localStorage.setItem("id_product_detail", JSON.stringify(id))
}


function updateImageByIndex(index) {
    document.querySelectorAll('.list-image div').forEach(item => {
        item.classList.remove('active')
    })
    currentIndex = index
    imgFeature.src = listImg[index].getAttribute('src');
    listImg[index].parentElement.classList.add('active')
}
listImg.forEach((imgElement, index) => {
    imgElement.addEventListener('click', e => {
        updateImageByIndex(index)
    })
});


nextbtn.addEventListener('click', e => {
    if (currentIndex == 0) {
        currentIndex = listImg.length - 1
    } else {
        currentIndex--
    }
    updateImageByIndex(currentIndex)
})


prevbtn.addEventListener('click', e => {
    if (currentIndex == listImg.length - 1) {
        currentIndex = 0
    } else {
        currentIndex++
    }
    updateImageByIndex(currentIndex)
})


setInterval(() => {
    if (currentIndex == listImg.length - 1) {
        currentIndex = 0
    } else {
        currentIndex++
    }
    updateImageByIndex(currentIndex)
}, 5000)


let userLogin = JSON.parse(localStorage.getItem("userlogin"));
function checkLogin() {
    if (userLogin.name != undefined) {
        return
    }
    window.location.href = "../login-logup/loginpage/login.html"
}
checkLogin()
document.getElementById("userLoginName").innerHTML = userLogin.name


function logOut() {
    let check = confirm("Bạn có chắc chắn muốn đăng xuất không?")
    if (check) {
        localStorage.setItem("userlogin", JSON.stringify(""))
        window.location.href = "../login-logup/loginpage/login.html"
    }
}


function checkSearch() {
    let text = document.getElementById("search").value;
    let foundOrder = products.filter(ord => ord.name.toLowerCase().includes(text.trim().toLowerCase()));
    drawProduct(foundOrder);
    document.location.href = "#another"
}
document.getElementById("search").addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        checkSearch()
    }
})


let hidenA = document.querySelectorAll(".hidenA")
let hidenB = document.querySelectorAll(".hidenB")
function typeAB() {
    hidenA[0].style.display = "block"
    hidenA[1].style.display = "flex"
    hidenB[0].style.display = "block"
    hidenB[1].style.display = "flex"
    location.href = "#btnstatus"
}
function typeAA() {
    hidenA[0].style.display = "block"
    hidenA[1].style.display = "flex"
    hidenB[0].style.display = "none"
    hidenB[1].style.display = "none"
    location.href = "#btnstatus"
}
function typeBB() {
    hidenA[0].style.display = "none"
    hidenA[1].style.display = "none"
    hidenB[0].style.display = "block"
    hidenB[1].style.display = "flex"
    location.href = "#btnstatus"
}

