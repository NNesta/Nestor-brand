import { getErrorMessage, getSuccessMessage } from "./main.js";
const url = window.location.href;
const index = url.split("=")[1];
const token = sessionStorage.token;


const update = async (index)=>{
const getUserResponse = await fetch(`http://127.0.0.1:3000/api/user/${index}`,{
  method: "GET",
  headers:{
    "accept":"application/json",
    "Authorization": `Bearer ${token}`
  }
})
const userData = await getUserResponse.json()
  inputFirstName.value = userData.firstName;
  inputSecondName.value = userData.secondName;
  inputEmail.value = userData.email;
  inputPswd.value = "";
  inputPswdCheck.value = "";

}
const signUpForm = document.getElementById("signup-form1");
const inputFirstName = signUpForm["user-firstname"];
  const inputSecondName = signUpForm["user-secondname"];
  const inputEmail = signUpForm["email-user"];
  const inputPswd = signUpForm["password"];
  const inputPswdCheck = signUpForm["password-check"];
  
  update(index);
signUpForm.addEventListener("submit", (e) => {
  
  if(!checkCredential()){
    e.preventDefault()
  }
});


 
const storeUser = async (firstName,secondName,email, password) => {
  let userDetails = {
    "firstname":firstName,
    "secondname":secondName,
    "email":email,
    "password": password,
    "longitude":userLongitude,
    "latitude":userLatitude
  };
  
const patchUserResponse = await fetch("http://127.0.0.1:3000/api/user",{
  method: "PATCH",
  headers:{
    "accept":"application/json",
    "Authorization": `Bearer ${token}`
  }
})
console.log(patchUserResponse)
}

function checkCredential() {
  
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
    storeUser(
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
  console.log("this browser doesnot dupport geolocation");
}
// This function store the filled element into localstorage if all element have valid input

// This function validate form and call the store function then return true if all element have valid input
