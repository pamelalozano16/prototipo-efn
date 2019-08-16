//FORMAT FUNCTIONS
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  function roundNum(num){
    let newNum = Math.round(num * 100) / 100
     return newNum
   }
 
   var curday = function(sp, dDG){
    today = new Date();
    var dd = today.getDate()+dDG;
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (mm+sp+dd+sp+yyyy);
    };
   function formatDate(date) {
    date=new Date(date)
   var monthNames = [
     "Jan", "Feb", "Mar",
     "Apr", "May", "Jun", "Jul",
     "Aug", "Sep", "Oct",
     "Nov", "Dec"
   ];
 
   var day = date.getDate();
   var monthIndex = date.getMonth();
   var year = date.getFullYear();
 
   return monthNames[monthIndex] + '/' + day + '/' + year;
 }
//END


x=-1
function namesPOptions(){
    x++;
    fetch('/prueba').then((response)=>{
        response.json().then((data)=>{
            var opciones="<form><select name='nombresP' class='tipo' id='nombresP'><option value="+"></option>"
            for(var j in data){
                var opcion="<option value="+data[j].rfc+">"+data[j].name+"</option>"
            opciones+=opcion
            }
            console.log(opciones)
            opciones+="</select></form>"
            var aqui = $("#namesP-form")
            var bank= $(opciones)
            aqui.append(bank)
        })
    })
}

namesPOptions()

async function verConfirming(){
    const datajson = await fetch('/searchGMd')
    const data = await datajson.json()
    const table = $("#confirming-table");
    var row, cell;
    var titles = $('<th></th><th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Monto neto aforado</th><th>Dias de Gracia</th><th>Descuento</th><th>Plazo</th><th>Fecha final de vencimiento</th><th>IVA</th><th>Libor</th><th>Fecha de operación</th><th>Monto a recibir</th><th>Porcentaje total</th><th>Status</th>');
    table.append(titles)
      console.log(data)
    for(var i in data){
        if(data[i].status=="Confirming"){
            console.log("true")
            row = $('<tr />' );
            table.append( row );
            cell = $('<td class="checkbox-td"><form><input type="checkbox" id="cb-'+i+'" value="'+data[i].numero+'"></form></td><td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+
            '</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td>'+
            '<td style="background-color:lightgreen">'+formatNumber(data[i].advanceRate)+'</td><td style="background-color:lightgreen">'+data[i].bufferDays+'</td><td style="background-color:lightgreen">$'+formatNumber(data[i].discountMargin)+'</td><td style="background-color:lightgreen">'+data[i].discountPeriod+'</td><td style="background-color:lightgreen">'+formatDate(data[i].matuDate)+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].iva)+'</td>'+
            '<td style="background-color:lightgreen">'+data[i].libor+'</td><td style="background-color:lightgreen">'+formatDate(data[i].purchaseDate)+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].purchasePrice)+'</td><td style="background-color:lightgreen">'+data[i].porcentajeTotal+'%</td><td>'+data[i].status+'</td>')
            row.append( cell );
        }
    }
}

verConfirming()

async function confirming(){
    const descjson = await fetch('/searchGMd')
    const desc = await descjson.json()
    var array=[];
    for(var i in desc){
        if(document.getElementById("cb-"+i)!=null&&document.getElementById("cb-"+i).checked){
            array.push(document.getElementById("cb-"+i).value)
        }
    }
    console.log(array)

    for(var i in array){
     const datajson= await fetch('/searchFd/'+array[i])
     const data = await datajson.json()

    await fetch('/facturasDescontadas/'+data[0]._id, {
        method:'PATCH',
        headers:{'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accept-encoding': 'gzip, deflate'},
        body: JSON.stringify({
            "status":"En proceso"
        }),
        json:true
    })

    await fetch('/notifs', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accept-encoding': 'gzip, deflate'},
        body:JSON.stringify({
          title: "El comprador confirmó la factura #"+data[0].numero,
          description: "Comprador: "+data[0].name,
          date:curday('/',0),
          status: "Pendiente",
          type:"Np"
        })
      })

    }
    document.location.reload(true)   
}

async function verVendidas(){
    const datajson = await fetch('/searchGM')
    const data = await datajson.json()
    const table = $("#vendidas-table");
    var row, cell;
    var titles = $('<th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Monto neto aforado</th><th>Dias de Gracia</th><th>Descuento</th><th>Plazo</th><th>Fecha final de vencimiento</th><th>IVA</th><th>Libor</th><th>Fecha de operación</th><th>Monto a recibir</th><th>Porcentaje total</th><th>Status</th>');
    table.append(titles)
      console.log(data)
    for(var i in data){
        if(data[i].status=="Vendida"){
            console.log("true")
            row = $('<tr />' );
            table.append( row );
            cell = $('<td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+
            '</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td>'+
            '<td style="background-color:lightgreen">'+formatNumber(data[i].advanceRate)+'</td><td style="background-color:lightgreen">'+data[i].bufferDays+'</td><td style="background-color:lightgreen">$'+formatNumber(data[i].discountMargin)+'</td><td style="background-color:lightgreen">'+data[i].discountPeriod+'</td><td style="background-color:lightgreen">'+formatDate(data[i].matuDate)+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].iva)+'</td>'+
            '<td style="background-color:lightgreen">'+data[i].libor+'</td><td style="background-color:lightgreen">'+formatDate(data[i].purchaseDate)+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].purchasePrice)+'</td><td style="background-color:lightgreen">'+data[i].porcentajeTotal+'%</td><td>'+data[i].status+'</td>')
            row.append( cell );
        }
    }
}

verVendidas()