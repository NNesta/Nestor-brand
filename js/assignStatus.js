import { getErrorMessage, getSuccessMessage } from "./main.js";
const url = window.location.href;
const index = url.split("=")[1];
const token = sessionStorage.token;
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
  window.location.href = "./login.html"
  sessionStorage.clear()
}
if(sessionStorage.name){

const name = sessionStorage.name.split(" ")[0];
const updateUserLink = document.getElementById("usersignup");
updateUserLink.href = `./updateuser.html?index=${sessionStorage.userId}`
updateUserLink.innerHTML = `Hello ${name}`;
}
const signUpForm = document.getElementById("signup-form1");
const inputFirstName = signUpForm["user-firstname"];
  const inputSecondName = signUpForm["user-secondname"];
  const inputEmail = signUpForm["email-user"];
  const userStatus = signUpForm["option-status"];

const update = async (index)=>{
const getUserResponse = await fetch(`https://nestor-portifolio-api.herokuapp.com/api/user/${index}`,{
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
      if(status == "user"){
          userNumber = 0
      }
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
  const patchUserResponse = await fetch(`https://nestor-portifolio-api.herokuapp.com/api/user/${index}`,{
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
    window.location.href = "./user.html"
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
    getErrorMessage(userStatus, "Invalid status");
    
  } else {
    getSuccessMessage(userStatus, "");
    storeUser(userStatus.value.trim());
  }
}
 
// This function store the filled element into localstorage if all element have valid input

// This function validate form and call the store function then return true if all element have valid input

