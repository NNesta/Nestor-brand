import {getErrorMessage, getSuccessMessage} from "./main.js";
const token = sessionStorage.token;
export {checkContactInput};


const mobileBtn = document.getElementById("menu");
const nav = document.querySelector(".top");
const mobileBtnExit = document.getElementById("exit");
const formContact = document.getElementById("form-contact");
const mainLogin = document.getElementById("main-login")
const mainLogout = document.getElementById("main-logout")
const nameSect = document.getElementById("names")

if(sessionStorage.token){
  mainLogin.hidden = true
  mainLogout.hidden = false;
  nameSect.hidden = false;
}
else{
  mainLogin.hidden = false
  mainLogout.hidden = true;
  nameSect.hidden = true
}
mainLogout.onclick = ()=>{
  sessionStorage.clear()
}
if(sessionStorage.name){

const name = sessionStorage.name.split(" ")[0];
const updateUserLink = document.getElementById("usersignup");
updateUserLink.href = `./updateuser.html/${sessionStorage.userId}`
updateUserLink.innerHTML = `Hello ${name}`;
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
 
  const postQueryResponse = await fetch("http://127.0.0.1:3000/api/message", {
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
