/* import './js/index'; */
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

const btn = document.querySelector('.btn-add');
const input = document.querySelector('.input-js');
const ul = document.querySelector('.todo-list');
const LOCAL_TODO = "todo";
const array = [];
initList();


//створюємо обєкт
function createObjToDo() {
    return {
        id: Date.now(),
        status: 'todo',
        text: input.value
    }
}


//обробка кнопки Ентер
document.addEventListener("keypress", enterInput);
function enterInput(event) {
    if (input.value.trim() !== '' && (event.code === 'Enter'||event.code === 'NumpadEnter')) {
        addLi();
    }
}

//обробка кліка
btn.addEventListener("click", addLi)

 
//додаємо ліжки
function addLi() {
    const inputValue = input.value.trim();
    if (inputValue === "") {
        return alert("Please enter value")
    }
    const detailLi = createObjToDo();
    const li = `
<li id ="${detailLi.id}" class="${detailLi.status}">${detailLi.text}
<button class="btn-update"></button>
</li>
`
    array.push(detailLi);
    ul.insertAdjacentHTML("beforeend", li);
    localStorage.setItem("LOCAL_TODO", JSON.stringify(array));
    input.value = "";
}


//ініціалізація ліста
function initList() {
    const data = JSON.parse(localStorage.getItem('LOCAL_TODO'));
    console.log(data)
    if (!data) {
        return;
    }
    for (const item of data) {
    let li = `
<li id ="${item.id}" class="${item.status}">${item.text}
<button class="btn-update"></button>
</li>
`
    ul.insertAdjacentHTML("beforeend", li);
    }
}





//ти думаєш як відслідкувати кнопки і прокинути на них подію


/* instance = basicLightbox.create(
    `<div class="modal-container"><button type="button" class="btn-close-modal">X</button><input type="text" class="input-modal"/><button type="button" class="btn-update-modal" id="${e.target.parentNode.id}">Update todo</button></div>`,
    {
    closable: false,
    }
  ); */