import { getErrorMessage, getSuccessMessage } from "./main.js";
export { storeArticle };

const createForm = document.getElementById("create-form");
let picture = "";
let articles = [];
createForm["picture"].addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    picture = reader.result;
    console.log(picture);
  });

  reader.readAsDataURL(this.files[0]);
});

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createFormValidate();

  
});
// This function store the filled element into localstorage if all element have valid input
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
    title: title,
    picture: picture,
    author: author,
    created: created,
    article: articleDetail,
    tag: tag,
  };
  
  articles = JSON.parse(localStorage.getItem("articles")) || [];
  if (position == null) {
    articles.push(article);
  } else {
    articles[position] = article;
  }
  localStorage.setItem("articles", JSON.stringify(articles));
}

// This function validate form and call the store function then return true if all element have valid input

function createFormValidate() {
  const articleTitle = createForm["title"];
  const articlePicture = createForm["picture"];
  const articleAuthor = createForm["author"];
  const articleCreated = createForm["created"];
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
  if (!articleAuthor.value.trim()) {
    

    getErrorMessage(articleAuthor, "Put valid title");
  } else {
  
    getSuccessMessage(articleAuthor, "Very good");
  }
  if (!articleCreated.value.trim()) {
    
    getErrorMessage(articleCreated, "Put valid title");
  } else {
  
    getSuccessMessage(articleCreated, "Very good");
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
 isValid = true && articleTitle.value && articlePicture.value && articleAuthor.value && articleArticle.value && articleCreated.value && articleTag.value;

 if (isValid) {
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
