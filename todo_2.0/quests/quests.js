function loadNavbar() {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    if (navbarPlaceholder) {
    
      fetch("navbar-template.html") // Update the path here
        .then((response) => response.text())
        .then((template) => {
          navbarPlaceholder.innerHTML = template;
        })
        .catch((error) => console.error("Error loading navbar:", error));
    }
  }
  
  // Load the navbar on page load
  document.addEventListener("DOMContentLoaded", loadNavbar);

const userInputElement = document.getElementById("todoUserInput");
const userImageElement = document.getElementById("todoUserImageInput");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");

userImageElement.addEventListener("change", function() {
    imagePreviewContainer.innerHTML = ''; // Clear existing previews

    for (let i = 0; i < userImageElement.files.length; i++) {
        const file = userImageElement.files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageElement = document.createElement("img");
            imageElement.src = e.target.result;
            imageElement.classList.add("preview-image");

            const insertButton = document.createElement("button");
            insertButton.textContent = "Insert Image";
            insertButton.onclick = function() {
                insertImageIntoTextarea(e.target.result);
            };

            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("image-wrapper");
            imageWrapper.appendChild(imageElement);
            imageWrapper.appendChild(insertButton);

            imagePreviewContainer.appendChild(imageWrapper);
        };

        reader.readAsDataURL(file);
    }
});

function insertImageIntoTextarea(imageUrl) {
    const cursorPosition = userInputElement.selectionStart;
    const textBefore = userInputElement.value.substring(0, cursorPosition);
    const textAfter = userInputElement.value.substring(cursorPosition);

    userInputElement.value = `${textBefore}<img src="${imageUrl}" class="embedded-image" />${textAfter}`;
}

// Function to get todo list from local storage
function getTodoListFromLocal() {
    let stringTodoList = localStorage.getItem("todoList_i");
    let parsedTodoList = JSON.parse(stringTodoList);
    return parsedTodoList || [];
}

let todoList_i = getTodoListFromLocal();
let count = todoList_i.length;

// Create a new todo task on the UI
function createNewTodoObj(todo) {
    let checkboxId = "checkbox" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId;
    let todoId = "todo" + todo.uniqueId;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("div");
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    if (todo.isChecked) {
        labelElement.classList.add("checked");
    }

    labelElement.innerHTML = todo.Text; // Render text with images

    labelContainer.appendChild(labelElement);

    inputElement.onclick = function() {
        labelElement.classList.toggle("checked");
        let todoObjectIndex = todoList_i.findIndex(function(eachtodo) {
            return eachtodo.uniqueId === todo.uniqueId;
        });
        todoList_i[todoObjectIndex].isChecked = !todoList_i[todoObjectIndex].isChecked;
    };

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function() {
        let todoIndex = todoList_i.findIndex(function(todoItem) {
            return todoItem.uniqueId === todo.uniqueId;
        });

        if (todoIndex !== -1) {
            todoList_i.splice(todoIndex, 1);
        }

        todoItemsContainer.removeChild(todoElement);
    };
}

// Handle adding new todo items
addTodoButton.onclick = function () {
    let userInputValue = userInputElement.value;
    let userImageFile = userImageElement.files[0];

    if (userInputValue === "") {
        alert("Enter valid text");
        return;
    }

    count++;
    
    let newTodo = {
        Text: userInputValue,
        uniqueId: count,
        isChecked: false,
        imageUrl: userImageFile ? URL.createObjectURL(userImageFile) : null
    };

    todoList_i.push(newTodo);
    createNewTodoObj(newTodo);

    // Reset input fields
    userInputElement.value = "";
    userImageElement.value = "";
}

// Handle saving the todo list to local storage
const saveButton = document.getElementById("savebtni");
saveButton.onclick = function () {
    console.log("Saving todo list:", todoList_i); // Log the current todoList
    localStorage.setItem("todoList_i", JSON.stringify(todoList_i));
    
}

// Render existing todos from local storage on page load
for (const todo of todoList_i) {
    createNewTodoObj(todo);
}
