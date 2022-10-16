let username=sessionStorage.getItem("username");
if(username==null){

    window.location.replace(window.location.origin+"/login.html")
    
}else{
    console.log(sessionStorage)
    let usernameContainer=document.getElementById('username');
       usernameContainer.innerText=username;
}

let logout=document.getElementById("logoutpage");

    logout.addEventListener("click",function(){
    sessionStorage.clear()

    });