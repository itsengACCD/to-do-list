// the To-do list

const todoList = [];

const todoListElement = document.querySelector("#myUL");

// This is for entering the data with the button
document.querySelector("#add_button").addEventListener("click", addTodo);

// keycode 13 is the Enter Key. This is for entering the data with the keyboard
document.querySelector("#myInput").addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    addTodo()
  }
});

// Reading values from the input to place inside the array

function addTodo() {
  const todoText = document.querySelector("#myInput").value;

  if (todoText == "") {
    alert("The input field is blank... please enter a new task.");
  } else {
    const todoObject = {
      id: todoList.length,
      todoText: todoText,
      isDone: false,
    };

    // Unshift means new items appear on top
    todoList.unshift(todoObject);
    displayTodos();
  }
}

// cross out text once task is done, True to False state change back and forth each time clicked

function doneTodo(todoId) {
  const selectedTodoIndex = todoList.findIndex((item) => item.id == todoId);

  todoList[selectedTodoIndex].isDone
    ? (todoList[selectedTodoIndex].isDone = false)
    : (todoList[selectedTodoIndex].isDone = true);
  displayTodos();
}

// Deleting item from list

function deleteItem(x) {
  todoList.splice(
    todoList.findIndex((item) => item.id == x),
    1
  );
  displayTodos();
}

// Displaying the items entered into the field box on screen

function displayTodos() {
  todoListElement.innerHTML = "";
  document.querySelector("#myInput").value = "";

  todoList.forEach((item) => {
    const listElement = document.createElement("li");
    const delBtn = document.createElement("i");

    listElement.innerHTML = item.todoText;
    listElement.setAttribute("data-id", item.id);

    delBtn.setAttribute("data-id", item.id);
    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-alt");
    delBtn.setAttribute("data-id", item.id);

    if (item.isDone) {
      listElement.classList.add("checked");
    }

    listElement.addEventListener("click", function (e) {
      const selectedId = e.target.getAttribute("data-id");
      doneTodo(selectedId);
    });

    delBtn.addEventListener("click", function (e) {
      const delId = e.target.getAttribute("data-id");
      deleteItem(delId);
    });

    todoListElement.appendChild(listElement);
    listElement.appendChild(delBtn);
  });
}
