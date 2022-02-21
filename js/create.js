import { getErrorMessage, getSuccessMessage } from "./main.js";
const token = sessionStorage.token;
let picture = "";

console.log(token);
const now = new Date();
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

const createForm = document.getElementById("create-form");



createForm["picture"].addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    picture = reader.result;
  });

  reader.readAsDataURL(this.files[0]);
});

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!createFormValidate()) {
    
  }
});
// This function store the filled element into localstorage if all element have valid input
const storeArticle = async (title, picture, articleDetail, tag) => {
  let article = {
    title: title,
    picture: picture,
    articleDetail: articleDetail,
    tag: tag

  };
  console.log(article)

  const response = await fetch("https://nestor-portifolio-api.herokuapp.com/api/article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json ",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });
  console.log(response);
};

// This function validate form and call the store function then return true if all element have valid input

function createFormValidate() {
  const articleTitle = createForm["title"];
  const articlePicture = createForm["picture"];
  const articleArticle = createForm["article"];
  const articleTag = createForm["tag"];
  let isValid = false;
  if (!articleTitle.value.trim()) {
    getErrorMessage(articleTitle, "Put valid title");
  } else {
    getSuccessMessage(articleTitle, "Very good");
  }
  if (!articlePicture.value.trim()) {
    getErrorMessage(articlePicture, "Put valid title");
  } else {
    getSuccessMessage(articlePicture, "Very good");
  }

  if (!articleArticle.value.trim()) {
    getErrorMessage(articleArticle, "Put valid title");
  } else {
    getSuccessMessage(articleArticle, "Very good");
  }
  if (!articleTag.value.trim()) {
    getErrorMessage(articleTag, "Put valid title");
  } else {
    getSuccessMessage(articleTag, "Very good");
  }
  isValid =
    articleTitle.value &&
    articlePicture.value &&
    articleArticle.value &&
    articleTag.value;

  if (isValid) {
    storeArticle(articleTitle.value, picture, articleArticle.value, articleTag.value);
    return isValid;
  }
}
