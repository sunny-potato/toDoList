// @ts-ignore
const createNewItem = document.getElementById("createNewItem");
createNewItem.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    addItem();
    console.log(createNewItem);
  }
});

const addToList = document.getElementById("addToList");

function createItem() {
  const newItem = document.createElement("li");
  newItem.textContent = createNewItem.value;

  newItem.draggable = true;

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  newItem.appendChild(checkBox);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  deleteButton.style.position = "right";
  newItem.appendChild(deleteButton);

  changeItem(checkBox, newItem, deleteButton);
  dragItem(newItem);

  return newItem;
}

function addItem() {
  const newItem = createItem();
  const toDoList = document.getElementById("toDoList");
  toDoList.appendChild(newItem);
}

function changeItem(checkBox, newItem, deleteButton) {
  const doneList = document.getElementById("doneList");
  const toDoList = document.getElementById("toDoList");

  checkBox.addEventListener("change", () => {
    const boxLine = document.getElementById("boxLine");
    const doneListBox = document.getElementById("doneListBox");
    if (checkBox.checked) {
      boxLine.style.display = "block";
      doneListBox.style.display = "block";
      doneList.appendChild(newItem);
      console.log(doneList);
    } else {
      toDoList.appendChild(newItem);
      if (doneList.getElementsByTagName("li").length === 0) {
        boxLine.style.display = "none";
        doneListBox.style.display = "none";
      }
    }
  });

  deleteButton.addEventListener("click", () => {
    if (checkBox.checked) {
      doneList.removeChild(newItem);
    } else {
      toDoList.removeChild(newItem);
    }
  });
}

function dragItem(newItem) {
  newItem.addEventListener("dragstart", (event) => {
    // event.dataTransfer.setData("text/plain", newItem);
  });
  newItem.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  newItem.addEventListener("drag", (event) => {
    event.preventDefault();
    // const draggedData = event.dataTransfer.getData("text");
    toDoList.appendChild(newItem);
  });
}

// change list in order
// add sublist
// list style image
