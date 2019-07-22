


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
                window.location.reload()
            
        }).catch((error)=>{
            console.log('Hubo un problema con la petición Fetch:' + error);
          })
    })
}


let bIDnums=[]
let bnames =[]
let bages= []
let bids=[]
let lineaDC=[]
let diasDG=[]
let aforoP=[]
fetch('/buyers').then((response)=>{
   response.json().then((data)=>{
       if(data.error){
           document.getElementById("user").innerHTML = data.error;
           return console.log(data.error)
       } else{
              
               for(var i in data){
                   bnames = bnames.concat(data[i].name)
                   bages = bages.concat(data[i].age)
                   bIDnums[i]=(data[i].IDnum)
                   bids = bids.concat(data[i]._id)
                   lineaDC=lineaDC.concat(data[i].lineaDeCredito  ||"Pendiente")
                   diasDG=diasDG.concat(data[i].bufferDays  ||"Pendiente")
                   aforoP=aforoP.concat(data[i].aforoP  ||"Pendiente")
               } 

               var table = $('#compradores');
               var row, cell;
               var titles = $('<th>ID</th><th>Names</th><th>RFC</th><th>Días de Gracia</th><th>Línea de Credito (MXN)</th><th>% Aforo</th>');
               table.append(titles)
            for(var i=0; i<bnames.length; i++){
            row = $('<tr />' );
            table.append( row );
            cell = $('<td class="idnums">'+bIDnums[i]+'</td><td>'+bnames[i]+'</td><td>'+bages[i]+'</td><td>'+diasDG[i]+'</td><td>'+lineaDC[i]+'</td><td>'+aforoP[i]+'</td>')
            row.append( cell );
           }

           // document.getElementById("user").innerHTML = JSON.stringify(data);
       }
      
   })
})

async function compradoresPendientes(){
    var lineaDC=[]
    var diasDG=[]
    var aforoP=[]
    const buyersJSON = await fetch('/buyers')
    const buyers = await buyersJSON.json()
    console.log(buyers)
    var table = $('#compradores-pendientes');
    var row, cell;
    var titles = $('<th>ID</th><th>Names</th><th>RFC</th><th>Días de Gracia</th><th>Línea de Credito (MXN)</th><th>% Aforo</th>');
    table.append(titles)
    for (var i in buyers){

        lineaDC=lineaDC.concat(buyers[i].lineaDeCredito  ||"Pendiente")
        diasDG=diasDG.concat(buyers[i].bufferDays  ||"Pendiente")
        aforoP=aforoP.concat(buyers[i].aforoP  ||"Pendiente")
    
        if(buyers[i].bufferDays== undefined||buyers[i].lineaDeCredito==undefined||buyers[i].aforoP==undefined){
          document.getElementById("resultado").style.display="none";
       row = $('<tr />' );
       table.append( row );
       cell = $('<td class="idnums">'+buyers[i].IDnum+'</td><td>'+buyers[i].name+'</td><td>'+buyers[i].age+'</td><td style="background-color:firebrick">'+diasDG[i]+'</td><td style="background-color:firebrick">'+lineaDC[i]+'</td><td style="background-color:firebrick">'+aforoP[i]+'</td>')
       row.append( cell );
      }
        }
    }


compradoresPendientes()