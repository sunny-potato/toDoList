// @ts-ignore
const createNewItem = document.getElementById("createNewItem");
createNewItem.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    addItem();
    createNewItem.value = "";
  }
});

const addToList = document.querySelector(".addToList");

function createItem() {
  const iconSpan = document.createElement("span");
  iconSpan.className = "material-symbols-outlined";
  iconSpan.textContent = "drag_indicator";

  const itemContent = document.createElement("div");
  itemContent.textContent = createNewItem.value;

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  const itemDiv = document.createElement("div");
  itemDiv.className = "newItemContent";
  itemDiv.append(iconSpan, itemContent, checkBox);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  deleteButton.style.position = "right";

  const newItem = document.createElement("li");
  newItem.draggable = true;
  newItem.appendChild(itemDiv);
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

const boxLine = document.getElementById("boxLine");
const doneListBox = document.getElementById("doneListBox");
function changeItem(checkBox, newItem, deleteButton) {
  const doneList = document.getElementById("doneList");
  const toDoList = document.getElementById("toDoList");

  checkBox.addEventListener("change", () => {
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

    if (doneList.getElementsByTagName("li").length === 0) {
      doneListBox.style.display = "none";
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
