import { getSuccessMessage, getErrorMessage } from "./main.js";

const commentForm = document.getElementById("form-contact");
const url = window.location.href;
const index = parseInt(url.split("=")[1]);
const articles = JSON.parse(localStorage.articles);
const article = articles[index];
const userId = parseInt(localStorage.active);
const users = JSON.parse(localStorage.users);
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkComment(commentForm);
});
const articleDetail = document.querySelector(".article-detail1");
const mainImage = document.createElement("img");
mainImage.src = article.picture;
mainImage.className = "article-img-main";
const title = document.createElement("h3");
title.innerText = article.title;
const body = document.createElement("p")
body.innerText = article.article;
articleDetail.appendChild(mainImage);
articleDetail.appendChild(title);
articleDetail.appendChild(body);


const likeBtn = document.querySelector(".like__btn");
let likeIcon = document.querySelector("#icon"),
  count = document.querySelector("#count");

let clicked = false;

likeBtn.addEventListener("click", () => {
  if (!clicked) {
    clicked = true;
    likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
    count.textContent++;
  } else {
    clicked = false;
    likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
    count.textContent--;
  }
});

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
function getUser() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == userId) {
      return users[i];
    }
  }
}
const nameCommentor = getUser().firstname + " "+getUser().secondname;
function storeComment(message) {
  const comment = {
    time:new Date().toLocaleString(),
    name: nameCommentor,
    email: getUser().email,
    message: message,
  };

  article.comments.push(comment);
  articles[index] = article;
  localStorage.articles = JSON.stringify(articles);
  console.log(articles[0].comments);
}
const comments = articles[0].comments;
const allComment = document.querySelector(".others-comment");
const head1 = document.createElement("h2");
const commentaire = document.createElement("p");
head1.innerText = "What others are saying about this article";
allComment.appendChild(head1);
for(let i=0;i<comments.length;i++){
const commentSection = document.createElement("div");
commentSection.className = "comment-1"
const commentor = document.createElement("h4");
const date = document.createElement("span");
date.className = "date"
commentaire.innerText = comments[i].message;
commentor.innerText =comments[i].name;
date.innerText = comments[i].time;
commentSection.appendChild(commentor);
commentSection.appendChild(date);
commentSection.appendChild(commentaire);
allComment.appendChild(commentSection);
}
