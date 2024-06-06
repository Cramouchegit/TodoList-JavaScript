// Kumpulkan semua UI Element
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

// Ini Adalah Kumpulan eventListener
immediateLoadEventListener();

function immediateLoadEventListener() {
  // Mendapatkan Todos dari localStorage dan menggunakan render di Browser
  document.addEventListener("DOMContentLoaded", getTodos);

  // Ini adalah Event untuk Menambahkan Todo
  todoForm.addEventListener("submit", addTodo);

  // Ini adalah Event untuk Menghapus Todo
  todoList.addEventListener("click", deleteTodo);

  // Ini adalah Event untuk Menghapus Semua Todo
  clearButton.addEventListener("click", clearTodos);

  // Ini adalah Event untuk Memfilter Todo
  filterInput.addEventListener("keyup", filterTodos);
}

// Reuseable Functions Codes
function createTodoElement(value) {
  // Membuat element li
  const li = document.createElement("li");
  // Menambahkan children / class pada element li
  li.className =
    "todo-item list-group-item d-flex justify-content-between align-items-center mb-1";
  // Menambahkan children / id pada ke dalam element li
  li.appendChild(document.createTextNode(value));
  // Memberikan properti untuk a element
  const a = document.createElement("a");
  a.href = "#";
  a.className = "badge badge-danger delete-todo";
  a.innerHTML = "Delete";
  // Menambahkan a element ke dalam li
  li.appendChild(a);
  // Menambahkan li element ke dalam todoList
  todoList.appendChild(li);
}

function getItemFromLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

// Ini Adalah DOM functions
function getTodos() {
  const todos = getItemFromLocalStorage();

  todos.forEach((todo) => {
    createTodoElement(todo);
  });
}

function addTodo(e) {
  e.preventDefault();
  // Console logging event delegation
  if (todoInput.value) {
    createTodoElement(todoInput.value);
    addTodoLocalStorage(todoInput.value);

    todoInput.value = "";
  } else {
    // Tambahkan else
    alert("Tulis sebuah catatan, tidak boleh kosong!"); // Tambahkan alert
  }
}

function addTodoLocalStorage(todoInputValue) {
  const todos = getItemFromLocalStorage();

  todos.push(todoInputValue);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
  e.preventDefault();
  // Console logging event delegation
  if (e.target.classList.contains("delete-todo")) {
    // Mengkonfirmasi
    if (confirm("Apakah yaking akan menghapus?")) {
      // Menghilangkan / meremove parent
      const parent = e.target.parentElement;
      parent.remove();

      deleteTodoLocalStorage(parent);
    }
  }
}

function deleteTodoLocalStorage(deletedElement) {
  const todos = getItemFromLocalStorage(); // Menghapus element parent todo 4 (li)

  todos.forEach((todo, index) => {
    if (deletedElement.firstChild.textContent === todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos() {
  // Cara langsung menghilangkan semua todo
  todoList.innerHTML = "";

  clearTodosLocalStorage();
}

function clearTodosLocalStorage() {
  localStorage.clear();
}

function filterTodos(e) {
  const filterText = e.target.value.toLowerCase();
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();

    if (itemText.indexOf(filterText) !== -1) {
      item.setAttribute("style", "display: block");
    } else {
      item.setAttribute("style", "display: none !important");
    }
    console.log(itemText);
  });
}
