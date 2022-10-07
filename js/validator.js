export function validateData(data) {
   let bool=false;
    data.forEach((element) => {
    console.log(element)
        if(element.trim().length==0){
            bool=true
        }
        
    })

     return bool
 
}




