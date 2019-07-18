
// function displayError(){
//     document.getElementById("error").style.display="block"
// }


function hideTables(table){
    var Parent = document.getElementById(table);
    while(Parent.hasChildNodes())
    {
       Parent.removeChild(Parent.firstChild);
    }
}

function hideForms(){
    document.getElementById("proveedores").style.display="none"
    document.getElementById("compradores").style.display="none"
    document.getElementById("bancos").style.display="none"
    document.getElementById("searchFound").style.display="none"
    // document.getElementById("error").style.display="none"
}
hideForms()


function verCompradores(){
    
    document.getElementById("compradores").style.display="block"
    hideTables("buyers-table")

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
                        lineaDC=lineaDC.concat(data[i].lineaDeCredito)
                        diasDG=diasDG.concat(data[i].bufferDays)
                        aforoP=aforoP.concat(data[i].aforoP)
                    } 
     
                    var table = $('#buyers-table');
                    var row, cell;
                    var titles = $('<th>ID</th><th>Names</th><th>RFC</th><th>Días de Gracia</th><th>Línea de Credito</th><th>% Aforo</th>');
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
     
}

function verProveedores(){
    hideTables("suppliers-table")
    document.getElementById("proveedores").style.display="block"
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
                    var titles = $('<th>Names</th><th>RFC</th><th>Email</th><th>Tasa Base</th><th>Spread Points</th>');
                    table.append(titles)
                 for(var i=0; i<names.length; i++){
                 row = $('<tr />' );
                 table.append( row );
                 cell = $('<td class="idnums">'+names[i]+'</td><td>'+rfcs[i]+'</td><td>'+emails[i]+'</td><td>'+tasabases[i]+'</td><td>'+spreadp[i]+'</td>')
                 row.append( cell );
                }
     
                // document.getElementById("user").innerHTML = JSON.stringify(data);
            }
           
        })
     })
    
}

function verBancos(){
    hideTables("bancos-table")
    document.getElementById("bancos").style.display="block"
    fetch('/bancos').then((response)=>{
        response.json().then((data)=>{
            if(data.error){return console.log(data.error)}
            var table = $('#bancos-table');
            var row, cell;
            var titles=$('<th>Nombre del Banco</th><th>RFC</th>')
            table.append(titles)
            for(var i in data){
               row = $('<tr />' );
               table.append( row );
               cell = $('<td class="idnums">'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td>')
               row.append( cell );
            }
        })
    })
   
}

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
    hideForms()
    let sel = $("#sel").val()
    console.log(sel)
    if(!document.getElementById("search").value){
        if(sel=="Comprador"){ 
            verCompradores();
            return 0;
        } else if(sel=="Proveedor"){
            verProveedores();
            return 0;
        } else if(sel=="Banco"){
            verBancos();
            return 0;
        } else{
            verProveedores()
            verBancos()
            verCompradores()
            return 0;
        }
    }
      theRFC = document.getElementById("search").value
      console.log(theRFC)

      if(sel=="Comprador"){ 
        apiGetComprador().then((response)=>{
            console.log(response)
            for(var i in response){
                if(response[i].age==theRFC){
                    const dt = response[i]
                    document.getElementById("searchFound").style.display="block"
                    document.getElementById("searchFound").innerHTML="ID: "+dt.IDnum+"<br>Name: "+dt.name+"<br>RFC: "+dt.age
               return 0;
                }
            }
            document.getElementById("searchFound").innerHTML="Not found. Refresh Page for a new search."
        })
        
      }
else if(sel=="Proveedor"){

    apiGet().then((response)=>{

        for(var n =0;n<5;n++){

            if(response[n].rfc===theRFC){

                const dt=response[n]
                document.getElementById("searchFound").style.display="block"
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

} else if(sel=="Banco"){

} 
  
  }