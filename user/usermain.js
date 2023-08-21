let imgFeature = document.querySelector(".img-feature")
let listImg = document.querySelectorAll(".list-image img")
let prevbtn = document.querySelector(".prev")
let nextbtn = document.querySelector(".next")
let currentIndex = 0;
const products = JSON.parse(localStorage.getItem("product"))


function drawProduct(arr = products) {
    // let stringHTML_A = ""
    // let stringHTML_B = ""
    let productStr = ''
    arr.forEach(e => {
        productStr += `
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
        // if (e.phanloai == "Loại A") {
        //     stringHTML_A +=
        //         `
        //     <div class="fruit-card">
        //         <img style="width: 300px; height: 200px; object-fit: cover;" src="../admin/image/${e.img}" alt="Fresh pineapple">
        //         <h3>${e.name}</h3>
        //         <p style="color: red;">Price:${e.sum}$</p>
        //         <p>The Orange is a popular fruit that comes in various colors and flavors. It is rich in fiber and vitamin C.</p>
        //         <button onclick="addToCart(${e.id})">
        //                 Add to cart 
        //         </button>
        //         <button onclick="saveInfoProduct(${e.id})">
        //             <a style="text-decoration: none; color: white;" href="../introduction/detail.html">
        //                 Product Details
        //             </a>
        //         </button>
        //     </div>
        //         `
        // } else {
        //     stringHTML_B +=
        //         `
        //     <div class="fruit-card1">
        //     <img style="width: 320px; height: 200px; object-fit: cover;"  src="../admin/image/${e.img}" alt="Fresh coconut">
        //     <h3>${e.name}</h3>
        //     <p style="color: red;">Price:${e.sum}$</p>
        //     <p>Dragon are elongated tropical fruits with a sweet taste. They are a great source of potassium and vitamin B6.</p>
        //     <button onclick="addToCart(${e.id})">
        //             Add to cart
        //     </button>
        //     <button onclick="saveInfoProduct(${e.id})">
        //         <a style="text-decoration: none;" href="../introduction/detail.html">
        //             Product Details
        //         </a>
        //     </button>
        //     </div>
        //         `
        // }
    })
    document.getElementById("show-product").innerHTML = productStr
    // document.getElementById("typeB").innerHTML = stringHTML_B
}
drawProduct()


function addToCart(id) {
    const userLogin = JSON.parse(localStorage.getItem("userlogin"))
    if (!userLogin.cart) {
        userLogin.cart = []
    }
    const checkIndex = userLogin.cart.findIndex(e => e.idProduct == id)

    if (checkIndex != -1) {
        alert("Bạn đã mua hàng rồi!")
    } else {
        userLogin.cart.push({
            idProduct: id,
            quantity: 1
        })

        // console.log("==>", userLogin.cart);
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


function showType() {
    const categorys = JSON.parse(localStorage.getItem("categorys"))
    let stringHTML = `<button class='select-type' id='all' onclick="showProduct()">All</button>`
    categorys.forEach(e => {
        stringHTML +=
            `
             <button class='select-type' id='${e.id}' onclick="showProduct(${e.id})">${e.name}</button>
            `
    })
    document.getElementById("btnstatus").innerHTML = stringHTML
}
showType()

function showProduct(id) {
    let type = ''
    const elements = document.getElementsByClassName('select-type')
    Array.from(elements).forEach(el => el.classList.remove('active'))
    if (id) {
        const currentType = JSON.parse(localStorage.getItem("categorys")).find(el => el.id === id)
        if (!currentType) {
            return
        }
        type = currentType.name
        document.getElementById(id).classList.add('active')
    } else {
        document.getElementById('all').classList.add('active')
    }

    const products = JSON.parse(localStorage.getItem("product"))
    let data
    if (type === '') {
        data = products
    } else {
        data = products.filter(e => e.phanloai.includes(type))
    }

    let stringHTML = "No Record"
    if (data.length > 0) {
        stringHTML = ''
        data.forEach(e => {
            stringHTML +=
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
            </div>`
        })
    }

    document.getElementById("show-product").innerHTML = stringHTML
}
