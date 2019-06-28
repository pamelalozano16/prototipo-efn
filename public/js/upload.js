



  let rfcs = []
  let numeros =[]
  let folioFs=[]
  let fechas =[]
  let fechasVen = []
  let monedas =[]
  let aforos=[]
  let aforosP=[]
  
  fetch('/facturaTemp').then((response)=>{
     response.json().then((data)=>{
         if(data.error){
             document.getElementById("error").innerHTML = data.error;
             return console.log(data.error)
         } else{
                var sumaAforo=0;
                 for(var i in data){
                     rfcs= rfcs.concat(data[i].rfc)
                     numeros=numeros.concat(data[i].numero)
                     folioFs=folioFs.concat(data[i].folioFiscal)
                     fechas=fechas.concat(data[i].invoiceDate)
                     fechasVen=fechasVen.concat(data[i].dueDate)
                     monedas=monedas.concat(data[i].moneda)
                     aforosP=aforosP.concat(data[i].aforoP)
                     aforos=aforos.concat(data[i].aforo)
                     if(data[i].moneda=="usd"){
                        sumaAforo+=(data[i].aforo*20)
                     }
                     else if(data[i].moneda=="mxn"){
                        sumaAforo+=(data[i].aforo)
                     }
                 } 
                 document.getElementById("docs").innerHTML=rfcs.length
                 document.getElementById("total").innerHTML=sumaAforo
                 var table = $('#tabla-facturas');
                 var row, cell;
                 var titles = $('<th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th>Valor de la factura</th><th>Aforo</th>');
                 table.append(titles)
              for(var i=0; i<rfcs.length; i++){
              row = $('<tr />' );
              table.append( row );
              cell = $('<td class="idnums">'+rfcs[i]+'</td><td>'+numeros[i]+'</td><td>'+folioFs[i]+'</td><td>'+fechas[i]+'</td><td>'+fechasVen[i]+'</td><td>'+monedas[i]+'</td><td>'+aforos[i]+'</td><th>'+aforosP+'</th>')
              row.append( cell );
             }
  
             // document.getElementById("user").innerHTML = JSON.stringify(data);
         }
        
     })
  })

  
async function apiGetFacturas(){
    try{
        const resp = await fetch('/facturaTemp')
        const data = await resp.json()
        return data
    } catch(error){
        console.log(error)
    }
  }

  function facturasOk(){
    apiGetFacturas().then((response)=>{
        console.log(response)

for(var i in response){
    const x = JSON.stringify(response[i])
    fetch('/facturas', {
        method: "POST",
        headers: {          
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip, deflate'
          },
        body: x,
        json: true
        }).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error);
          }).then((response)=>{
            console.log(response)
            if(response.ok){

            } else{
                console.log('Error')
            }
        })

} //ENDS CYCLE

window.location.href = '/consultar-facturas';       
})
}