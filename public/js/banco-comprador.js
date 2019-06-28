


  async function apiGet(){
    try{
        const resp = await fetch('/buyers')
        const data = await resp.json()
        return data
    } catch(error){
        console.log(error)
    }
  }
  
  async function apiGetComprador(){
    try{
        const resp = await fetch('/buyers')
        const data = await resp.json()
        return data
    } catch(error){
        console.log(error)
    }
  }


//   apiGet().then((response)=>{
//     let newID = response[response.length-1].IDnum+1;
//     document.getElementById("IDnum").innerHTML=newID;
//   })

function search(){
    apiGetComprador().then((result)=>{
        for(var i in result){
            if(result[i].age==document.getElementById("searchRFC").value){
                console.log(result[i])
                document.getElementById("nombre").innerHTML=result[i].name
                document.getElementById("days").value=result[i].bufferDays
                document.getElementById("linea").value=result[i].lineaDeCredito

                return result[i]._id
            }
        }
    })
    document.getElementById("days").disabled=true;
document.getElementById("linea").disabled=true;
}

function editbtn(){
    document.getElementById("save-btn").style.visibility="visible";
    document.getElementById("save-btn").style.display="block";
    document.getElementById("days").disabled=false;
    document.getElementById("linea").disabled=false;
}




function savebtn(){
    let linea = document.getElementById("linea").value
    let dias = document.getElementById("days").value
    console.log(linea, dias)
    let id = apiGetComprador().then((result)=>{
        for(var i in result){
            if(result[i].age==document.getElementById("searchRFC").value)
            {
                return result[i]._id
            }
        }
    })
    id.then((res)=>{
        fetch('/buyers/'+res, {
            method: "PATCH",
            headers: {          
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'accept-encoding': 'gzip, deflate'
              },
              body: JSON.stringify({
            "lineaDeCredito": linea,
            "bufferDays": dias
            })
        }).then((res)=>{
                console.log(res)
                document.getElementById("res").innerHTML="GUARDADO"
            
        }).catch((error)=>{
            console.log('Hubo un problema con la petición Fetch:' + error);
          })
    })
}