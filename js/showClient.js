let clientContainer = document.getElementById("client-container");
clientContainer.classList.add('table-responsive')
let clientNumber = document.getElementById('client-number');
let element = createElement("div");

let result = "Chargement des données est en cours ...";

clientContainer.appendChild(element);

element.innerHTML = result;
let getClients = async (url) => {

   try {
      let response = await fetch(url);
   
      let data = await response.json();
   
      if (response.ok === true) {

         clientNumber.innerHTML = data.length
         if (data.length!=0) {
            result = ''
            let dataContainer = createDataContainerElement('table')
            let tbody = createElement('tbody');
            data.forEach(element => {
               let tr = createElement('tr');


               for (let property in element) {
                  let td = createElement('td');
                  if(property==='id'){
                     
                     td.style = "display:none"
                  }
                  
                  
                  td.innerHTML = element[property];
                  tr.appendChild(td);
               }

               let td=createElement('td');
                   td.innerHTML='<img data-toggle="tooltip" data-placement="top" title="supprimer" src="images/block.png" style="width:30px;height:30px" class="gg-remove" onclick="removeClient(this)"></i>';
                   tr.appendChild(td);
               tbody.appendChild(tr);

            });
            element.innerHTML = result;
            dataContainer.appendChild(tbody);
            element.appendChild(dataContainer);
         } else {
            result = 'Aucun client trouvé !'
            element.innerHTML = result;
         }
      } else {

        window.location.replace("https://mohamednouaman.github.io/helper-extension/404.html");
      }
   } catch (error) {
   
      window.location.replace("https://mohamednouaman.github.io/helper-extension/errorPage/errorServer.html");
   }

}

function createElement(element) { return document.createElement(element) }

function createDataContainerElement(element) {

   let table = createElement(element);
   table.classList.add('table');
   table.classList.add('table-bordered');
   table.style = "border:none;";
   let thead = createElement('thead');
   thead.classList.add("table-light");
   let tr = createElement("tr");

   let idCell = createElement("th");
   idCell.style = "display:none"
   let nameCell = createElement("th");
   nameCell.style = "vertical-align:middle;"
   let firstNameCell = createElement("th");
   firstNameCell.style = "vertical-align:middle;"
   let birthDateCell = createElement("th");
   birthDateCell.style = "vertical-align:middle;"
   let numberPassportCell = createElement("th");
   numberPassportCell.style = "vertical-align:middle;"
   let issueDateCell = createElement("th");
   issueDateCell.style = "vertical-align:middle;"
   let expiryDateCell = createElement("th");
   expiryDateCell.style = "vertical-align:middle;"
   let placeCell = createElement("th");
   placeCell.style = "vertical-align:middle;"
   let emailCell = createElement("th");
   emailCell.style = "vertical-align:middle;"
   let passwordCell = createElement('th');
   passwordCell.style = "vertical-align:middle;"
   let actionsCell = createElement('th');
   passwordCell.style = "vertical-align:middle;"

   idCell.innerText = "Id";
   nameCell.innerText = "Nom";
   firstNameCell.innerText = "Prénom"
   birthDateCell.innerText = "Date de naissance"
   numberPassportCell.innerText = "Numéro de passeport"
   issueDateCell.innerText = "Date d'émission"
   expiryDateCell.innerText = "Date d'expiration"
   emailCell.innerText = "Gmail";
   passwordCell.innerText = "Mot de passe";
   placeCell.innerText = "Lieu";
   actionsCell.innerText = "Actions"

   tr.appendChild(idCell);
   tr.appendChild(nameCell);
   tr.appendChild(firstNameCell);
   tr.appendChild(birthDateCell);
   tr.appendChild(numberPassportCell);
   tr.appendChild(issueDateCell);
   tr.appendChild(expiryDateCell);
   tr.appendChild(placeCell);
   tr.appendChild(emailCell);
   tr.appendChild(passwordCell);
   tr.appendChild(actionsCell)
   thead.appendChild(tr);
   table.appendChild(thead);
   return table;

}

async function removeClient(r){
   let id = r.parentNode.parentNode.firstChild.innerText;
   let url="https://aphelper.herokuapp.com/api/helper/removeClient/"+id
   document.getElementsByTagName("table")[0].deleteRow(id);
    let response=await fetch(url);
   if(response.ok==true){
      alert("Le client a été supprimé avec success");
     }else{
      alert("Something wrong");
   } 
}

getClients("https://aphelper.herokuapp.com/api/helper/clients/loadAll");