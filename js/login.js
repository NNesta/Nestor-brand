import { getErrorMessage, getSuccessMessage } from "./main.js";

const loginForm = document.getElementById("login-form1");
const inputEmail = loginForm["email-user"];
const inputpswd = loginForm["password"];
const users = localStorage.users || [];
const userArray = JSON.parse(JSON.stringify(users));
JSON.p

loginForm.addEventListener("submit", (e) => {
  if(!checkCredential()){
    e.preventDefault();
  }
      
  
  
});

function checkCredential() {

  if (!inputEmail.value.trim()) {
    getErrorMessage(inputEmail, "Invalid email");
  } else {
    getSuccessMessage(inputEmail, "");
  }
  if (!inputpswd.value.trim()) {
    getErrorMessage(inputpswd, "invalid password");
  } else {
    getSuccessMessage(inputpswd, "");

  }
  if (inputEmail.value.trim() && inputpswd.value.trim()) {
    return getUser()
  }
  else {
    return false;
  }

}
function getUser() {
  for(let i=0;i<userArray.length;i++){
    if(inputEmail.value.trim() === userArray[i].email){
      if(inputpswd.value.trim() === userArray[i].password){
        localStorage.active = userArray[i].userId
             return true;
      }
      else{
        getErrorMessage(inputpswd, "invalid password");
        return false;  
      }
    }
    
  }
  getErrorMessage(inputEmail, "This account does not exist");
  getErrorMessage(inputpswd, "");
}
