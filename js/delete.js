const url = window.location.href;
const entity = url.split("&")[0].split("=")[1];
const index = url.split("&")[1].split("=")[1];;
const token = sessionStorage.token;

const deleteArticle = async (index)=> {
  
  const response = await fetch(`http://127.0.0.1:3000/api/article/${index}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization":`Bearer ${token}` },
  });
  window.location.href = "dashboard.html";
}

const deleteUser= async (index) => {
  const response = await fetch(`http://127.0.0.1:3000/api/user/${index}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization":`Bearer ${token}` },
  });;
  window.location.href = "user.html";
}

const deleteQuery= async (index) => {
  const response = await fetch(`http://127.0.0.1:3000/api/message/${index}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization":`Bearer ${token}` },
  });
  window.location.href = "queries.html";
}
if(entity == "article"){
deleteArticle(index);
}
if(entity == "user"){
  deleteUser(index)
}
if(entity == "query"){
  deleteQuery(index)
}
