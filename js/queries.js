import { getErrorMessage, getSuccessMessage } from "./main.js";
const token = sessionStorage.token;

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

const queryPopulate = async () => {
  const getQueryResponse = await fetch("https://nestor-portifolio-api.herokuapp.com/api/message",{
    method: "GET",
    headers:{
      "accept":"application/json",
      "Authorization": `Bearer ${token}`
    }  })
    const queryArray = await getQueryResponse.json();
  const queryContainer = document.querySelector(".queries");

  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let heading_1 = document.createElement("th");
  heading_1.innerHTML = "No";
  let heading_2 = document.createElement("th");
  heading_2.innerHTML = "Name";
  let heading_3 = document.createElement("th");
  heading_3.innerHTML = "Email";
  let heading_4 = document.createElement("th");
  heading_4.innerHTML = "Message";
  let heading_5 = document.createElement("th");
  heading_5.innerHTML = "";
  let row_1 = document.createElement("tr");
  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  row_1.appendChild(heading_5);

  thead.appendChild(row_1);
  table.appendChild(thead);
  table.appendChild(tbody);
  queryContainer.appendChild(table);
  for (let i = 0; i < queryArray.length; i++) {
    // Adding the entire table to the body tag

    // Creating and adding data to second row of the table
    let row_2 = document.createElement("tr");
    let data_1 = document.createElement("td");
    data_1.innerHTML = i+1;
    let data_2 = document.createElement("td");
    data_2.innerHTML =queryArray[i].name;
    let data_3 = document.createElement("td");
    data_3.innerHTML = queryArray[i].email;
    let data_4 = document.createElement("td");
    data_4.innerHTML = queryArray[i].message;
    let deleteLink = document.createElement("a");
    let replyLink = document.createElement("a");
    let buttonSection = document.createElement("div");
    buttonSection.className = "queryButton";

    let deleteButton = document.createElement("button");
    let replyButton = document.createElement("button");
    deleteLink.appendChild(deleteButton);
    replyLink.appendChild(replyButton);
    buttonSection.appendChild(deleteLink)
    buttonSection.appendChild(replyLink)
    replyButton.innerText = "Reply the Query";
    deleteButton.innerText ="Delete";
    deleteButton.className = "article-delete"
    replyButton.className = "article-update"
    deleteLink.href = `delete.html?entity=query&index=${queryArray[i]._id}`;

    replyLink.onclick = ()=>{window.open(`mailto:${queryArray[i].email}`)};

    

    row_2.appendChild(data_1);
    
    row_2.appendChild(data_2);
    row_2.appendChild(data_3);
    row_2.appendChild(data_4);
    row_2.appendChild(buttonSection);
    
    tbody.appendChild(row_2);

    // Creating and adding data to third row of the table
  }
}
queryPopulate();

