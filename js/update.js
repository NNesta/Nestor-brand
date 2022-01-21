import { getErrorMessage, getSuccessMessage } from "./main.js";

const url = window.location.href;
const updateForm = document.getElementById("update-form");
const articleTitle = updateForm["title"];
const articlePicture = updateForm["picture"];
const articleAuthor = updateForm["author"];
const articleCreated = updateForm["created"];
const articleArticle = updateForm["article"];
const articleTag = updateForm["tag"];
const articleArray = JSON.parse(localStorage.getItem("articles"));
let articleId = parseInt(url.split("=")[1]);
updateForm.addEventListener("submit", (e) => {
  
  if (!updateFormValidate()) {
    e.preventDefault();
  }
});


update(articleId);
function update(articleId) {
  articleTitle.value = articleArray[articleId].title;
  articlePicture.value = "";
  articleAuthor.value = articleArray[articleId].author;
  articleCreated.value = articleArray[articleId].created;
  articleArticle.value = articleArray[articleId].article;
  articleTag.value = articleArray[articleId].tag;

}
function updateFormValidate() {
  let isValid = false;
  if (!articleTitle) {
    
    getErrorMessage(articleTitle, "Put valid title");
  } else {
  
    getSuccessMessage(articleTitle, "Very good");
  }
  if (!articlePicture) {
    
    getErrorMessage(articlePicture, "Put valid title");
  } else {
  
    getSuccessMessage(articlePicture, "Very good");
  }
  if (!articleAuthor) {
    

    getErrorMessage(articleAuthor, "Put valid title");
  } else {
  
    getSuccessMessage(articleAuthor, "Very good");
  }
  if (!articleCreated) {
    
    getErrorMessage(articleCreated, "Put valid title");
  } else {
  
    getSuccessMessage(articleCreated, "Very good");
  }
  if (!articleArticle) {
    i
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

isValid = (articleTitle.value && articlePicture.value && articleTag.value && articleAuthor.value && articleCreated.value && articleArticle.value)
  if (isValid) {
    // console.log("yes")
    storeArticle(
      articleTitle.value.trim(),
      picture,
      articleAuthor.value.trim(),
      articleCreated.value.trim(),
      articleArticle.value.trim(),
      articleTag.value.trim()
    );

    return isValid;
  }
}
function storeArticle(
  title,
  picture,
  author,
  created,
  articleDetail,
  tag,
  position = null
) {
  let article = {
    "title": title,
    "picture": picture,
    "author": author,
    "created": created,
    "article": articleDetail,
    "tag": tag,
  };
  
 articleArray[articleId] = article;
  localStorage.setItem("articles", JSON.stringify(articleArray));
  console.log(articleArray)
}