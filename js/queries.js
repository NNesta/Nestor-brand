import { getErrorMessage, getSuccessMessage } from "./main.js";

userPopulate();
function userPopulate() {
  const queryArray = JSON.parse(localStorage.queries);
  const articleContainer = document.querySelector(".queries");

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
  let row_1 = document.createElement("tr");
  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);

  thead.appendChild(row_1);
  table.appendChild(thead);
  table.appendChild(tbody);
  articleContainer.appendChild(table);
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
    

    row_2.appendChild(data_1);
    
    row_2.appendChild(data_2);
    row_2.appendChild(data_3);
    row_2.appendChild(data_4);
    
    tbody.appendChild(row_2);

    // Creating and adding data to third row of the table
  }
}
