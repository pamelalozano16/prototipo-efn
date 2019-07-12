function rfc(){
    if(document.getElementById("nombres").value){
        return document.getElementById("nombres").value
    } else if(document.getElementById("rfc").value){
        return document.getElementById("rfc").value
    } else{
        return ""
    }
}

async function buscar(){

const myrfc=rfc()
    if(myrfc!=""){
        console.log(myrfc)
     const dataJson= await fetch('/searchbyRFC/'+myrfc)
        const data = await dataJson.json()
       if(data.length>0){
        document.getElementById("res2").style.display="none";
        document.getElementById("tabla-facturas").style.display="none";
        var table = $('#tabla-busqueda');
        var row, cell;
        var titles = $('<th class="cboxes-title"></th><th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
        table.append(titles)
     for(var i=0; i<data.length; i++){
             row = $('<tr />' );
             table.append( row );
             cell = $('<td class="cboxes"><form><input type="checkbox" id="cbs-'+i+'" value="'+data[i].numero+'" onchange="descontar()"></form></td><td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+data[i].invoiceDate+'</td><td>'+data[i].dueDate+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'+data[i].status+'</td>')
             row.append( cell );
         

    }
        console.log(data)
       } else{
           document.getElementById("tabla-facturas").style.display="none";
           document.getElementById("tabla-busqueda").style.display="none";
           document.getElementById("res2").style.display="block";
       }
    }

if(document.getElementById("fechaVen").value){
    var date=document.getElementById("fechaVen").value
    date=new Date(date)
       const day = date.getDate()+1
       const month = date.getMonth()+1
       const year = date.getFullYear()
    console.log( date.getDate()+1, date.getMonth()+1, date.getFullYear())
   
   
    const facturasJSON = await fetch('/facturas')
    const facturas = await facturasJSON.json()
    var numeros=[]
    for(var i in facturas){
        const searchDate = new Date(facturas[i].dueDate)
       // console.log(searchDate.getDate(), searchDate.getMonth()+1, searchDate.getFullYear())
        if((searchDate.getDate()==day)&&(searchDate.getMonth()+1==month)&&(searchDate.getFullYear()==year))
        {
           numeros.push(facturas[i].numero)
        }
       
    }
    console.log(numeros)
   
    var table = $('#tabla-busqueda');
    var row, cell;
    var titles = $('<th></th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
    table.append(titles)
    for (var i in numeros){
       const dJson= await fetch('/searchF/'+numeros[i])
       const data = await dJson.json()
      if(data.length>0){
       document.getElementById("res2").style.display="none";
       document.getElementById("tabla-facturas").style.display="none";
   
    for(var i=0; i<data.length; i++){
            row = $('<tr />' );
            table.append( row );
            cell = $('<td><form><input type="checkbox" id="cb-'+i+'" value="'+data[i].numero+'" onchange="descontar()"></form></td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+data[i].invoiceDate+'</td><td>'+data[i].dueDate+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'+data[i].status+'</td>')
            row.append( cell );
        
   
   }
    }
    }
}


}

async function buscarVendidas(){
    if(document.getElementById("fechaVen").value){
        var date=document.getElementById("fechaVen").value
        date=new Date(date)
           const day = date.getDate()+1
           const month = date.getMonth()+1
           const year = date.getFullYear()
        console.log( date.getDate()+1, date.getMonth()+1, date.getFullYear())
       
       
        const facturasJSON = await fetch('/facturasVendidas')
        const facturas = await facturasJSON.json()
        var numeros=[]
        for(var i in facturas){
            const searchDate = new Date(facturas[i].dueDate)
           // console.log(searchDate.getDate(), searchDate.getMonth()+1, searchDate.getFullYear())
            if((searchDate.getDate()==day)&&(searchDate.getMonth()+1==month)&&(searchDate.getFullYear()==year))
            {
               numeros.push(facturas[i].numero)
            }
           
        }
        console.log(numeros)
       
        var table = $('#tabla-busqueda');
        var row, cell;
        var titles = $('<th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Advance Rate</th><th>Dias de Gracia</th><th>Discount Margin</th><th>Discount Period</th><th>IVA</th><th>Libor</th><th>Purchase Date</th><th>Purchase Price</th><th>EFN Fee</th><th>Status</th>');
        table.append(titles)
        for (var i in numeros){
           const dJson= await fetch('/searchF/'+numeros[i])
           const data = await dJson.json()
          if(data.length>0){
       
        for(var i=0; i<data.length; i++){
                row = $('<tr />' );
                table.append( row );
                cell = $('<td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+
                '</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td>'+
                '<td style="background-color:lightgreen">'+formatNumber(data[i].advanceRate)+'</td><td style="background-color:lightgreen">'+data[i].bufferDays+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].discountMargin)+'</td><td style="background-color:lightgreen">'+data[i].discountPeriod+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].iva)+'</td>'+
                '<td style="background-color:lightgreen">'+data[i].libor+'</td><td style="background-color:lightgreen">'+formatDate(data[i].purchaseDate)+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].purchasePrice)+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].efnFee)+'</td><td>'+data[i].status+'</td>')
                row.append( cell );
      
            
       
       }
        }
        }
    }

    if(document.getElementById("fechaMaxVen").value){
        var date=document.getElementById("fechaMaxVen").value
        date=new Date(date)
           const day = date.getDate()+1
           const month = date.getMonth()+1
           const year = date.getFullYear()
        console.log( date.getDate()+1, date.getMonth()+1, date.getFullYear())
       
       
        const facturasJSON = await fetch('/facturas')
        const facturas = await facturasJSON.json()
        var numeros=[]
        for(var i in facturas){
            const searchDate = new Date(facturas[i].matuDate)
           // console.log(searchDate.getDate(), searchDate.getMonth()+1, searchDate.getFullYear())
            if((searchDate.getDate()==day)&&(searchDate.getMonth()+1==month)&&(searchDate.getFullYear()==year))
            {
               numeros.push(facturas[i].numero)
            }
           
        }
        console.log(numeros)
       
        var table = $('#tabla-busqueda');
        var row, cell;
        var titles = $('<th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Advance Rate</th><th>Dias de Gracia</th><th>Discount Margin</th><th>Discount Period</th><th>IVA</th><th>Libor</th><th>Purchase Date</th><th>Purchase Price</th><th>EFN Fee</th><th>Status</th>');
        table.append(titles)
        for (var i in numeros){
           const dJson= await fetch('/searchF/'+numeros[i])
           const data = await dJson.json()
          if(data.length>0){

        for(var i=0; i<data.length; i++){
                row = $('<tr />' );
                table.append( row );
                cell = $('<td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+
                '</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td>'+
                '<td style="background-color:lightgreen">'+formatNumber(data[i].advanceRate)+'</td><td style="background-color:lightgreen">'+data[i].bufferDays+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].discountMargin)+'</td><td style="background-color:lightgreen">'+data[i].discountPeriod+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].iva)+'</td>'+
                '<td style="background-color:lightgreen">'+data[i].libor+'</td><td style="background-color:lightgreen">'+formatDate(data[i].purchaseDate)+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].purchasePrice)+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].efnFee)+'</td><td>'+data[i].status+'</td>')
                row.append( cell );
            
       
       }
        }
        }
    } 

    
   
}