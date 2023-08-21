function showInfo() {
    const id = JSON.parse(localStorage.getItem("id_product_detail"))
    const products = JSON.parse(localStorage.getItem("product"))

    const product = products.find(e => e.id == id)

    console.log(product);

    document.getElementById("image").src = `../admin/image/${product.img}`
    document.getElementById("name").innerHTML = `${product.name}`
    document.getElementById("price").innerHTML = `${product.sum}`
    document.getElementById("maSP").innerHTML = `${product.id}`
}
showInfo()

let idProductDetail = JSON.parse(localStorage.getItem("id_product_detail"))

function addToCart() {

    const userLogin = JSON.parse(localStorage.getItem("userlogin"))

    const checkIndex = userLogin.cart.findIndex(e => e.idProduct == idProductDetail)

    if (checkIndex != -1) {
        alert("đã mua hàng rồi!")
    } else {
        userLogin.cart.push({
            idProduct: idProductDetail,
            quantity: 1
        })

        console.log("==>", userLogin.cart);
        localStorage.setItem("userlogin", JSON.stringify(userLogin))
        alert("Oke !")
    }
}