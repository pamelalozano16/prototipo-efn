
let rfcs = []
let numeros =[]
let folioFs=[]
let fechas =[]
let fechasVen = []
let monedas =[]
let aforos=[]
let status=[]


async function apiGetProveedores(){
    try{
        const resp = await fetch('/prueba')
        const data = await resp.json()
        return data
    } catch(error){
        console.log(error)
    }
  }

  apiGetProveedores().then((result)=>{
      document.getElementById("spreadPoints").innerHTML=result[0].spreadpoints
  })

fetch('/facturas').then((response)=>{
   response.json().then((data)=>{
       if(data.error){
           document.getElementById("error").innerHTML = data.error;
           return console.log(data.error)
       } else{
              
               for(var i in data){
                   rfcs= rfcs.concat(data[i].rfc)
                   numeros=numeros.concat(data[i].numero)
                   folioFs=folioFs.concat(data[i].folioFiscal)
                   fechas=fechas.concat(data[i].invoiceDate)
                   fechasVen=fechasVen.concat(data[i].dueDate)
                   monedas=monedas.concat(data[i].moneda)
                   aforos=aforos.concat(data[i].aforo)
                   status=status.concat(data[i].status)
               } 

               var table = $('#tabla-facturas');
               var row, cell;
               var titles = $('<th></th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
               table.append(titles)
            for(var i=0; i<rfcs.length; i++){
            row = $('<tr />' );
            table.append( row );
            cell = $('<td><form><input type="checkbox" id="cb-'+i+'" value="'+numeros[i]+'"></form></td><td class="idnums">'+rfcs[i]+'</td><td>'+numeros[i]+'</td><td>'+folioFs[i]+'</td><td>'+fechas[i]+'</td><td>'+fechasVen[i]+'</td><td>'+monedas[i]+'</td><td>'+aforos[i]+'</td><td>'+status[i]+'</td>')
            row.append( cell );
           }

           // document.getElementById("user").innerHTML = JSON.stringify(data);
       }
      
   })
})

async function apiGet(){
    try{
        const resp = await fetch('/facturas')
        const data = await resp.json()
        return data
    } catch(error){
        console.log(error)
    }
  }
  async function apiGetTemp(){
    try{
        const resp = await fetch('/facturaTemp')
        const data = await resp.json()
        return data
    } catch(error){
        console.log(error)
    }
  }
  


function descontar(){
    const libor=document.getElementById("libor").innerHTML
    fetch('/facturaTemp', {
        method: "DELETE"
    })
    let checked=[]    
    apiGet().then((response)=>{ 
        for(var i in response){
           if (document.getElementById("cb-"+i).checked==true){
               checked=checked.concat(document.getElementById("cb-"+i).value)
           }
        }
        for(var n in checked){
            fetch('/searchF/'+checked[n]).then((result)=>{
                result.json().then((data)=>{

                    fetch('/facturaTemp', {
                        method: "POST",
                        headers: {          
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'accept-encoding': 'gzip, deflate'
                          },
                        body: JSON.stringify(data[0]),
                        json: true
                        })

                })
            })
        }



    }).then(()=>{
        // window.location.href = '/descontar-facturas';
    })
            
}