import { getSuccessMessage, getErrorMessage } from "./main.js";
const token = sessionStorage.token;
const commentForm = document.getElementById("form-contact");
const url = window.location.href;
const index = url.split("=")[1];
const commentSect = document.getElementById("comment-sect")
const promptLogin = document.getElementById("prompt-login")
if(!sessionStorage.token){
  commentSect.hidden = true;
  promptLogin.hidden = false;
}else{
  commentSect.hidden = false;
  promptLogin.hidden = true;
}

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

console.log(index);
// const articles = JSON.parse(localStorage.articles);
const getArticle = async () => {
  const articleResponse = await fetch(
    `https://nestor-portifolio-api.herokuapp.com/api/article/${index}`
  );
  const commentsResponse = await fetch(`https://nestor-portifolio-api.herokuapp.com/api/comment/${index}`);
  const articleData = await articleResponse.json();
  const articleComments = await commentsResponse.json();

  console.log(articleData);
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
  
  console.log(articleComments)
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
  }
};

getArticle();
// const article = articles[index];
commentForm.addEventListener("submit", (e) => {
  if (!checkComment(commentForm)) {
    e.preventDefault();
  }
});

const likeBtn = document.querySelector(".like__btn");
let likeIcon = document.querySelector("#icon");

let click = async () => {
  const likeResponse = await fetch(
    `https://nestor-portifolio-api.herokuapp.com/api/like/${index}/${sessionStorage.userId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );
  const likesResponses = await fetch(
    `https://nestor-portifolio-api.herokuapp.com/api/like/${index}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );
  const like = await likeResponse.json();
  const allLikes = await likesResponses.json();
  const numberOfLikes = allLikes.length;

  count.textContent = numberOfLikes;
  if (!like.liked) {
    likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
    
  } else {
    likeIcon.innerHTML = `<i class="fas fa-thumbs-down"></i>`
  }
if(sessionStorage.token){
  likeBtn.addEventListener("click", () => {
    if (!like.liked) {
      likeIcon.innerHTML = `<i class="fas fa-thumbs-down"></i>`;
      storeLike();
      like.liked = true;
    } else {
      likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
      deleteLike();
      like.liked = false;
    }
  });}

};
click();


const storeLike = async () =>{
  const response = await fetch(`https://nestor-portifolio-api.herokuapp.com/api/like/${index}`, {
    method: "POST",
    body: JSON.stringify({ likeType: 1 }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
const deleteLike = async() =>{
  const response = await fetch(
    `https://nestor-portifolio-api.herokuapp.com/api/like/${index}/${sessionStorage.userId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(response);
};

function checkComment(form) {
  const inputMessage = form["message"];

  if (!inputMessage.value.trim()) {
    getErrorMessage(inputMessage, "Put Message");
    return false;
  } else {
    getSuccessMessage(inputMessage, "");
    storeComment(inputMessage.value.trim());
    return true;
  }
}

const storeComment = async (message) => {
  const response = fetch(`https://nestor-portifolio-api.herokuapp.com/api/comment/${index}`, {
    method: "POST",
    body: JSON.stringify({ comment: message }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
};
