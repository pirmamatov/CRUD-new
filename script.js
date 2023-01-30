// const modal = document.querySelector(".modal-container");
// const tbody = document.querySelector(".tbody");
// const sName = document.querySelector("#m-nome");
// const sFuncao = document.querySelector("#m-funcao");
// const sSalario = document.querySelector("#m-salario");
// const btnSalvar = document.querySelector("#btnSalvar");


// let items 
// let id


// const 


const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const userName = document.querySelector('#user-name');
const userLastName = document.querySelector('#user-lastName')
const userSalary = document.querySelector('#user-salary')
const userAge = document.querySelector('#user-age')
const btnAdd = document.querySelector('#btnAdd')

let items
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    userName.value = items[index].name
    userLastName.value = items[index].lastName
    userSalary.value = items[index].salary
    userAge.value = items[index].age
    id = index
  } else {
    userName.value = ''
    userLastName.value = ''
    userSalary.value = ''
    userAge.value = ''
  }

}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
    items.splice(index, 1)
  setItemsBD()
  loadItems()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.lastName}</td>
    <td>${item.salary} $ </td>
    <td>${item.age}</td>
    <td class="btn-edit">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="btn-delete" >
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnAdd.onclick = e => {

  if (userName.value == '' || userLastName.value == '' || userSalary.value == ''|| userAge.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    items[id].name = userName.value
    items[id].lastName = userLastName.value
    items[id].salary = userSalary.value
    items[id].age = userAge.value
  } else {
    items.push({'name': userName.value, 'lastName': userLastName.value, 'salary': userSalary.value, "age": userAge.value})
  }

  setItemsBD()

  modal.classList.remove('active')
  loadItems()
  id = undefined
}

function loadItems() {
    items = getItemsBD()
  tbody.innerHTML = ''
  items.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItemsBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItemsBD = () => localStorage.setItem('dbfunc', JSON.stringify(items))

loadItems()
