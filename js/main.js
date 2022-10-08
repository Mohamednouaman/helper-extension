
import {validateData} from './validator.js'
let email=document.getElementById('email');
let password=document.getElementById('password');
let firstName=document.getElementById("first_name");

let lastName=document.getElementById("last_name");

let birthDate=document.getElementById("dateOfBirth");

let passportNo=document.getElementById("passport_no");

let issueDate=document.getElementById("pptIssueDate");

let expiryDate=document.getElementById("pptExpiryDate");

let issuePalace=document.getElementById("pptIssuePalace");

let form=document.getElementById("form-id");

let error=document.getElementById("error")

let success=document.getElementById("success")

let btn=document.getElementById("btn");

form.addEventListener('submit',function(e){
  let data=[email.value,password.value,firstName.value,lastName.value,birthDate.value,passportNo.value,issueDate.value,expiryDate.value,issuePalace.value]

   e.preventDefault();
   if(validateData(data)){
    error.style.display="block"
   }else{
    error.style.display="none"
    btn.disabled=true;
    saveDataOnServer("https://blshelper.herokuapp.com/api/helper/addclient")
   }
   

})


let saveDataOnServer= async(url)=>{

    let client ={email:email.value,password:password.value,firstName:firstName.value,lastName:lastName.value,birthDate:birthDate.value
        ,passportNumber:passportNo.value,issueDate:issueDate.value,expiryDate:expiryDate.value,passportPlace:issuePalace.value}
    let clientJSON=JSON.stringify(client)

    console.log(clientJSON)
    
    try {
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'        
          },    
          body:clientJSON
        })
       
        if (response.ok === true) {
          success.style.display="block"
          let inputs = form.querySelectorAll('input')
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = ''

          }
          btn.disabled=false;
          
        setInterval(function(){
            success.style.display="none"
          },2000)
     
    
        } else {
          window.location.replace("https://mohamednouaman.github.io/helper-extension/404.html");
           
         
        }
      } catch (e) {

        
         window.location.replace("https://mohamednouaman.github.io/helper-extension/errorPage/errorServer.html");


      }


}
 

