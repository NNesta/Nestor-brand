const url = window.location.href;
const entity = url.split("&")[0].split("=")[1];
const index = url.split("&")[1].split("=")[1];;

if(entity == "article"){
deleteArticle(parseInt(index));}
if(entity == "user"){
  deleteUser(parseInt(index))
}
function deleteArticle(index) {
  let articles = [];
  articles = JSON.parse(localStorage.articles);
  articles.splice(index,1);
  localStorage.setItem("articles",JSON.stringify(articles));
  window.location.href = "dashboard.html";
}

function deleteUser(index) {
  let users = [];
  users = JSON.parse(localStorage.users);
  users.splice(index,1);
  localStorage.setItem("users",JSON.stringify(users));
  window.location.href = "user.html";
}

