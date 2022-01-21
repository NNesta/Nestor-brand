import { getErrorMessage, getSuccessMessage } from "./main.js";
const mobileBtn = document.getElementById("menu");
const nav = document.querySelector(".top");
const mobileBtnExit = document.getElementById("exit");
const blogSearch = document.getElementById("search-blog-btn");
const inputSearch = document.getElementById("search-blog");

mobileBtn.addEventListener("click", () => {
  nav.classList.add("menu-btn");
});

mobileBtnExit.addEventListener("click", () => {
  nav.classList.remove("menu-btn");
});

blogSearch.addEventListener("click", () => {
  if (!inputSearch.value.trim()) {
    getErrorMessage(blogSearch.parentElement, "Put valid search");
  } else {
    getSuccessMessage(blogSearch.parentElement, "Very Nice");
  }
});
articlePopulate();
function articlePopulate() {
  const articleContainer = document.querySelector(".articles");
  let articlesArray = JSON.parse(localStorage.articles);
  for (let i = 0; i < articlesArray.length; i++) {
    let singleArticle = document.createElement("article");
    let link = document.createElement("a");
    let image = document.createElement("img");
    let title = document.createElement("h3");
    let description = document.createElement("p");
    let bottomPart = document.createElement("div");
    let img1 = document.createElement("i");
    let img2 = document.createElement("img");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    image.className = "main-img";
    image.src = articlesArray[i].picture;
    title.innerText = articlesArray[i].title;
    description.innerText = articlesArray[i].article.slice(0,30);
    singleArticle.className = "article";
    // img1.src = "img/view.png";
    
    img1.className = "fas fa-eye";
    img2.src = "img/comment (1).png";
    img2.className = "article-img";
    link.href = "./article.html";
    span1.innerText = 1;
    span2.innerText = 0;

    bottomPart.appendChild(img1);
    bottomPart.appendChild(span1);
    bottomPart.appendChild(img2);
    bottomPart.appendChild(span2);

    singleArticle.appendChild(title);
    singleArticle.appendChild(image);
    singleArticle.appendChild(description);
    singleArticle.appendChild(bottomPart);
    link.appendChild(singleArticle);

    articleContainer.appendChild(link);

    console.log(image);
  }
}
