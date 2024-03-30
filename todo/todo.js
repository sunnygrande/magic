

function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        console.log("hello world");
        fetch('navbar-template.html') // Update the path here
            .then(response => response.text())
            .then(template => {
                navbarPlaceholder.innerHTML = template;
            })
            .catch(error => console.error('Error loading navbar:', error));
    }
}

// Load the navbar on page load
document.addEventListener('DOMContentLoaded', loadNavbar);

let todoItemsContainer = document.getElementById("todoItemsContainer");
const addTodoButton = document.getElementById("addTodoButton");
const save = document.getElementById("savebtn");

// let todoList = [
//     {Text : "homework",uniqueId:1},{Text :"chess",uniqueId:2},{Text : "resume",uniqueId:3}
// ];

//1.empty todo list is generated.
function getTodoListFromLocal() {
    let stringTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringTodoList);
    if (parsedTodoList === null) {
        return [];
    }else{
        return parsedTodoList;
    }
}
let todoList = getTodoListFromLocal();
let count= todoList.length;



//function for creating virtual new todo task on ui 
function createNewTodoObj(todo) {
    let checkboxId= "checkbox" + todo.uniqueId;
    let labelId="label"+todo.uniqueId;
    let todoId= "todo" + todo.uniqueId;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container","d-flex","flex-row");
    todoElement.id=todoId;
    todoItemsContainer.appendChild(todoElement);
    //li creation


    let inputElement = document.createElement("input");
    inputElement.type="checkbox";
    inputElement.id=checkboxId;
    inputElement.checked=todo.isChecked;//after
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);
    //add checkbox inside li

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container","d-flex","flex-row");
    todoElement.appendChild(labelContainer);
    //add label containter inside li

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for",checkboxId);
    labelElement.textContent=todo.Text; //after
    labelElement.id=labelId;
    labelElement.classList.add("checkbox-label");
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);


    inputElement.onclick = function () {
      labelElement.classList.toggle("checked");
      let todoObjectIndex = todoList.findIndex(function(eachtodo){
        let eachtodoId = "todo"+ eachtodo.uniqueId;
        if (eachtodoId === todoId) {
            return true;
        }else {
            return false;
        }
      });
      let todoObject = todoList[todoObjectIndex];
        if (todoObject.isChecked === true) {
            todoObject.isChecked =false;
         }else {
            todoObject.isChecked =true;
         }
      console.log(todoObject);
    }

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far","fa-trash-alt","delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function(){
        todoElement = document.getElementById(todoId);
        todoItemsContainer.removeChild(todoElement); 
        todoList.pop(todoElement);
    }
}

// function checkStrike(checkboxId,labelId) {
//     let checkboxElement= document.getElementById(checkboxId);
//     let labelElement = document.getElementById(labelId);
//    labelElement.classList.toggle("checked")
// }


//2.New todo task obj is addeded to todoList array when add button is clicked and new todo task is added on ui
addTodoButton.onclick = function(){
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputElement.value === "") {
        alert("Enter valid text");
        return;
    }
    count++;
    let newTodo ={
        Text : userInputValue, uniqueId : count, isChecked : false
    }
    todoList.push(newTodo);
  createNewTodoObj(newTodo);
    userInputElement.value="";
    
}

//3.store todo task in local storage when save button is clicked
save.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));

}

for (const todo of todoList) {
    createNewTodoObj(todo);
}

const form = document.getElementById('pushupForm');
const pushupCounterInput = document.getElementById('pushupCounter');
const postsElement = document.querySelector('.heroAtk');
const heroHpElement =document.querySelector('.heroHp');

let ATK = localStorage.getItem('ATK') ? parseInt(localStorage.getItem('ATK')) : 0; // Initial ATK value

let HP = localStorage.getItem('HP') ? parseInt(localStorage.getItem('HP')) : 0;

postsElement.textContent = ATK + ' ATK'; // Display the initial ATK value

heroHpElement.textContent = HP + ' HP';

localStorage.setItem('HP',HP.toString());

console.log(localStorage.getItem('HP')); //why 18?


form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const pushupCount = parseInt(pushupCounterInput.value);
  if (!isNaN(pushupCount)) {
    ATK += pushupCount;
    localStorage.setItem('ATK', ATK.toString()); // Store the updated ATK value in local storage
    postsElement.textContent = ATK + ' ATK';
  }

  pushupCounterInput.value = ''; // Clear input
});




console.log(todoItemsContainer); 



