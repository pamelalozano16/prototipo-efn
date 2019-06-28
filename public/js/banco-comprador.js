


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


function search(){
    document.getElementById("res").innerHTML=""
    apiGetComprador().then((result)=>{
        for(var i in result){
            if(result[i].age==document.getElementById("searchRFC").value){
                console.log(result[i])
                document.getElementById("nombre").innerHTML=result[i].name
                document.getElementById("days").value=result[i].bufferDays
                document.getElementById("linea").value=result[i].lineaDeCredito
                document.getElementById("aforo").value=result[i].aforoP
                return result[i]._id
            }
        }
    })
    document.getElementById("days").disabled=true;
document.getElementById("linea").disabled=true;
document.getElementById("aforo").disabled=true;
}

function editbtn(){
    document.getElementById("save-btn").style.visibility="visible";
    document.getElementById("save-btn").style.display="block";
    document.getElementById("days").disabled=false;
    document.getElementById("linea").disabled=false;
    document.getElementById("aforo").disabled=false;
}




function savebtn(){
    let linea = document.getElementById("linea").value
    let dias = document.getElementById("days").value
    let aforo = document.getElementById("aforo").value
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
            "bufferDays": dias,
            "aforoP":aforo
            })
        }).then((res)=>{
                console.log(res)
                document.getElementById("res").innerHTML="GUARDADO"
            
        }).catch((error)=>{
            console.log('Hubo un problema con la petición Fetch:' + error);
          })
    })
}