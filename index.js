function createItem() {
  // @ts-ignore
  const createNewItem = document.getElementById("createNewItem").value;
  const newItem = document.createElement("li");
  newItem.textContent = createNewItem;

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  newItem.append(checkBox);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  // deleteButton.style.position = "fixed";
  newItem.appendChild(deleteButton);

  changeItem(checkBox, newItem, deleteButton);

  return newItem;
}

function addItem() {
  const newItem = createItem();
  const todoList = document.getElementById("todoList");
  todoList.appendChild(newItem);
}

function changeItem(checkBox, newItem, deleteButton) {
  const doneList = document.getElementById("doneList");
  const todoList = document.getElementById("todoList");

  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      doneList.appendChild(newItem);
    } else {
      todoList.appendChild(newItem);
    }
  });

  deleteButton.addEventListener("click", () => {
    if (checkBox.checked) {
      doneList.removeChild(newItem);
    } else {
      todoList.removeChild(newItem);
    }
  });
}

// function saveList() {
//   console.log("hei");
// }

// change list in order
// add sublist
// save today's plan
