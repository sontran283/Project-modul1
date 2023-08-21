function drawTable() {
    let products = JSON.parse(localStorage.getItem("product")) || [];
    const userLogin = JSON.parse(localStorage.getItem("userlogin"));

    let stringHTML = "";
    let total = 0;

    userLogin.cart.forEach(element => {
        const product = products.find(e => e.id == element.idProduct);
        total += product.sum * element.quantity;
        stringHTML +=
            `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.sum}$</td>
            <td>${element.quantity}</td>
            <td>${product.sum * element.quantity}$</td>
            <td>
            <button style="color:blue" onclick="beforeEdit(${element.idProduct})"><i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
            <button style="color:red" onclick="onDelete(${element.idProduct})"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
    `;
    });
    document.getElementById("table_body").innerHTML = stringHTML;
    document.getElementById("total_all").innerHTML = total;
}
drawTable();

let indexUpdateGlobal = null;
function onDelete(id) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
        const userLogin = JSON.parse(localStorage.getItem("userlogin"));
        const indexDelete = userLogin.cart.findIndex(e => e.idProduct == id);
        userLogin.cart.splice(indexDelete, 1);

        localStorage.setItem("userlogin", JSON.stringify(userLogin));
        drawTable();
    }
}

function beforeEdit(id) {
    document.getElementById('question').style.display = 'block';

    const userLogin = JSON.parse(localStorage.getItem("userlogin"));
    const indexEdit = userLogin.cart.findIndex(e => e.idProduct == id);
    indexUpdateGlobal = indexEdit;

    document.getElementById('editCount').value = userLogin.cart[indexEdit].quantity;
}

function onUpdate() {
    const userLogin = JSON.parse(localStorage.getItem("userlogin"));

    userLogin.cart[indexUpdateGlobal].quantity = Number(document.getElementById("editCount").value);
    localStorage.setItem("userlogin", JSON.stringify(userLogin));
    indexUpdateGlobal = null;
    onCancel();
    drawTable();
}

function onCancel() {
    document.getElementById('question').style.display = "none";
}


function CheckOut() {
    const carts = JSON.parse(localStorage.getItem("carts")) || [];
    const userLogin = JSON.parse(localStorage.getItem("userlogin"));
    carts.push({
        id: Math.floor(1000 + Math.random() * 8999),
        userId: userLogin.id,
        note: document.getElementById("note").value,
        cart: userLogin.cart,
        status: "Đang chờ xử lý",
        createAt: new Date(),
    });
    userLogin.cart = [];

    localStorage.setItem("carts", JSON.stringify(carts));
    alert("Đơn hàng đã được đặt");
    location.href = "../user/userindex.html";
}

