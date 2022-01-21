import {getErrorMessage, getSuccessMessage} from "./main.js";
export {checkContactInput};


const mobileBtn = document.getElementById("menu");
const nav = document.querySelector(".top");
const mobileBtnExit = document.getElementById("exit");
const formContact = document.getElementById("form-contact");

mobileBtn.addEventListener("click", () => {
  nav.classList.add("menu-btn");
});

mobileBtnExit.addEventListener("click", () => {
  nav.classList.remove("menu-btn");
});

formContact.addEventListener("submit", (e) => {
  if(!checkContactInput(formContact)){
    console.log("not")
    e.preventDefault();
  }
});

function checkContactInput(form) {
  const inputName = form["name"];
  const inputEmail = form["email"];
  const inputMessage = form["message"];
  let isValid = false;

  if (!inputName.value.trim()) {
    getErrorMessage(inputName, "put valid name");
  } else {
    getSuccessMessage(inputName, "Very Good");
  }
  if (!inputEmail.value.trim()) {
    getErrorMessage(inputEmail, "put valid email");
  } else {
    getSuccessMessage(inputEmail, "Very Good");
  }
  if (!inputMessage.value.trim()) {
    getErrorMessage(inputMessage, "Put Message");
  } else {
    getSuccessMessage(inputMessage, "Very good");
  }
isValid = true && inputName.value.trim() && inputEmail.value.trim() && inputMessage.value.trim();
if(isValid){
  storeQueries(inputName.value.trim(),inputEmail.value.trim(),inputMessage.value.trim())
}
return isValid;
}
function storeQueries(
  name,
  email,
  message,
  position = null
) {
  const now = new Date();
  let query = {
    "date": now.toDateString(),
    "name":name,
    "email":email,
    "message":message
  };
  let queries = JSON.parse(localStorage.getItem("queries")) || [];
  if (position == null) {
    queries.push(query);
  } else {
    queries[position] = query;
  }
  localStorage.setItem("queries", JSON.stringify(queries));
}