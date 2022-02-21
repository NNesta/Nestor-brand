import { getErrorMessage, getSuccessMessage } from "./main.js";

// const articles = fetch('http://127.0.0.1:3000/api/article').then(response => response.json())

// console.log(articles.then(data=>console.log(data)))

const mobileBtn = document.getElementById("menu");
const nav = document.querySelector(".top");
const mobileBtnExit = document.getElementById("exit");
const blogSearch = document.getElementById("search-blog-btn");
const inputSearch = document.getElementById("search-blog");
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
  sessionStorage.clear()
}
if(sessionStorage.name){

const name = sessionStorage.name.split(" ")[0];
const updateUserLink = document.getElementById("usersignup");
updateUserLink.href = `./updateuser.html/${sessionStorage.userId}`
updateUserLink.innerHTML = `Hello ${name}`;
}

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
// articlePopulate();
const articlePopulate = async() => {
  const articles = await fetch('http://127.0.0.1:3000/api/article')
  const articleContainer = document.querySelector(".articles");
  // let articlesArray = JSON.parse(localStorage.articles);
 const articlesArray = await articles.json()
  for (let i = 0; i < articlesArray.length; i++) {
    const commentsResponse = await fetch(`http://127.0.0.1:3000/api/comment/${articlesArray[i]._id}`);
    const likeResponse = await fetch(`http://127.0.0.1:3000/api/like/${articlesArray[i]._id}`);
    const likes = await likeResponse.json();
    const numberOfLikes = likes.length;
    const articleComments = await commentsResponse.json();
    const numberOfComments = articleComments.length;
    let singleArticle = document.createElement("article");
    let link = document.createElement("a");
    let image = document.createElement("img");
    let title = document.createElement("h3");
    let description = document.createElement("p");
    let bottomPart = document.createElement("div");
    let img1 = document.createElement("i");
    let img2 = document.createElement("i");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    image.className = "main-img";
    image.src = articlesArray[i].picture;
    console.log(image.src)
    title.innerText = articlesArray[i].title.slice(0,30);
    description.innerText = articlesArray[i].articleDetail.slice(0,30);
    singleArticle.className = "article";
    // img1.src = "img/view.png";
   
    img1.className = "fas fa-thumbs-up";
    // img2.src = "img/comment (1).png";
    img2.className = "fas fa-comment-alt";
    link.href = `./article.html?id=${articlesArray[i]._id}`;
    span1.innerText = numberOfLikes;
    span2.innerText = numberOfComments;

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
  }}
  articlePopulate()

