import { getErrorMessage, getSuccessMessage } from "./main.js";

userPopulate();
function userPopulate() {
  const userArray = JSON.parse(localStorage.users);
  const articleContainer = document.querySelector(".users");
  let articlesArray = JSON.parse(localStorage.users);
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let heading_1 = document.createElement("th");
  heading_1.innerHTML = "First name";
  let heading_2 = document.createElement("th");
  heading_2.innerHTML = "second Name";
  let heading_3 = document.createElement("th");
  heading_3.innerHTML = "Email";
  let heading_4 = document.createElement("th");
  heading_4.innerHTML = "Password";
  let heading_5 = document.createElement("th");
  heading_5.innerHTML = "Longitude";
  let heading_6 = document.createElement("th");
  heading_6.innerHTML = "Latitude";
  let heading_7 = document.createElement("th");
  heading_7.innerHTML = "Action";
  let row_1 = document.createElement("tr");

  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  row_1.appendChild(heading_5);
  row_1.appendChild(heading_6);
  row_1.appendChild(heading_7);

  thead.appendChild(row_1);
  table.appendChild(thead);
  table.appendChild(tbody);
  articleContainer.appendChild(table);
  for (let i = 0; i < userArray.length; i++) {
    // Adding the entire table to the body tag

    // Creating and adding data to second row of the table
    let row_2 = document.createElement("tr");
    let data_1 = document.createElement("td");
    data_1.innerHTML = userArray[i].firstname;
    let data_2 = document.createElement("td");
    data_2.innerHTML = userArray[i].secondname;
    let data_3 = document.createElement("td");
    data_3.innerHTML = userArray[i].email;
    let data_4 = document.createElement("td");
    data_4.innerHTML = userArray[i].password;
    let data_5 = document.createElement("td");
    data_5.innerHTML = userArray[i].longitude;
    let data_6 = document.createElement("td");
    data_6.innerHTML = userArray[i].latitude;
    let deleteLink = document.createElement("a");
    let updateLink = document.createElement("a");
    let deleteButton = document.createElement("button");
    let updateButton = document.createElement("button");
    deleteLink.appendChild(deleteButton);
    updateLink.appendChild(updateButton);
    updateButton.innerText = "Update";
    deleteButton.innerText ="Delete";
    deleteButton.className = "article-delete"
    updateButton.className = "article-update"
    deleteLink.href = "delete.html?entity=user&index=" + i;
    updateLink.href = "updateuser.html?index=" + i;
    row_2.appendChild(data_1);
    row_2.appendChild(data_2);
    row_2.appendChild(data_3);
    row_2.appendChild(data_4);
    row_2.appendChild(data_5);
    row_2.appendChild(data_6);
    row_2.appendChild(updateLink);
    row_2.appendChild(deleteLink);
    tbody.appendChild(row_2);

    // Creating and adding data to third row of the table
  }
}
