const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", completedTodo);
todoList.addEventListener("click", removeTodo);

document.addEventListener("DOMContentLoaded", () => getTodos());

document.querySelector(".todo-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTodo(e);
  }
});

function addTodo(e) {
  e.preventDefault();

  if (todoInput.value === "") return;
  else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
    updateListCount()
  }
 
}

function completedTodo(e) {
  if (e.target.classList.contains("todo-item")) {
    e.target.classList.toggle("completed");
  }
}

function removeTodo(e) {
  if (e.target.classList.contains("trash-btn")) {
    
    e.target.parentElement.remove();
    removeLocalTodos(e.target.parentElement);
    updateListCount()
  }
 
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    localStorage.setItem("todos", JSON.stringify(todos));
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  updateListCount()
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  updateListCount()
  
}
function updateListCount() {
    const listCount = document.getElementById("list-count");
    const todoItems = document.getElementsByClassName("todo-item");
    listCount.innerText = todoItems.length;
  }