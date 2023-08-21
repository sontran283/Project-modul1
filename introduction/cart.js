const btn = document.querySelectorAll("button");
btn.forEach(function (button, index) {
    button.addEventListener("click", function (event) {
        var btnItem = event.target
        var product = btnItem.parentElement
        var productImg = product.querySelector("img").src
        var productName = product.querySelector("p").innerText
        var productPrice = product.querySelector("span").innerText
        addCart(productPrice, productImg, productName)
    })
})

function addCart(productPrice, productImg, productName) {
    var addtr = document.createElement("tr")
    var trcontent = `       <tr>
                                    <td>1</td>
                                    <td>#L001</td>
                                    <td>Sản phẩm 1</td>
                                    <td>12$</td>
                                    <td>2</td>
                                    <td>24$</td>
                                    <td><button>Sửa</button></td>
                                    <td><button>Xóa</button></td>
                                    <td><button>anpha b</button></td>
                                </tr>`
    addtr.innerHTML = trcontent
    var cartTable = document.querySelector("tbody")
    cartTable.append(addtr)
}













