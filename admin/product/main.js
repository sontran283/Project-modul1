// const data = [
//     { id: 1, name: "Nguyen van A", sum: "119.000", phanloai: "loai A", time: "12/03/2023", date: "12/02/2023" },
//     { id: 2, name: "Nguyen van b", sum: "112.000", phanloai: "loai B", time: "12/03/2023", date: "12/02/2023" },
//     { id: 3, name: "Nguyen van b", sum: "112.000", phanloai: "loai B", time: "12/03/2023", date: "12/02/2023" },
//     { id: 4, name: "Nguyen van b", sum: "112.000", phanloai: "loai B", time: "12/03/2023", date: "12/02/2023" }
// ];


const data = JSON.parse(localStorage.getItem("product")) || []
let indexUpdateGlobal = null
const inputName = document.getElementById("name")
const inputSum = document.getElementById("sum")
const inputphanLoai = document.getElementById("phanloai")
const inputtime = document.getElementById("time")
const inputdate = document.getElementById("date")

let SEARCH_DATA = data

const itemsPerPage = 5;
let currentPage = 1;
function renderPagination() {
    const paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = "";

    const totalPages = Math.ceil(SEARCH_DATA.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");
        const pageLink = document.createElement("a");
        pageLink.classList.add("page-link");
        pageLink.href = "#";
        pageLink.innerText = i;
        pageLink.addEventListener("click", () => {
            currentPage = i;
            Table();
        });
        pageItem.appendChild(pageLink);
        paginationElement.appendChild(pageItem);
    }
}
function getPaginatedData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return SEARCH_DATA.slice(startIndex, endIndex);
}


function Table() {
    let arr = getPaginatedData();
    let stringHTML = "";
    arr.forEach(e => stringHTML +=
        `
    <tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td> <img src="/admin/image/${e.img}" width"50" height="50"  style="object-fit:cover>"</td>
        <td>${e.sum}$</td>
        <td>${e.phanloai}</td>
        <td>${e.time}</td>
        <td>${e.date}</td>
        <td>
            <div class="action_col">
                <button class="btn btn_sua" onclick="toggleForm(${e.id})">Edit</button>
                    <button class="btn btn_xoa" onclick="deleteProduct(${e.id})">Delete</button>
            </div>
        </td>
    </tr>
     `
    )
    document.getElementById("table_body").innerHTML = stringHTML
    renderPagination();
}
Table()


function toggleForm(id) {
    const data = JSON.parse(localStorage.getItem("product")) || []
    document.getElementById("form_scope").classList.toggle("hide")
    if (id != undefined) {
        const indexUpdate = data.findIndex(e => e.id == id)
        indexUpdateGlobal = indexUpdate
        inputName.value = data[indexUpdate].name
        inputSum.value = data[indexUpdate].sum
        inputphanLoai.value = data[indexUpdate].phanloai
        inputtime.value = data[indexUpdate].time
        inputdate.value = data[indexUpdate].date
    } else {
        indexUpdateGlobal = null
        document.getElementById("form").reset()
    }
}
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("product")) || []
    if (indexUpdateGlobal != null) {
        let img = document.getElementById("image").value
        img = img.split("\\")
        img = img[img.length - 1]
        data[indexUpdateGlobal].name = inputName.value
        data[indexUpdateGlobal].sum = inputSum.value
        data[indexUpdateGlobal].phanloai = inputphanLoai.value
        data[indexUpdateGlobal].time = inputtime.value
        data[indexUpdateGlobal].date = inputdate.value
        data[indexUpdateGlobal].img = img
        indexUpdateGlobal = null
        this.reset()
        toggleForm()
        localStorage.setItem("product", JSON.stringify(data))
        Table()
        location.reload();
        return
    }
    let img = document.getElementById("image").value
    img = img.split("\\")
    img = img[img.length - 1]
    let imax = getNewId()
    const product = {
        id: imax,
        name: inputName.value,
        sum: inputSum.value,
        phanloai: inputphanLoai.value,
        time: inputtime.value,
        date: inputdate.value,
        img: img,
    }
    data.push(product)
    localStorage.setItem("product", JSON.stringify(data))
    Table()
    this.reset()
    toggleForm()
})


function deleteProduct(id) {
    const data = JSON.parse(localStorage.getItem("product")) || []
    const indexDelete = data.findIndex(e => e.id == id)
    const result = confirm(`Delete ${data[indexDelete].name}`)
    if (result) {
        data.splice(indexDelete, 1)
    }
    localStorage.setItem("product", JSON.stringify(data))
    Table()
}

function drawCategory() {
    const categorys = JSON.parse(localStorage.getItem("categorys"))
    let stringHTML = ""

    categorys.forEach(e => {
        stringHTML +=
            `
            <option value="${e.name}">${e.name}</option>
            
            `
    })

    document.getElementById("phanloai").innerHTML = stringHTML
}
drawCategory()


function checkSearch() {
    currentPage = 1
    let text = document.getElementById("search").value;
    const list = JSON.parse(localStorage.getItem('product'))
    let foundProduct = list.filter(pro => pro.name.toLowerCase().includes(text.trim().toLowerCase()));
    console.log(foundProduct);

    SEARCH_DATA = foundProduct
    renderPagination()
    Table()
}
document.getElementById("search").addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        checkSearch()
    }
})


function alphab() {
    let data = JSON.parse(localStorage.getItem("product")) || []
    data.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem("product", JSON.stringify(data))
    Table();
    location.reload();
}


function getNewId() {
    const data = JSON.parse(localStorage.getItem("product")) || []
    let idMax = 0;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (idMax < element.id) {
            idMax = element.id
        }
    }
    return ++idMax;
}


