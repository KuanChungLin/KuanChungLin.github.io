const todo = document.querySelector(".input-Todo");
const addBtn = document.querySelector(".add-btn");
const divGroup = document.querySelector(".div-group");

const localStorageKey = "items"
let localStorageValue = [];

window.onload = function () {
    initScreen();
    // getFromLocalStorage();
}

addBtn.addEventListener("click", () => {
    if (todo.value.trim() !== "") {
        //addAgent(todo);
        addTodoTOLocalStorageValue(todo)
        initScreen();
    }
    todo.value = ""
})

function addTodoTOLocalStorageValue(todo) {
    const todoItem = {
        id: Date.now().toString(),
        value: todo.value,
        completed: false
    };
    localStorageValue.push(todoItem);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const itemsToLocalStorage = JSON.stringify(localStorageValue);
    localStorage.setItem(localStorageKey, itemsToLocalStorage);
}

function getFromLocalStorage() {
    const Agents = JSON.parse(localStorage.getItem(localStorageKey));
    if (Agents) {
        localStorageValue = Agents;
    }
}

function initScreen() {
    document.querySelector(".div-group").innerHTML = "";
    getFromLocalStorage();
    if (localStorageValue.length !== 0) {
        localStorageValue.forEach(agent => {
            addAgent(agent);
        })
    }
}

// 代辦事項新增
function addAgent(todoAgent) {
    const divItem = document.createElement("div");
    divItem.id = todoAgent.id;
    divItem.classList.add("div-Item", "d-flex", "p-lg-3", "mb-2", "mt-2", "border", "border-secondary-subtle", "align-items-center");

    divItem.innerHTML =
        `<div class="div-Todo bg-secondary bg-opacity-25 d-flex align-items-center p-2">
        <input class="check-Box form-check-input me-1 border m-1" type="checkbox">
        <input class="input-Todo myInput form-control bg-secondary bg-opacity-10 ms-2 flex-wrap" type="text" disabled="true">
    </div>
    <div class="div-Btn mx-auto">
        <button class="edit-Btn btn btn-warning d-inline-block mx-1">編輯</button>
        <button class="save-Btn btn btn-success d-none mx-1">保存</button>
        <button class="del-Btn btn btn-danger">刪除</button>
    </div>`;

    const checkBox = divItem.querySelector(".check-Box");
    checkBox.checked = todoAgent.completed;
    checkBox.addEventListener("click", (e) => {
        todoAgent.completed = checkBox.checked;
        saveToLocalStorage(e);
    })

    const inputTodoContent = divItem.querySelector(".input-Todo");
    inputTodoContent.value = todoAgent.value.trim();

    console.log(inputTodoContent.value);

    const editBtn = divItem.querySelector(".edit-Btn");
    editBtn.addEventListener("click", (e) => {
        editAndSaveAgent(e);
    });

    const saveBtn = divItem.querySelector(".save-Btn");
    const inputTodo = divItem.querySelector(".input-Todo")
    saveBtn.addEventListener("click", (e) => {
        if (inputTodo.value !== "") {
            editAndSaveAgent(e);
            todoAgent.value = inputTodo.value;
            saveToLocalStorage();
        }
        else {
            alert("代辦資料不得空白！");
            inputTodoContent.value = todoAgent.value.trim();
        }

    });

    const delBtn = divItem.querySelector(".del-Btn")
    delBtn.addEventListener("click", () =>{
        delAgent(todoAgent);
    });

    divGroup.append(divItem);
};

// 按鈕狀態更改
function editAndSaveAgent(event) {
    const Btn = event.target;
    const todo = Btn.closest(".div-Item").querySelector(".input-Todo");
    const editBtn = Btn.closest(".div-Item").querySelector(".edit-Btn");
    const saveBtn = Btn.closest(".div-Item").querySelector(".save-Btn");
    const editVisible = editBtn.classList.contains("d-inline-block");

    todo.classList.toggle("bg-white", !editAndSaveAgent)
    todo.classList.toggle("bg-secondary", !editAndSaveAgent)

    editBtn.classList.toggle("d-inline-block", !editVisible);
    editBtn.classList.toggle("d-none", editVisible);

    saveBtn.classList.toggle("d-inline-block", editVisible);
    saveBtn.classList.toggle("d-none", !editVisible);

    todo.disabled = !editVisible;
};

// 代辦事項刪除
function delAgent(agent) {
    // const id = event.target.closest(".div-Item").id
    if (event.target.classList.contains("del-Btn")) {
        const delDiv = event.target.closest(".div-Item");
        const index = localStorageValue.indexOf(agent)
        if (delDiv) {
            localStorageValue.splice(index,1);
            delDiv.remove();
            saveToLocalStorage();
        }
    }
};