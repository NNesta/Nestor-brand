export { getErrorMessage, getSuccessMessage };



//FORM VALIDATION OF CONTACT FORM

function getErrorMessage(input, errormessage) {
  input.parentElement.classList.remove("success");
  input.parentElement.classList.add("fail");
  const small = input.parentElement.querySelector("small");
  small.innerText = errormessage;
}
function getSuccessMessage(input, successMessage) {
  input.parentElement.classList.remove("fail");
  input.parentElement.classList.add("success");

  const small = input.parentElement.querySelector("small");
  small.innerText = "";
}
