import { getErrorMessage, getSuccessMessage } from "./main.js";

const signUpForm = document.getElementById("signup-form1");

signUpForm.addEventListener("submit", (e) => {
  
  if(!checkCredential()){
    e.preventDefault()
  }
});

function checkCredential() {
  const inputFirstName = signUpForm["user-firstname"];
  const inputSecondName = signUpForm["user-secondname"];
  const inputEmail = signUpForm["email-user"];
  const inputPswd = signUpForm["password"];
  const inputPswdCheck = signUpForm["password-check"];
  let isValid = false;
  if (!inputFirstName.value.trim()) {
    getErrorMessage(inputFirstName, "Invalid email");
  } else {
    getSuccessMessage(inputFirstName, "Very good");
  }
  if (!inputSecondName.value.trim()) {
    getErrorMessage(inputSecondName, "Invalid email");
  } else {
    getSuccessMessage(inputSecondName, "Very good");
  }
  if (!inputEmail.value.trim()) {
    getErrorMessage(inputEmail, "Invalid email");
  } else {
    getSuccessMessage(inputEmail, "Very good");
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
  
  isValid =(
    inputFirstName.value &&
    inputSecondName.value &&
    inputPswd.value &&
    inputPswdCheck.value &&
    inputEmail.value &&
    (inputPswd.value.trim()== inputPswdCheck.value.trim()));

  if (isValid) {
    storeArticle(
      inputFirstName.value.trim(),
      inputSecondName.value.trim(),
      inputEmail.value.trim(),
      inputPswd.value.trim(),
    );

    return isValid;
  }
}
 let userLatitude = 0;
 let userLongitude = 0;
navigator.geolocation.getCurrentPosition(showPosition,showError)
function showPosition(position){
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;
}
function showError(){
  consle.log("this browser doesnot dupport geolocation");
}
// This function store the filled element into localstorage if all element have valid input
function storeArticle(
  firstName,
  secondName,
  email,
  password,
  position = null
) {
  let userDetails = {
    "firstname":firstName,
    "secondname":secondName,
    "email":email,
    "password":password,
    "longitude":userLongitude,
    "latitude":userLatitude
  };
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (position == null) {
    users.push(userDetails);
  } else {
    articles[position] = userDetails;
  }
  localStorage.setItem("users", JSON.stringify(users));
}

// This function validate form and call the store function then return true if all element have valid input
