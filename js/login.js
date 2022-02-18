import { getErrorMessage, getSuccessMessage } from "./main.js";

const loginForm = document.getElementById("login-form1");
const inputEmail = loginForm["email-user"];
const inputpswd = loginForm["password"];
let check = false;


loginForm.addEventListener("submit", (e) => {
  checkCredential();
  if (!check) {
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
    return getUser(inputEmail.value.trim(), inputpswd.value.trim());
  } else {
    return false;
  }
}
const getUser = async (email, password) => {
  console.log("tried to login frontend");
  const credentials = {
    email: email,
    password: password,
  };
  const response = await fetch("https://nestor-portifolio-api.herokuapp.com/api/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status == 200) {
    console.log("logged in succesfully");
    const res = await response.json();
    console.log(res)
    
    sessionStorage.token = res.accessToken;
    check = true;
    window.location.href = "./dashboard.html"
  } else {
    getErrorMessage(inputEmail, "This account does not exist");
    getErrorMessage(inputpswd, "");
    console.log("I got there");
    check = false;
  }
};
