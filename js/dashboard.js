import { getErrorMessage, getSuccessMessage } from "./main.js";

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("srchinput");


searchButton.addEventListener("click", () => {
  if (!searchInput.value.trim()) {
    getErrorMessage(searchButton.parentElement, "Put valid search");
  } else {
    getSuccessMessage(searchButton.parentElement, "Very good");
  }
});
articlePopulate();
function articlePopulate() {
  const articleContainer = document.querySelector(".article-modify");
  const articles = localStorage.articles || []
  let articlesArray = JSON.parse(JSON.stringify(articles)) ;
  for (let i = 0; i < articlesArray.length; i++) {
    let singleArticle = document.createElement("article");
    let link = document.createElement("a");
    let title = document.createElement("h2");
    let created = document.createElement("span");
    let updated = document.createElement("span");
    let article = document.createElement("p");
    let bottomPart = document.createElement("div");
    let updateButton = document.createElement("button")
    let deleteButton = document.createElement("button")
    let deleteLink = document.createElement("a");
    let updateLink = document.createElement("a");
    let img1 = document.createElement("i");
    let img2 = document.createElement("img");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
 
    title.innerText = articlesArray[i].title;
    article.innerText = articlesArray[i].article.slice(0,70);
    created.innerText = "Created: "+articlesArray[i].created;
    updated.innerText = "        Last updated: "+articlesArray[i].created;

    // img1.src = "img/view.png";
    title.className = "article-title";
    created.className = "date-time";
    updated.className = "date-time";
    img1.className = "fas fa-eye";
    img2.src = "img/comment (1).png";
    img2.className = "article-img";
    link.href = "./article.html";
    updateButton.innerText = "Update";
    deleteButton.innerText ="Delete";
    deleteLink.appendChild(deleteButton);
    updateLink.appendChild(updateButton);
    deleteLink.href = "delete.html?entity=article&index="+i;
    updateLink.href = "update.html?index="+i;
    
    
    span1.innerText = 1;
    span2.innerText = 0;
    bottomPart.className = "article-bottom"
    deleteButton.className = "article-delete"
    updateButton.className = "article-update"
    link.appendChild(title);

    bottomPart.appendChild(img1);
    bottomPart.appendChild(span1);
    bottomPart.appendChild(img2);
    bottomPart.appendChild(span2);
    bottomPart.appendChild(updateLink);
    bottomPart.appendChild(deleteLink);

    singleArticle.appendChild(link);
    singleArticle.appendChild(created);
    singleArticle.appendChild(updated);
    singleArticle.appendChild(article);
    singleArticle.appendChild(bottomPart);
    articleContainer.appendChild(singleArticle);
 
  }
}


