/* import './js/index'; */
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

const button = document.querySelector('.btn-add');
const input = document.querySelector('.input-js');
const list = document.querySelector('.todo-list');
const LOCAL_TODO = "todo";
const array = [];
initList();

//подію прив'язав до кнопки
button.addEventListener('click', addItem);

//створюємо обєкт
function createObjToDo(textDone) {
    return {
        id: Date.now(),
        status: 'todo',
        textDone: textDone,
    }
}


//створюю об'єкт
function createItem({ id, status, textDone }) {
    return `<li class="${status} id="${id}">${textDone}
    <button class="btn-update"></button>
    </li>`;
}

//додаю об'єкт
function addItem() {
    const value = input.value.trim();
    input.value = "";
    if (!value) {
        alert("Please enter input");
        return;
    }
    

    const ObjToDo = createObjToDo(value);

    list.insertAdjacentHTML('beforeend', createItem(ObjToDo))
    const data = JSON.parse(localStorage.getItem(LOCAL_TODO)) || [];
    data.push(ObjToDo);
    localStorage.setItem(LOCAL_TODO, JSON.stringify(data))
}

//зберігаємо і друкуємо дані
function initList() {
    const data = JSON.parse(localStorage.getItem(LOCAL_TODO));
    if (!data) {
        return;
    }
    //вносимо дані
    list.innerHTML = data.map(createItem).join('');
}


//тут міняємо класи todo
list.addEventListener('click', openModal)

let instance = null;

function openModal(event) {
    if (event.target.classList.contains("btn-update")) {
//madalka
instance = basicLightbox.create(
    `<div class="modal-container">
    <button type="button" class="btn-close-modal">X</button>
    <input type="text" class="input-modal"/>
    <button type="button" class="btn-update-modal" id="${event.target.parentNode.id}">Update todo</button>
    </div>`,
    {
    closable: false,
    }
    ); 
        instance.show();

    //ставлю події на модальне окно

const modalInput=document.querySelector('.input-modal')
const modalButton=document.querySelector('.btn-update-modal')
const closeButton=document.querySelector('.btn-close-modal')

    closeButton.addEventListener('click', () => instance.close());
    modalButton.addEventListener('click', updateItem);
    function updateItem(event) {
        const input = modalInput.value.trim();
        console.log(input);
        if (!input) {
            return;
        }
        const data = JSON.parse(localStorage.getItem(LOCAL_TODO));
        const updData = data.map(obj => {
        if (obj.id === +event.target.id) {
            obj.textDone = input;
        }
        return obj;
    })
        localStorage.setItem(LOCAL_TODO, JSON.stringify(updData));
        instance.close();
    }

    }
}



