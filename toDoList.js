// @ts-ignore
const createNewItem = document.getElementById("createNewItem");
createNewItem.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    addItem();
    createNewItem.value = "";
  }
});

const addToList = document.getElementById("addToList");

function createItem() {
  const iconSpan = document.createElement("span");
  iconSpan.className = "material-symbols-outlined";
  iconSpan.textContent = "drag_indicator";
  const newItem = document.createElement("li");
  newItem.textContent = createNewItem.value;
  newItem.insertBefore(iconSpan, newItem.firstChild);
  newItem.draggable = true;
  console.log(newItem.firstChild);

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
  newItem.addEventListener("dragstart", () => {});
  newItem.addEventListener("dragover", () => {});
  newItem.addEventListener("dragend", (event) => {
    const position = findPosition(toDoList, event);
    toDoList.insertBefore(
      newItem,
      toDoList.getElementsByTagName("li")[position]
    );
  });
}

function findPosition(containerElement, event) {
  const containerRect = containerElement.getBoundingClientRect();
  const positionInContainer = event.pageY - containerRect.top;

  let childHeightSum = 0;
  for (let index = 0; index < containerElement.children.length; index++) {
    const child = containerElement.children[index];
    const childRect = child.getBoundingClientRect();
    const nextSum = childHeightSum + childRect.height;
    if (nextSum >= positionInContainer) {
      return index;
    } else {
      childHeightSum = nextSum;
    }
  }
}
