const todo = document.querySelector(".input-text");
const addBtn = document.querySelector(".add-btn");
const wrap = document.querySelector(".wrap");

const localStorageKey = "items"
let localStorageValue = [];

window.onload = function () {
    getFromLocalStorage();
}

addBtn.addEventListener("click", () => {
    if (todo.value.trim() !== "") {
        addAgent(todo);
        saveToLocalStorage();
        todo.value = ""
    }
})

// 代辦事項新增
function addAgent(todoAgent) {
    const divItem = document.createElement("div");
    divItem.classList.add("div-Item", "d-flex", "p-lg-3", "mb-2", "mt-2", "border", "border-secondary-subtle", "align-items-center");

    divItem.innerHTML =
    `<div class="div-Todo bg-secondary bg-opacity-25 d-flex align-items-center p-2">
        <input class="check-Box form-check-input me-1 border m-1" type="checkbox">
        <input class="input-Todo myInput form-control bg-secondary bg-opacity-10 ms-2 flex-wrap" type="text" disabled="true">
    </div>
    <div class="div-Btn mx-auto">
        <button class="edit-Btn btn btn-warning mx-1">編輯</button>
        <button class="del-Btn btn btn-danger">刪除</button>
    </div>`;
    
    const checkBox = divItem.querySelector(".check-Box");
    checkBox.checked = todoAgent.completed;
    checkBox.addEventListener("click", (e) => {
        const divItemCheck = e.target.closest(".div-Item")
        divItemCheck.checked = !checkBox.checked;
        saveToLocalStorage();
    })

    const inputTodoContent = divItem.querySelector(".input-Todo");
    inputTodoContent.value = todoAgent.value;
    
    console.log(inputTodoContent.value);

    const editBtn = divItem.querySelector(".edit-Btn");
    editBtn.addEventListener("click", editAgent);

    const delBtn = divItem.querySelector(".del-Btn")
    delBtn.addEventListener("click", delAgent);

    wrap.append(divItem);
};

function editAgent(event) {
    const editBtn = event.target;
    const todo = editBtn.closest(".div-Item").querySelector(".input-Todo");
    // 編輯鈕更改為保存鈕
    if (editBtn.textContent === "編輯") {
        editBtn.textContent = "保存";
        editBtn.classList.remove("btn-warning");
        editBtn.classList.add("btn-success")
        todo.disabled = false;
    }
    // 保存鈕更改為編輯鈕
    else {
        editBtn.textContent = "編輯";
        editBtn.classList.remove("btn-success");
        editBtn.classList.add("btn-warning")
        todo.disabled = true;
    }
    saveToLocalStorage();
};

// 代辦事項刪除
function delAgent(event) {
    if(event.target.classList.contains("del-Btn")) {
        const delDiv = event.target.closest(".div-Item")
        if(delDiv) {
            delDiv.remove();
            saveToLocalStorage();
        }
    }
};

// 將所有代辦事項儲存進localStorage內(代辦事項、完成狀態)
function saveToLocalStorage() {
    const itemsToLocalStorage = Array.from(document.querySelectorAll(".div-Item")).map(divItem => {
        itemTodoContent = divItem.querySelector(".input-Todo");
        console.log(itemTodoContent);
        checkBox = divItem.querySelector(".check-Box");
        return {
            value : itemTodoContent.value,
            completed : checkBox.checked
        }
    })
    localStorage.setItem(localStorageKey, JSON.stringify(itemsToLocalStorage));
}

// 從localStorage讀取每個代辦事項的內容
function getFromLocalStorage() {
    const Agents = JSON.parse(localStorage.getItem(localStorageKey))
    console.log(Agents)
    if(Agents) {
        Agents.forEach(agent => {
            addAgent(agent);
        })
    }
}

