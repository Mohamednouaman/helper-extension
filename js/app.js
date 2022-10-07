let getDataFromServer=async(url)=>{
  try{
    let response= await fetch(url)
    let data= await response.json()
     if(response.status==200){
        console.log(data)
     }else{
      console.log("Data not found")
     }
    }catch(error){

       console.log(error)

    }

}
//getDataFromServer("http://localhost:8080/api/client/nouaman")
