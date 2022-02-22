import { getErrorMessage, getSuccessMessage } from "./main.js";
const url = window.location.href;
const search = url.split("=")[1];
const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("srchinput");
const numberOfArticle = document.getElementById("created-article");

const articlePopulate = async (articlesArray) => {
  const articleContainer = document.querySelector(".article-modify");

  for (let i = 0; i < articlesArray.length; i++) {
    const commentsResponse = await fetch(
      `https://nestor-portifolio-api.herokuapp.com/api/comment/${articlesArray[i]._id}`
    );
    const likeResponse = await fetch(
      `https://nestor-portifolio-api.herokuapp.com/api/like/${articlesArray[i]._id}`
    );
    const likes = await likeResponse.json();
    const numberOfLikes = likes.length;
    const articleComments = await commentsResponse.json();
    const numberOfComments = articleComments.length;
    let singleArticle = document.createElement("article");
    let link = document.createElement("a");
    let title = document.createElement("h2");
    let created = document.createElement("span");
    let updated = document.createElement("span");
    let article = document.createElement("p");
    let bottomPart = document.createElement("div");
    let updateButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    let deleteLink = document.createElement("a");
    let updateLink = document.createElement("a");
    let img1 = document.createElement("i");
    let img2 = document.createElement("i");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    title.innerText = articlesArray[i].title;
    article.innerText = articlesArray[i].articleDetail.slice(0, 70);
    created.innerText = "Created: " + articlesArray[i].created;
    updated.innerText = "        Last updated: " + articlesArray[i].created;

    // img1.src = "img/view.png";
    title.className = "article-title";
    created.className = "date-time";
    updated.className = "date-time";
    img1.className = "fas fa-thumbs-up";
    // img2.src = "img/comment (1).png";
    img2.className = "fas fa-comment-alt";
    link.href = `./article.html?id=${articlesArray[i]._id}`;
    span1.innerText = numberOfLikes;
    span2.innerText = numberOfComments;

    updateButton.innerText = "Update";
    deleteButton.innerText = "Delete";
    deleteLink.appendChild(deleteButton);
    updateLink.appendChild(updateButton);
    deleteLink.href = `delete.html?entity=article&index=${articlesArray[i]._id}`;
    updateLink.href = `update.html?index=${articlesArray[i]._id}`;
    bottomPart.className = "article-bottom";
    deleteButton.className = "article-delete";
    updateButton.className = "article-update";
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
};

const getArticles = async () => {
  let articlesResponse = {};
  if (search) {
    articlesResponse = await fetch(
      `https://nestor-portifolio-api.herokuapp.com/api/article/search/${search}`
    );
  } else {
    articlesResponse = await fetch(
      "https://nestor-portifolio-api.herokuapp.com/api/article"
    );
  }
  const articlesRes = await articlesResponse.json();
  numberOfArticle.innerHTML = articlesRes.length;
  let authorArticles = {};
  if (sessionStorage.userStatus == 1) {
    window.location.href = ".";
  }
  if (sessionStorage.userStatus == 2) {
    authorArticles = articlesRes.filter((article) => {
      return article.author.id == sessionStorage.userId;
    });
  }
  if (sessionStorage.userStatus == 3) {
    authorArticles = articlesRes;
  }
  

  articlePopulate(authorArticles);
};
const logoutb = document.getElementById("logout-button");
logoutb.onclick = () => {
  sessionStorage.token = "";
  window.location.href = ".";
};

searchButton.addEventListener("click", () => {
  if (!searchInput.value.trim()) {
    getErrorMessage(searchButton.parentElement, "Put valid search");
  } else {
    getSuccessMessage(searchButton.parentElement, "Very good");
    window.location.href = `./dashboard.html?search=${searchInput.value.trim()}`;
  }
});

getArticles();
