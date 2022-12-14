import {validateData} from './validator.js';

let form=document.getElementById("form");

let firstName=document.getElementById("firstName");
let lastName=document.getElementById("lastName");
let email=document.getElementById("email");
let password=document.getElementById("password");
let messageContainer=document.getElementById("error-message");
let btn=document.getElementById("btn")

form.addEventListener('submit',function(e){

let data=[email.value,password.value,firstName.value,lastName.value]

e.preventDefault();

if(validateData(data)){

  messageContainer.style.display="block";
  messageContainer.innerText="All fields are required";
  messageContainer.classList.add("alert-danger");
}else{
  messageContainer.style.display="none";
  btn.disabled=true;
  saveDataOnServer("http://localhost:8080/api/helper/adduser")
}

})



let saveDataOnServer= async(url)=>{

    let client ={email:email.value,password:password.value,firstName:firstName.value,lastName:lastName.value}
    
    let clientJSON=JSON.stringify(client)

    try {
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'        
          },    
          body:clientJSON
        });
        console.log(response);
        if (response.status === 200) {
          
          let inputs = form.querySelectorAll('input')
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = ''

          }
          btn.disabled=false;
          messageContainer.style.display="block";
          messageContainer.innerText="User added susccessfully";
          messageContainer.classList.remove("alert-danger")
          messageContainer.classList.add("alert-success");
        } else if(response.status==400) {
          
          btn.disabled=false;
          messageContainer.style.display="block";
          messageContainer.innerText="User already exists";
          messageContainer.classList.add("alert-danger");
          messageContainer.classList.remove("alert-success")


        }else{

       window.location.replace(window.location.origin+"/helper-extension/404.html");
           
         
        }
      } catch (e) {

        
       window.location.replace(window.location.origin+"/helper-extension/errorPage/errorServer.html");


      }


}