import { getErrorMessage, getSuccessMessage} from "./main.js";

const loginForm = document.getElementById("login-form1");


    loginForm.addEventListener("submit", (e) => {
      
      if(!checkCredential()){
        e.preventDefault();
      }
    });

    function checkCredential() {
      let isValid = false;
        const inputEmail = loginForm["email-user"];
        const inputpswd = loginForm["password"];
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
        if(inputEmail.value.trim() && inputpswd.value.trim()){
          isvalid=true;
        }
        return isValid
      }