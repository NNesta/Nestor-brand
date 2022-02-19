import {getErrorMessage, getSuccessMessage} from "./main.js";
const token = sessionStorage.token;
export {checkContactInput};


const mobileBtn = document.getElementById("menu");
const nav = document.querySelector(".top");
const mobileBtnExit = document.getElementById("exit");
const formContact = document.getElementById("form-contact");
const mainLogin = document.getElementById("main-login")
const mainLogout = document.getElementById("main-logout")
if(sessionStorage.token){
  mainLogin.hidden = true
  mainLogout.hidden = false;
}
else{
  mainLogin.hidden = false
  mainLogout.hidden = true;
}
mainLogout.onclick = ()=>{
  sessionStorage.token = ""
}

mobileBtn.addEventListener("click", () => {
  nav.classList.add("menu-btn");
});

mobileBtnExit.addEventListener("click", () => {
  nav.classList.remove("menu-btn");
});
const storeQueries = async (name,email,message) => {
  const messageDetail = {
    "name":name,
    "email":email,
    "message":message
  };
  console.log(messageDetail)
 
  const postQueryResponse = await fetch("https://nestor-portifolio-api.herokuapp.com/api/message", {
    method: "POST",
    body: JSON.stringify(messageDetail),
    headers: { "Content-Type": "application/json","Authorization":`Bearer ${token}` },
  })
  console.log(postQueryResponse)
}
formContact.addEventListener("submit", (e) => {
  if(!checkContactInput(formContact)){
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
    getSuccessMessage(inputName, "");
  }
  if (!inputEmail.value.trim()) {
    getErrorMessage(inputEmail, "put valid email");
  } else {
    getSuccessMessage(inputEmail, "");
  }
  if (!inputMessage.value.trim()) {
    getErrorMessage(inputMessage, "Put Message");
  } else {
    getSuccessMessage(inputMessage, "");
  }
isValid = inputName.value.trim() && inputEmail.value.trim() && inputMessage.value.trim() && true;


if(isValid == true){
  storeQueries(inputName.value.trim(),inputEmail.value.trim(),inputMessage.value.trim())
  return true;
}
 else{
   return false;
  }

}
