import { getErrorMessage, getSuccessMessage } from "./main.js";

const loginForm = document.getElementById("login-form1");
const inputEmail = loginForm["email-user"];
const inputpswd = loginForm["password"];
const userArray = JSON.parse(localStorage.users)

loginForm.addEventListener("submit", (e) => {
  if (!checkCredential()) {
    e.preventDefault();
  }
});

function checkCredential() {
  let isValid = false;

  if (!inputEmail.value.trim()) {
    getErrorMessage(inputEmail, "Invalid email");
  } else {
    getSuccessMessage(inputEmail, "Very good");
  }
  if (!inputpswd.value.trim()) {
    getErrorMessage(inputpswd, "invalid password");
  } else {
    getSuccessMessage(inputpswd, "very good");

  }
  if (inputEmail.value.trim() && inputpswd.value.trim()) {
    return getUser()
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
