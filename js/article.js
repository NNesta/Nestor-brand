import { getSuccessMessage, getErrorMessage } from "./main.js";
const token = sessionStorage.token;
const commentForm = document.getElementById("form-contact");
const url = window.location.href;
const index = url.split("=")[1];

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


let articleComments = "";
console.log(index);
// const articles = JSON.parse(localStorage.articles);
const getArticle = async ()=>{
const articleResponse = await fetch(`https://nestor-portifolio-api.herokuapp.com/api/article/${index}`)
const commentsResponse = await fetch(`https://nestor-portifolio-api.herokuapp.com/api/comments/`)
const articleData = await articleResponse.json();
const comments = await commentsResponse.json();

  console.log(articleData)
const articleDetail = document.querySelector(".article-detail1");
const mainImage = document.createElement("img");
mainImage.src = articleData.picture;
mainImage.className = "article-img-main";
const title = document.createElement("h3");
title.innerText = articleData.title;
const body = document.createElement("p");
body.innerText = articleData.articleDetail;
articleDetail.appendChild(mainImage);
articleDetail.appendChild(title);
articleDetail.appendChild(body);
  const articleComments = comments.filter(commentObj=>commentObj.articleId === index);
  const allComment = document.querySelector(".others-comment");
  const head1 = document.createElement("h2");
  
  head1.innerText = "What others are saying about this article";
  allComment.appendChild(head1);
  for (let i = 0; i < articleComments.length; i++) {
    const commentSection = document.createElement("div");
    commentSection.className = "comment-1";
    const commentor = document.createElement("h4");
    const date = document.createElement("span");
    const commentaire = document.createElement("p");
    date.className = "date";
    commentaire.innerText = articleComments[i].comment;
    commentor.innerText = articleComments[i].commentor;
    date.innerText = articleComments[i].created;
    commentSection.appendChild(commentor);
    commentSection.appendChild(date);
    commentSection.appendChild(commentaire);
    allComment.appendChild(commentSection);
  };
  
}

getArticle()
// const article = articles[index];
commentForm.addEventListener("submit", (e) => {
  if (!checkComment(commentForm)) {
    e.preventDefault();
  }
});

const likeBtn = document.querySelector(".like__btn");
let likeIcon = document.querySelector("#icon"),
  count = document.querySelector("#count");

let clicked = false;

likeBtn.addEventListener("click", () => {
  if (!clicked) {
    clicked = true;
    likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
    count.textContent++;
    storeLike()
  } else {
    clicked = false;
    likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
    count.textContent--;
    deleteLike()
  }
});
let deleteIndex = ""
function storeLike(){
  const response = fetch(`https://nestor-portifolio-api.herokuapp.com/api/like/${index}`, {
    method: "POST",
    body: JSON.stringify({ "likeType": 1 }),
    headers: { 'Content-Type': 'application/json',"Authorization":`Bearer ${token}`  },
  });
  
}
const deleteLike = async ()=>{
  const allLikes = await fetch(`https://nestor-portifolio-api.herokuapp.com/api/like/`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json',"Authorization":`Bearer ${token}`  },
  });
  const getlike = await allLikes.json()
  const likeId = ()=>{
    for(let i in getlike){
    if(getlike[i].articleId==index)
    return getlike[i]._id}
  }
  console.log(likeId())
  const response = fetch(`https://nestor-portifolio-api.herokuapp.com/api/like/${likeId()}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json',"Authorization":`Bearer ${token}`  },
  });
  console.log(response)
}



function checkComment(form) {
  const inputMessage = form["message"];

  if (!inputMessage.value.trim()) {
    getErrorMessage(inputMessage, "Put Message");
    return false;
  } else {
    getSuccessMessage(inputMessage, "Very good");
    storeComment(inputMessage.value.trim());
    return true;
  }
}

const storeComment = async (message) => {
  const response = fetch(`https://nestor-portifolio-api.herokuapp.com/api/comment/${index}`, {
    method: "POST",
    body: JSON.stringify({ "comment": message }),
    headers: { 'Content-Type': 'application/json',"Authorization":`Bearer ${token}`  },
  });
  console.log(response)
}

