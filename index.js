import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
  databaseURL: "https://playground-d76aa-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("myInput")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")



addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value 
  if(inputValue == '')
    {
      alert("Can't insert blank item")
    } 
    else{
      push(shoppingListInDB, inputValue)
      clearInputFieldEl()
    }
})

onValue(shoppingListInDB, function(snapshot) {
  if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val())

    clearShoppingListEl()

    for (let i = 0; i<itemsArray.length; i++)
    {
      let currentItem = itemsArray[i]
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]
      appendItemToShoppingList(currentItem)
    }
  }
  else{
    shoppingListEl.innerHTML = "Oops, it's empty here"
    shoppingListEl.style.fontFamily = 'Rubik';
  }
})

function clearShoppingListEl(){
  shoppingListEl.innerHTML = ''
}

function clearInputFieldEl(){
  inputFieldEl.value = ''
}

function appendItemToShoppingList(item){
  // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
  let itemId = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")
  newEl.textContent = itemValue

  newEl.addEventListener("click", function(){
    // alert("Item Id is : "+itemId)
    let exactLocationinDB = ref(database, `shoppingList/${itemId}`)
    remove(exactLocationinDB)
  })

  shoppingListEl.append(newEl)
}

