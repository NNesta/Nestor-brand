import { getErrorMessage, getSuccessMessage } from "./main.js";
const url = window.location.href;
const index = url.split("=")[1];
const token = sessionStorage.token;
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
const signUpForm = document.getElementById("signup-form1");
const inputFirstName = signUpForm["user-firstname"];
  const inputSecondName = signUpForm["user-secondname"];
  const inputEmail = signUpForm["email-user"];
  const userStatus = signUpForm["option-status"];

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
  userStatus.value = userData.userStatus

}

  update(index);

  const storeUser = async (status) => {
      let userNumber = 0
      if(status == "author"){
          userNumber = 1
      }
      if(status == "admin"){
          userNumber = 2
      }
    let userStatus = {
      "userStatus": userNumber
    };
    console.log(userStatus)
   try{ 
  const patchUserResponse = await fetch(`http://127.0.0.1:3000/api/user/${index}`,{
    method: "PATCH",
    body: JSON.stringify(userStatus),
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  console.log(patchUserResponse)
  if (patchUserResponse.status == 200) {

    window.location.href = "./user.html"
  } else {
    console.log(await patchUserResponse.json());
  }
  }
catch(error){
    console.log(error)
}
}
signUpForm.addEventListener("submit", (e) => {
 e.preventDefault()
  checkCredential()
});
function checkCredential() {
  if (!userStatus.value.trim()) {
    getErrorMessage(userStatus, "Invalid email");
    storeUser(userStatus.value.trim());
  } else {
    getSuccessMessage(userStatus, "Very good");
  }
}
 
// This function store the filled element into localstorage if all element have valid input

// This function validate form and call the store function then return true if all element have valid input

