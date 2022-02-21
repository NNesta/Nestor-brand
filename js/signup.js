import { getErrorMessage, getSuccessMessage } from "./main.js";

const signUpForm = document.getElementById("signup-form1");

let isValid = false;
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

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
   checkCredential()
});
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
const storeArticle = async (firstName, secondName, email, password) =>{
  const userDetails = {
  
    firstName: firstName,
    secondName: secondName,
    email: email,
    password: password,
    userStatus:0,
    longitude: userLongitude,
    latitude: userLatitude
  };
  try{
    console.log(userDetails)
 const response = await fetch("http://127.0.0.1:3000/api/user",{method: "POST",
  body: JSON.stringify(userDetails ),
  headers: { 'Content-Type': 'application/json'}})
console.log(response)
const res = await response.json()
if (response.status == 200) {

  window.location.href = "./login.html"
} else {
  console.log(res);
}

  }catch(error){
  console.log({error});
  }


}

function checkCredential() {
  const inputFirstName = signUpForm["user-firstname"];
  const inputSecondName = signUpForm["user-secondname"];
  const inputEmail = signUpForm["email-user"];
  const inputPswd = signUpForm["password"];
  const inputPswdCheck = signUpForm["password-check"];
  
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
      getSuccessMessage(inputPswdCheck, "");
    }
  }

  isValid =
    inputFirstName.value &&
    inputSecondName.value &&
    inputPswd.value &&
    inputPswdCheck.value &&
    inputEmail.value &&
    inputPswd.value.trim() == inputPswdCheck.value.trim() && true;

  if (isValid) {
    storeArticle(
      inputFirstName.value.trim(),
      inputSecondName.value.trim(),
      inputEmail.value.trim(),
      inputPswd.value.trim()
    );


  }
}

