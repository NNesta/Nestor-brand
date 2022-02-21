import { getErrorMessage, getSuccessMessage } from "./main.js";
const url = window.location.href;
const updateForm = document.getElementById("update-form");
const token = sessionStorage.token;
let picture = "";
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

updateForm["picture"].addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    picture = reader.result;
  });

  reader.readAsDataURL(this.files[0]);
});

const articleTitle = updateForm["title"];
const articlePicture = updateForm["picture"];
const articleArticle = updateForm["article"];
const articleTag = updateForm["tag"];
const index = url.split("=")[1];
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateFormValidate();
});



const update = async (index) =>{
  const articleResponse = await fetch(`https://nestor-portifolio-api.herokuapp.com/api/article/${index}`)
  const articleArray = await articleResponse.json()
  articleTitle.value = articleArray.title;
  articleArticle.value = articleArray.articleDetail;
  articleTag.value = articleArray.tag;

}
update(index);
const storeArticle = async (title, picture, articleDetail, tag) =>{
  
  let article = {
    title: title,
    picture: picture,
    articleDetail: articleDetail,
    tag: tag
   
  };
  try{
  const response = await fetch(`https://nestor-portifolio-api.herokuapp.com/api/article/${index}`, {
    method: "PATCH",
    body: JSON.stringify(article),
    headers: { "Content-Type": "application/json","Authorization":`Bearer ${token}` },
  });
  console.log(response)}
  catch(error){
    console.log(error)
  }
  if(response.status == 200){
    window.location.href = "./dashboard.html"
  }

}

function updateFormValidate() {
  let isValid = false;
  if (!articleTitle) {
    
    getErrorMessage(articleTitle, "Put valid title");
  } else {
  
    getSuccessMessage(articleTitle, "Very good");
  }
  
  if (!articleArticle) {
    getErrorMessage(articleArticle, "Put valid title");
  } else {
    
    getSuccessMessage(articleArticle, "Very good");
  }
  if (!articleTag) {
    i
    getErrorMessage(articleTag, "Put valid title");
  } else {
    
    getSuccessMessage(articleTag, "Very good");
  }

isValid = (articleTitle.value && articleArticle.value&& articleTag.value)
  if (isValid) {
    // console.log("yes")
    storeArticle(
      articleTitle.value.trim(),
      picture,
      articleArticle.value.trim(),
      articleTag.value.trim()
    );

    return isValid;
  }
}

