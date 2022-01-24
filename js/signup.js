import { getErrorMessage, getSuccessMessage } from "./main.js";

const signUpForm = document.getElementById("signup-form1");
const users = JSON.parse(localStorage.getItem("users")) || [];

signUpForm.addEventListener("submit", (e) => {e.preventDefault();
  if (!checkCredential()) {
    
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
  let userDetails = {
    userId: getId(),
    firstname: firstName,
    secondname: secondName,
    email: email,
    password: password,
    longitude: userLongitude,
    latitude: userLatitude,
  };
  users.push(userDetails);

  localStorage.setItem("users", JSON.stringify(users));
}

function getId() {
  let idArray = [];
  let id = 0;
  for (let i = 0; i < users.length; i++) {
    idArray.push(users[i].userId);
  }
  id = Math.max.apply(Math, idArray)
  if(id<=0)
  id=0;
  return id+1;
}
