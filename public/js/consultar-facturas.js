
let rfcs = []
let numeros =[]
let folioFs=[]
let fechas =[]
let fechasVen = []
let monedas =[]
let aforos=[]

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
               } 

               var table = $('#tabla-facturas');
               var row, cell;
               var titles = $('<th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th>Aforo</th>');
               table.append(titles)
            for(var i=0; i<rfcs.length; i++){
            row = $('<tr />' );
            table.append( row );
            cell = $('<td class="idnums">'+rfcs[i]+'</td><td>'+numeros[i]+'</td><td>'+folioFs[i]+'</td><td>'+fechas[i]+'</td><td>'+fechasVen[i]+'</td><td>'+monedas[i]+'</td><td>'+aforos[i]+'</td>')
            row.append( cell );
           }

           // document.getElementById("user").innerHTML = JSON.stringify(data);
       }
      
   })
})