import { getErrorMessage, getSuccessMessage } from "./main.js";

const loginForm = document.getElementById("login-form1");
const inputEmail = loginForm["email-user"];
const inputpswd = loginForm["password"];

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

loginForm.addEventListener("submit", (e) => {e.preventDefault();
  checkCredential();
 
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
  console.log(response)
  if (response.status == 200) {
    console.log("logged in succesfully");
    const res = await response.json();
    console.log(res)
    
    sessionStorage.token = res.accessToken;
    sessionStorage.userId = res.userId;
    sessionStorage.email = res.email;
    sessionStorage.name = res.name;
    sessionStorage.userStatus = res.userstatus;
    if(res.userStatus ==0){
      window.location.href = `./updateUser.html?index=${sessionStorage.userId}` 
    }
    if(res.userStatus ==1){
      window.location.href = `./dashboard.html?index=${sessionStorage.userId}`
    }
    if(res.userStatus ==1){
      window.location.href = `./dashboard.html`
    }
    
  } else {
    getErrorMessage(inputEmail, "This account does not exist");
    getErrorMessage(inputpswd, "");
    const error = await response.text()
    console.log(error);
   
  }
};
