const notificationMessage = document.querySelector(".notification-message");
const form = document.querySelector("form");
const groceryInput = form.querySelector("input");
const formSubmitButton = form.querySelector("button");
const grocerySection = document.querySelector(".displayed-grocery-items");
const clearGroceryButton = document.querySelector(".remove-all-items");

let groceries = getGroceryItemsFromLocalStorage();

groceries?.forEach((grocery) => {
  displayGroceryItem(grocery);
});

function addClass(element, className) {
  element.classList.add(className);
}

function removeCurrentStyle(notificationMessage, className) {
  clearTimeout(notificationMessage.timeoutId);
  notificationMessage.timeoutId = setTimeout(() => {
    notificationMessage.innerText = "";
    notificationMessage.style.visibility = "hidden";
    notificationMessage.classList.remove(className);
  }, 2000);
}

function removeChild(parent, child) {
  parent.removeChild(child);
}

function displayNotification(groceryType, className) {
  notificationMessage.style.visibility = "visible";
  notificationMessage.className = "notification-message";

  switch (groceryType) {
    case "new": {
      notificationMessage.innerText = "A new Grocery item Added";
      addClass(notificationMessage, className);
      break;
    }
    case "update": {
      notificationMessage.innerText = "A Grocery item updated";
      addClass(notificationMessage, className);

      break;
    }
    case "delete": {
      notificationMessage.innerText = "A Grocery item deleted";
      addClass(notificationMessage, className);

      break;
    }
    case "clear": {
      notificationMessage.innerText = "All Grocery items removed";
      addClass(notificationMessage, className);
      break;
    }
    case "empty": {
      notificationMessage.innerText = "Please, type valid input";
      addClass(notificationMessage, className);
      break;
    }
  }

  removeCurrentStyle(notificationMessage, className);
}

function beforeUpdateGroceryItem() {
  groceries = groceries.map((grocery) => ({ ...grocery, edited: false }));
}

function updateGroceryItem(groceryItem) {
  beforeUpdateGroceryItem();
  const updatedGroceries = groceries.map((grocery) => {
    if (grocery.key === groceryItem.key) {
      grocery.edited = true;
      return grocery;
    }
    return grocery;
  });

  groceries = updatedGroceries;
  groceryInput.value = groceryItem.grocery;
}

function removeGroceryItemFromDOM(groceryItemIndex) {
  const findItemFromGrocerySection = grocerySection.getElementsByClassName(
    "individual-grocery-item"
  )[groceryItemIndex];

  removeChild(grocerySection, findItemFromGrocerySection);
}

function deleteGroceryItem(groceryItem) {
  const findGroceryItemIndex = groceries.findIndex(
    (grocery) => grocery.key === groceryItem.key
  );
  groceries = groceries.filter((grocery) => grocery.key !== groceryItem.key);

  displayNotification("delete", "item-deleted");
  removeGroceryItemFromDOM(findGroceryItemIndex);
  updateGroceryItemInLocalStorage(groceries);
}

function generateHTMLForGroceryItem(groceryItem) {
  const newGroceryElement = document.createElement("div");
  newGroceryElement.classList.add("individual-grocery-item");
  newGroceryElement.setAttribute("data-id", groceryItem.key);

  newGroceryElement.innerHTML = `
       <h2 class="item-name">${groceryItem.grocery}</h2>
          <div class="action-buttons">
            <button type="button" class="edit-button">
              <img
                src="./Assets/Icons/editIcon.svg"
                alt="Edit Icon to Edit grocery item"
              />
            </button>
            <button type="button" class="delete-button">
              <img
                src="./Assets/Icons/deleteIcon.svg"
                alt="Delete Icon to Delete grocery item"
              />
            </button>
          </div>
    `;
  const editButton = newGroceryElement.querySelector(".edit-button");
  const deleteButton = newGroceryElement.querySelector(".delete-button");

  editButton.addEventListener("click", () => updateGroceryItem(groceryItem));
  deleteButton.addEventListener("click", () => deleteGroceryItem(groceryItem));

  return newGroceryElement;
}

function insertBefore(parent, child, referenceNode) {
  parent.insertBefore(child, referenceNode);
}

function appendChild(parent, child) {
  parent.appendChild(child);
}

function displayGroceryItem(newGroceryItem, indexElement = -1) {
  if (indexElement >= 0) {
    const findEditedGrocery = grocerySection.getElementsByClassName(
      "individual-grocery-item"
    )[indexElement];
    const elementSibling = findEditedGrocery.nextElementSibling;
    removeChild(grocerySection, findEditedGrocery);

    if (elementSibling !== null) {
      insertBefore(
        grocerySection,
        generateHTMLForGroceryItem(newGroceryItem),
        elementSibling
      );
    } else {
      appendChild(grocerySection, generateHTMLForGroceryItem(newGroceryItem));
    }
  } else {
    appendChild(grocerySection, generateHTMLForGroceryItem(newGroceryItem));
  }
}

function addGroceryItem(grocery) {
  const newGroceryItem = {
    key: new Date().getTime(),
    edited: false,
    grocery,
  };
  groceries.push(newGroceryItem);

  displayNotification("new", "item-added");
  addGroceryItemToLocalStorage(newGroceryItem);
  displayGroceryItem(newGroceryItem);
}

function updateGrocerElement(isItemEdited, editedGroceryItem) {
  const editedItemIndex = groceries.findIndex(
    (grocery) => grocery.key === isItemEdited.key
  );

  groceries[editedItemIndex] = {
    ...isItemEdited,
    grocery: editedGroceryItem,
    edited: false,
  };

  displayNotification("update", "item-updated");
  displayGroceryItem(groceries[editedItemIndex], editedItemIndex);
  updateGroceryItemInLocalStorage(groceries);
}

function handleFormEvent(e) {
  e.preventDefault();

  const inputVal = groceryInput.value.trim();
  if (inputVal === "" || inputVal.length > 30) {
    displayNotification("empty", "empty-string");
    return;
  }

  const isItemEdited = groceries.filter((grocery) => grocery.edited === true);

  if (isItemEdited.length > 0) {
    updateGrocerElement(isItemEdited[0], inputVal);
  } else {
    addGroceryItem(inputVal);
  }

  groceryInput.value = "";
}

form.addEventListener("submit", (e) => handleFormEvent(e));

function removeAllGroceries(grocerySection) {
  grocerySection.innerHTML = "";
  groceries.length = 0;
  displayNotification("clear", "all-items-removed");
  clearLocalStorage();
}

clearGroceryButton.addEventListener("click", () =>
  removeAllGroceries(grocerySection)
);

function getGroceryItemsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("groceries")) || [];
}

function addGroceryItemToLocalStorage(newGroceryItem) {
  const combineGroceries = [
    ...getGroceryItemsFromLocalStorage(),
    newGroceryItem,
  ];
  localStorage.setItem("groceries", JSON.stringify(combineGroceries));
}

function updateGroceryItemInLocalStorage(updatedGroceries) {
  localStorage.setItem("groceries", JSON.stringify(updatedGroceries));
}

function clearLocalStorage() {
  localStorage.clear();
}
