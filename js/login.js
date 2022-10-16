import {validateData} from './validator.js';

let form=document.getElementById("form");
let email=document.getElementById("email");
let password=document.getElementById("password");
let errorContainer=document.getElementById("error-message");
let btn=document.getElementById("btn")
let dataForm=[]
form.addEventListener('submit',function(e){

dataForm=[email.value,password.value]

e.preventDefault();

if(validateData(dataForm)){

  errorContainer.style.display="block";
  errorContainer.innerText="All fields are required";
}else{
  errorContainer.style.display="none";
  btn.disabled=true;
  let url="https://aphelper.herokuapp.com/api/helper/users/"+dataForm[0];
  loadDataFromServer(url)
}

})



let loadDataFromServer= async(url)=>{


    
    try {
         let response = await fetch(url)
         
         if (response.status === 200) {
          let data   =   await response.json()
             let userEmail=data.email;
             let userPassword=data.password;
             console.log(accountVerify(userPassword,userEmail))
             if(accountVerify(userPassword,userEmail)){
               sessionStorage.setItem("username",data.firstName+" "+data.lastName);
               sessionStorage.setItem("user",JSON.stringify(data));
               location.replace(window.location.origin+"/index.html")
             }else{
                btn.disabled=false;
                errorContainer.style.display="block";
                errorContainer.innerText="Incorrect Password";
             }
         } else if(response.status === 400){
          btn.disabled=false;
          errorContainer.style.display="block";
          errorContainer.innerText="This account does't exist";
         } else{
 
            window.location.replace(window.location.origin+"/404.html");
            
         }
 
        } catch (e) {
 
           window.location.replace(window.location.origin+"/errorPage/errorServer.html");
 
          
       } 
 
 
 }

 function accountVerify(password,email){
  return password==dataForm[1] && email==dataForm[0];
}

