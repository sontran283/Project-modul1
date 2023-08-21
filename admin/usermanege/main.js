// const data = [
//     { id: 1, name: "Nguyen van A", sum: "119.000", phanloai: "loai A", time: "12/03/2023", date: "12/02/2023" },
//     { id: 2, name: "Nguyen van b", sum: "112.000", phanloai: "loai B", time: "12/03/2023", date: "12/02/2023" },
//     { id: 3, name: "Nguyen van b", sum: "112.000", phanloai: "loai B", time: "12/03/2023", date: "12/02/2023" },
//     { id: 4, name: "Nguyen van b", sum: "112.000", phanloai: "loai B", time: "12/03/2023", date: "12/02/2023" }
// ];


const data = JSON.parse(localStorage.getItem("users")) || []
let idGlobal = 1
let indexUpdateGlobal = null
const inputName = document.getElementById("name")
const inputGmail = document.getElementById("email")
const inputHoname = document.getElementById("honame")
const inputphanLoai = document.getElementById("phanloai")
const inputtime = document.getElementById("time")
const inputdatetime = document.getElementById("datetime")


function Table(c = data) {
    const data = JSON.parse(localStorage.getItem("users")) || []
    let stringHTML = "";
    c.forEach(e =>
        stringHTML +=
        `
    <tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.email}</td>
        <td>${e.honame}</td>
        <td>${e.phanloai}</td>
        <td>${e.time}</td>
        <td>${e.datetime}</td>
        <td>
            <div class="action_col">
                <button class="btn btn_sua" onclick="toggleForm(${e.id})">Sửa</button>
                <button class="btn btn_xoa" onclick="deleteProduct(${e.id})">Xóa</button>
            </div>
        </td>
    </tr>
    `
    )
    document.getElementById("table_body").innerHTML = stringHTML;
}
Table()


function toggleForm(id) {
    const data = JSON.parse(localStorage.getItem("users")) || []
    document.getElementById("form_scope").classList.toggle("hide")
    if (id != undefined) {
        const indexUpdate = data.findIndex(e => e.id == id)
        indexUpdateGlobal = indexUpdate
        inputName.value = data[indexUpdate].name
        inputGmail.value = data[indexUpdate].email
        inputHoname.value = data[indexUpdate].honame
        inputphanLoai.value = data[indexUpdate].phanloai
        inputtime.value = data[indexUpdate].time
        inputdatetime.value = data[indexUpdate].datetime
    } else {
        indexUpdateGlobal = null
        document.getElementById("form").reset()
    }
}


document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("users")) || []
    if (indexUpdateGlobal != null) {
        data[indexUpdateGlobal].name = inputName.value
        data[indexUpdateGlobal].email = inputGmail.value
        data[indexUpdateGlobal].honame = inputHoname.value
        data[indexUpdateGlobal].phanloai = inputphanLoai.value
        data[indexUpdateGlobal].time = inputtime.value
        data[indexUpdateGlobal].datetime = datetime.value
        indexUpdateGlobal = null
        this.reset()
        toggleForm()
        localStorage.setItem("users", JSON.stringify(data))
        Table()
        location.reload();
        return
    }
    let imax = getNewId()
    const product = {
        id: imax,
        name: inputName.value,
        email: inputGmail.value,
        honame: inputHoname.value,
        phanloai: inputphanLoai.value,
        time: inputtime.value,
        datetime: inputdatetime.value
    }
    data.push(product)
    localStorage.setItem("users", JSON.stringify(data))
    this.reset()
    toggleForm()
    location.reload();
    Table()
})


function deleteProduct(id) {
    const data = JSON.parse(localStorage.getItem("users")) || []
    const indexDelete = data.findIndex(e => e.id == id)
    const result = confirm(`Delete ${data[indexDelete].name}`)
    if (result) {
        data.splice(indexDelete, 1)
    }
    localStorage.setItem("users", JSON.stringify(data))
    Table()
    location.reload();
}


function checkSearch() {
    let text = document.getElementById("search").value;
    let foundUsermana = data.filter(usem => usem.name.toLowerCase().includes(text.trim().toLowerCase()));
    Table(foundUsermana);
}
document.getElementById("search").addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        checkSearch()
    }
})


function getNewId() {
    const data = JSON.parse(localStorage.getItem("users")) || []
    let idMax = 0;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (idMax < element.id) {
            idMax = element.id
        }
    }
    return ++idMax;
}


function alphab() {
    let data = JSON.parse(localStorage.getItem("users")) || []
    data.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem("users", JSON.stringify(data))
    Table();
    location.reload();
}

