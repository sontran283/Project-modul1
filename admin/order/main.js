// const data = [
//     { id: 1, name: "Le A", sum: "119.000", phanloai: "loai A", time: "12/03/2023", date: "12/02/2023", time1: "12/03/2023", datetime: "12/03/2023", "note": "Note 1" },
//     { id: 2, name: "Le A", sum: "112.000", phanloai: "loai B", time: "12/03/2023", date: "12/02/2023", time1: "12/03/2023", datetime: "12/03/2023", "note": "Note 2" },
//     { id: 3, name: "Le A", sum: "112.000", phanloai: "loai B", time: "12/03/2023", date: "12/02/2023", time1: "12/03/2023", datetime: "12/03/2023", "note": "Note 3" },
//     { id: 4, name: "Le A", sum: "112.000", phanloai: "loai B", time: "12/03/2023", date: "12/02/2023", time1: "12/03/2023", datetime: "12/03/2023", "note": "Note 4" }
// ];


function showTable() {
    const idUserlogin = JSON.parse(localStorage.getItem("userlogin")) || [];
    const carts = JSON.parse(localStorage.getItem("carts")) || [];
    const products = JSON.parse(localStorage.getItem("product"))

    let str = ""
    for (let i = 0; i < carts.length; i++) {
        let e = carts[i];

        let stringTenSP = ""
        let giaSP = ""
        let total = 0
        e.cart.forEach(element => {
            const product = products.find(e => e.id == element.idProduct)
            stringTenSP +=
                `
                <p>${product.name} (${element.quantity})</p>
                `
            giaSP +=
                `
                <p>${product.sum}</p>
                `
            total += product.sum * element.quantity
        });

        str +=
            `
        <tr>
        <td>${e.id}</td>
        <td>${stringTenSP}</td>
        <td>${giaSP}</td>
        <td>${e.createAt}</td>
        <td>${Number(total).toLocaleString('vi-VN')}$</td>
        <td>${e.note}</td>
        <td>${e.status}</td>
        <td>
            <div class="action_col">
                <button class="btn btn_sua" onclick="receive(${e.id})">Recive</button>
                <button class="btn btn_xoa" onclick="deny(${e.id})">Deny</button>
            </div>
        </td>
        </tr>
        `
    };
    document.getElementById("table_body").innerHTML = str
}
showTable();


function receive(id) {
    const order = JSON.parse(localStorage.getItem("carts"));
    const index = order.findIndex(e => e.id == id);
    if (index !== -1) {
        order[index].status = "Đã nhận đơn";
        localStorage.setItem("carts", JSON.stringify(order));
        showTable();
    }
}


function deny(id) {
    const order = JSON.parse(localStorage.getItem("carts"));
    const index = order.findIndex(e => e.id == id);
    if (index !== -1) {
        order[index].status = "Đã hủy đơn";
        localStorage.setItem("carts", JSON.stringify(order));
        showTable();
    }
}


function deleteProduct(id) {
    const data = JSON.parse(localStorage.getItem("product")) || []
    const carts = JSON.parse(localStorage.getItem("carts")) || [];

    const indexDelete = carts.findIndex(e => e.id == id)
    const result = confirm(`Delete ${carts[indexDelete].name}`)
    if (result) {
        data.splice(indexDelete, 1)
    }
    localStorage.setItem("product", JSON.stringify(dcartsata))
    showTable()
    location.reload();
}

