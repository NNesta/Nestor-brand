import { getErrorMessage, getSuccessMessage } from "./main.js";

const signUpForm = document.getElementById("signup-form1");
const users = JSON.parse(localStorage.getItem("users")) || [];

signUpForm.addEventListener("submit", (e) => {
  if (!checkCredential()) {
    e.preventDefault();
  }
});
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

function checkCredential() {
  const inputFirstName = signUpForm["user-firstname"];
  const inputSecondName = signUpForm["user-secondname"];
  const inputEmail = signUpForm["email-user"];
  const inputPswd = signUpForm["password"];
  const inputPswdCheck = signUpForm["password-check"];
  let isValid = false;
  if (!inputFirstName.value.trim()) {
    getErrorMessage(inputFirstName, "Invalid Name");
  } else {
    getSuccessMessage(inputFirstName, "");
  }
  if (!inputSecondName.value.trim()) {
    getErrorMessage(inputSecondName, " Invalid Name");
  } else {
    getSuccessMessage(inputSecondName, " ");
  }
  if (!inputEmail.value.trim()) {
    getErrorMessage(inputEmail, " Invalid email");
  } else {
    getSuccessMessage(inputEmail, "");
  }

  if (!inputPswd.value.trim()) {
    getErrorMessage(inputPswd, "invalid password");
  } else {
    if (inputPswd.value.trim() != inputPswdCheck.value.trim()) {
      getErrorMessage(inputPswd, "The password does not match");
    } else {
      getSuccessMessage(inputPswd, "very good");
    }
  }
  if (!inputPswdCheck.value.trim()) {
    getErrorMessage(inputPswdCheck, "invalid password");
  } else {
    if (inputPswd.value.trim() != inputPswdCheck.value.trim()) {
      getErrorMessage(inputPswdCheck, "The password does not match");
    } else {
      getSuccessMessage(inputPswdCheck, "very good");
    }
  }

  isValid =
    inputFirstName.value &&
    inputSecondName.value &&
    inputPswd.value &&
    inputPswdCheck.value &&
    inputEmail.value &&
    inputPswd.value.trim() == inputPswdCheck.value.trim();

  if (isValid) {
    storeArticle(
      inputFirstName.value.trim(),
      inputSecondName.value.trim(),
      inputEmail.value.trim(),
      inputPswd.value.trim()
    );

    return isValid;
  }
}
let userLatitude = 0;
let userLongitude = 0;
navigator.geolocation.getCurrentPosition(showPosition, showError);
function showPosition(position) {
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;
}
function showError() {
  console.log("this browser doesnot dupport geolocation");
}
// This function store the filled element into localstorage if all element have valid input
function storeArticle(firstName, secondName, email, password) {
  const userDetails = {
  
    firstName: firstName,
    secondName: secondName,
    email: email,
    password: password,
    userStatus:0,
    longitude: userLongitude,
    latitude: userLatitude
  };
  fetch("https://nestor-portifolio-api.herokuapp.com/api/user",{method: "POST",
  body: JSON.stringify(userDetails ),
  headers: { 'Content-Type': 'application/json'}}).then(response=>response.json()).then(data=>console.log(data))
}
