
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
                   bids = ids.concat(data[i]._id)
                   lineaDC=lineaDC.concat(data[i].lineaDeCredito)
                   diasDG=diasDG.concat(data[i].bufferDays)
                   aforoP=aforoP.concat(data[i].aforoP)
               } 

               var table = $('#buyers-table');
               var row, cell;
               var titles = $('<th></th><th></th><th>ID</th><th>Names</th><th>RFC</th><th>Días de Gracia</th><th>Línea de Credito</th><th>% Aforo</th>');
               table.append(titles)
            for(var i=0; i<bnames.length; i++){
            row = $('<tr />' );
            table.append( row );
            cell = $('<td id="delete-td"><button onclick="deletebtn('+i+')" class="btn"><i class="fa fa-trash"></i></button></td><td id="delete-td"><button onclick="editbtn('+i+')" class="editbtn">Editar</button></td><td class="idnums">'+bIDnums[i]+'</td><td>'+bnames[i]+'</td><td>'+bages[i]+'</td><td>'+diasDG[i]+'</td><td>'+lineaDC[i]+'</td><td>'+aforoP[i]+'</td>')
            row.append( cell );
           }

           // document.getElementById("user").innerHTML = JSON.stringify(data);
       }
      
   })
})


let tasabases=[]
let names =[]
let emails=[]
let rfcs= []
let spreadp=[]
let ids=[]

fetch('/prueba').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById("user").innerHTML = data.error;
            return console.log(data.error)
        } else{
               
                for(var i in data){
                    names = names.concat(data[i].name)
                    rfcs = rfcs.concat(data[i].rfc)
                    emails = emails.concat(data[i].email)
                    ids = ids.concat(data[i]._id)
                    tasabases = tasabases.concat(data[i].tasabase)
                    spreadp = spreadp.concat(data[i].spreadpoints)
                } 
 
                var table = $('#suppliers-table');
                var row, cell;
                var titles = $('<th></th><th></th><th>Names</th><th>RFC</th><th>Email</th><th>Tasa Base</th><th>Spread Points</th>');
                table.append(titles)
             for(var i=0; i<names.length; i++){
             row = $('<tr />' );
             table.append( row );
             cell = $('<td id="delete-td"><button onclick="deletebtn('+i+')" class="btn"><i class="fa fa-trash"></i></button></td><td id="delete-td"><button onclick="editbtn('+i+')" class="editbtn">Editar</button></td><td class="idnums">'+names[i]+'</td><td>'+rfcs[i]+'</td><td>'+emails[i]+'</td><td>'+tasabases[i]+'</td><td>'+spreadp[i]+'</td>')
             row.append( cell );
            }
 
            // document.getElementById("user").innerHTML = JSON.stringify(data);
        }
       
    })
 })

 fetch('/bancos').then((response)=>{
     response.json().then((data)=>{
         if(data.error){return console.log(data.error)}
         var table = $('#bancos-table');
         var row, cell;
         var titles=$('<th></th><th></th><th>Nombre del Banco</th>')
         table.append(titles)
         for(var i in data){
            row = $('<tr />' );
            table.append( row );
            cell = $('<td id="delete-td"><button onclick="deletebtn('+i+')" class="btn"><i class="fa fa-trash"></i></button></td><td id="delete-td"><button onclick="editbtn('+i+')" class="editbtn">Editar</button></td><td class="idnums">'+data[i].name+'</td>')
            row.append( cell );
         }
     })
 })

async function apiGet(){
    try{
        const resp = await fetch('/prueba')
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


  function findUser(){
    let sel = $("#sel").val()
    console.log(sel)
      theRFC = document.getElementById("search").value
      console.log(theRFC)

      if(sel=="Comprador"){ 
        apiGetComprador().then((response)=>{
            console.log(response)
            for(var i in response){
                if(response[i].age==theRFC){
                    const dt = response[i]
                    document.getElementById("searchFound").innerHTML="ID: "+dt.IDnum+"<br>Name: "+dt.name+"<br>RFC: "+dt.age
                }
            }
        })
        
      }
else{

    apiGet().then((response)=>{

        for(var n =0;n<5;n++){

            if(response[n].rfc===theRFC){

                const dt=response[n]
                document.getElementById("searchFound").innerHTML="Name: "+dt.name+"<br>RFC: "+dt.rfc+"<br>Email: "+dt.email+'<br>Tasa Base: '+dt.tasabase+'<br> Spread Points: '+dt.spreadpoints+'<br>Banco/s: '
 
                for(var j in dt.bancos ){
                     console.log(dt.bancos[j].banco)
                     $('#searchFound').append(dt.bancos[j].banco);
                     if(j<dt.bancos.length-1){
                         $('#searchFound').append(', ')
                     } 
                    }
               return true
            } 
        }
        document.getElementById("searchFound").innerHTML="Not found. Refresh Page for a new search."
    })

}
  
  }