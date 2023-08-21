// const categorys = [
//     { id: 1, name: "san pham 1", note: "loai A" },
//     { id: 2, name: "san pham 2", note: "loai B" },
//     { id: 3, name: "san pham 3", note: "loai c" },
//     { id: 4, name: "san pham 4", note: "loai d" }
// ];


const categorys = JSON.parse(localStorage.getItem("categorys")) || []
indexUpdateGlobal = null

function showTable(cc = categorys) {
    const categorys = JSON.parse(localStorage.getItem("categorys")) || []
    let string = ""
    for (let i = 0; i < cc.length; i++) {
        const e = cc[i];
        string +=
            `
    <tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.note}</td>
        <td>
            <div class="action_col">
                <button class="btn btn_sua" onclick="toggleForm(${e.id})">Edit</button>
                <button style="background-color: rgb(223, 90, 90);" class="btn btn_sua" onclick="deleteProduct(${e.id})">Delete</button>
            </div>
        </td>
    </tr>
        `
    }
    document.getElementById("table_body").innerHTML = string;
}
showTable()


function toggleForm(id) {
    const categorys = JSON.parse(localStorage.getItem("categorys")) || []
    document.getElementById("form_scope").classList.toggle("hide")
    const inputName = document.getElementById("nameDes")
    const inputNote = document.getElementById("note")

    if (id != undefined) {
        const indexUpdate = categorys.findIndex(e => e.id == id)
        indexUpdateGlobal = indexUpdate
        inputName.value = categorys[indexUpdate].name
        inputNote.value = categorys[indexUpdate].note
    } else {
        indexUpdateGlobal = null
        document.getElementById("form").reset()
    }
}
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault()
    const inputName = document.getElementById("nameDes")
    const inputNote = document.getElementById("note")
    const categorys = JSON.parse(localStorage.getItem("categorys")) || []
    if (indexUpdateGlobal != null) {

        categorys[indexUpdateGlobal].name = inputName.value
        categorys[indexUpdateGlobal].note = inputNote.value
        indexUpdateGlobal = null
        this.reset()
        toggleForm()
        localStorage.setItem("categorys", JSON.stringify(categorys))
        showTable()
        location.reload();
        return;
    }

    let imax = getNewId()
    const cate = {
        id: imax,
        name: inputName.value,
        note: inputNote.value,
    }

    categorys.push(cate)
    localStorage.setItem("categorys", JSON.stringify(categorys))
    this.reset()
    toggleForm()
    location.reload();
    showTable()
})


function getNewId() {
    const categorys = JSON.parse(localStorage.getItem("categorys")) || []
    let idMax = 0;
    for (let i = 0; i < categorys.length; i++) {
        const element = categorys[i];
        if (idMax < element.id) {
            idMax = element.id
        }
    }
    return ++idMax;
}


function checkSearch() {
    let text = document.getElementById("search").value;
    let foundUsermana = categorys.filter(usem => usem.name.toLowerCase().includes(text.trim().toLowerCase()));
    showTable(foundUsermana);
}
document.getElementById("search").addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        checkSearch()
    }
})


function alphab() {
    let categorys = JSON.parse(localStorage.getItem("categorys")) || []
    categorys.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem("categorys", JSON.stringify(categorys))
    showTable();
    location.reload();
}


function deleteProduct(id) {
    const categorys = JSON.parse(localStorage.getItem("categorys")) || []
    const indexDelete = categorys.findIndex(e => e.id == id)
    const result = confirm(`Delete ${categorys[indexDelete].name}`)
    if (result) {
        categorys.splice(indexDelete, 1)
    }
    localStorage.setItem("categorys", JSON.stringify(categorys))
    showTable()
    location.reload();
}


