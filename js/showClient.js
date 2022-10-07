let clientContainer = document.getElementById("client-container");
     clientContainer.classList.add('table-responsive')
let clientNumber=document.getElementById('client-number');
let element = createElement("div");

let result = "Chargement des données est en cours ...";

let optionElement = createElement('img')
optionElement.style = "width:30px;height:30px;";
optionElement.setAttribute('id', 'boot-icon');

let dataContainerElement=createDataContainerElement('table');

    clientContainer.appendChild(element);

    element.innerHTML = result;
let getClients = async (url) => {
   try {
      let response = await fetch(url);
      let data = await response.json();
      console.log(data)
      if (response.ok === true) {

         clientNumber.innerHTML=data.length
         if(data!=null){
         result=''
         let dataContainer=createDataContainerElement('table')
         let tbody=createElement('tbody');
         data.forEach(element => {
            let tr=createElement('tr');
              for(let property in element){
               let td=createElement('td');
                   td.innerHTML=element[property];
                   tr.appendChild(td);
              }
            

           tbody.appendChild(tr);     
         });
         element.innerHTML = result;
         dataContainer.appendChild(tbody);
         element.appendChild ( dataContainer );
      }else{
         result='Aucun client trouvé'
         element.innerHTML = result;
      }
      } else {

         console.log("No data found")
         window.location.replace("http://127.0.0.1:5500/errorPage/errorServer.html");
      }
   } catch (error) {
      console.log("Server error")
      window.location.replace("http://127.0.0.1:5500/errorPage/errorServer.html");
   }

}
setInterval(function(){
   console.log(result)
},3000)

function createElement(element) {return document.createElement(element)}

function createDataContainerElement (element) {

   let table = createElement(element);
       table.classList.add('table');
       table.classList.add('table-bordered');
   let thead=createElement('thead');
       thead.classList.add("table-light");
    let tr = createElement("tr");
   let idCell = createElement("th");
   idCell.style="vertical-align:middle;"
   let nameCell = createElement("th");
   nameCell.style="vertical-align:middle;"
   let firstNameCell = createElement("th");
   firstNameCell.style="vertical-align:middle;"
   let birthDateCell = createElement("th");
   birthDateCell.style="vertical-align:middle;"
   let numberPassportCell = createElement("th");
   numberPassportCell.style="vertical-align:middle;"
   let issueDateCell = createElement("th");
   issueDateCell.style="vertical-align:middle;"
   let expiryDateCell = createElement("th");
   expiryDateCell.style="vertical-align:middle;"
   let placeCell = createElement("th");
   placeCell.style="vertical-align:middle;"
   let emailCell = createElement("th");
   emailCell.style="vertical-align:middle;"
   let passwordCell = createElement('th');
   passwordCell.style="vertical-align:middle;"
 
   idCell.innerText = "Id";
   nameCell.innerText = "Nom";
   firstNameCell.innerHTML="Prénom"
   birthDateCell.innerHTML="Date de naissance"
   numberPassportCell.innerHTML="Numéro de passeport"
   issueDateCell.innerHTML="Date d'émission"
   expiryDateCell.innerHTML="Date d'expiration"
   emailCell.innerText = "Gmail";
   passwordCell.innerText = "Mot de passe";
   placeCell.innerText = "Lieu";
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
   thead.appendChild(tr);
   table.appendChild(thead);
   return table;

}

getClients("https://blshelper.herokuapp.com/api/helper/clients/loadAll");