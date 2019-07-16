function rfc(){
    if(document.getElementById("nombres").value){
        return document.getElementById("nombres").value
    } else if(document.getElementById("rfc").value){
        return document.getElementById("rfc").value
    } else{
        return ""
    }
}
document.getElementById("download-btn").style.display="none";
document.getElementById("resumen").style.display="none";
document.getElementById("resumenV").style.display="none";
document.getElementById("resumenDM").style.display="none";

async function buscar(){
    var resumenNum =0;
    var resumenValor =0;

    var Parent = document.getElementById("tabla-busqueda");
    while(Parent.hasChildNodes())
    {
       Parent.removeChild(Parent.firstChild);
    }


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
        var titles = $('<th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
        table.append(titles)
     for(var i=0; i<data.length; i++){
             row = $('<tr />' );
             table.append( row );
             cell = $('<td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'+data[i].status+'</td>')
             row.append( cell );
         resumenValor+=data[i].aforo
        resumenNum++;
    }
        console.log(data)
       } else{
           document.getElementById("tabla-facturas").style.display="none";
           document.getElementById("tabla-busqueda").style.display="none";
           document.getElementById("res2").style.display="block";
       }
       document.getElementById("download-btn").style.display="block";
    }

else if(document.getElementById("fechaVen").value){
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
    var titles = $('<th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
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
            cell = $('<td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'+data[i].status+'</td>')
            row.append( cell );
            resumenNum++;
            resumenValor+=data[i].aforo
   }
    }
    }
    document.getElementById("download-btn").style.display="block";
} else if(document.getElementById("search-status").value){
    const facturasJSON = await fetch('/facturas')
    const facturas = await facturasJSON.json()
    const data = facturas
    var table = $('#tabla-busqueda');
    var row, cell;
    var titles = $('<th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
    table.append(titles)
    for(var i=0; i<facturas.length; i++){
        if(facturas[i].status==document.getElementById("search-status").value){
            row = $('<tr />' );
            table.append( row );
            cell = $('<td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'+data[i].status+'</td>')
            row.append( cell );
            resumenNum++;
            resumenValor+=data[i].aforo;
        }
}
document.getElementById("download-btn").style.display="block";
} else if(document.getElementById("search-moneda").value){

    const facturasJSON = await fetch('/facturas')
    const facturas = await facturasJSON.json()
    const data = facturas
    var table = $('#tabla-busqueda');
    var row, cell;
    var titles = $('<th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
    table.append(titles)
    for(var i=0; i<facturas.length; i++){

        if(facturas[i].moneda==document.getElementById("search-moneda").value){
            row = $('<tr />' );
            table.append( row );
            cell = $('<td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'+data[i].status+'</td>')
            row.append( cell );
            resumenNum++;
            resumenValor+=data[i].aforo;
        }
}
document.getElementById("download-btn").style.display="block";
} else{
    const facturasJSON = await fetch('/facturas')
    const facturas = await facturasJSON.json()
    resumenNum=facturas.length;
    for(var i in facturas){
        resumenValor+=facturas[i].aforo
    }
  verTabla()
  document.getElementById("download-btn").style.display="block";
}
document.getElementById("resumenV").style.display="block";
document.getElementById("resumenValor").innerHTML=formatNumber(roundNum(resumenValor))
document.getElementById("resumen").style.display="block";
document.getElementById("resumenNum").innerHTML=resumenNum
}

async function buscarPublicadas(){

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
             if (data[i].status=="Publicada"){
                row = $('<tr />' );
                table.append( row );
                cell = $('<td class="cboxes"><form><input type="checkbox" id="cbs-'+i+'" value="'+data[i].numero+'" onchange="descontar()"></form></td><td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+data[i].invoiceDate+'</td><td>'+data[i].dueDate+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'+data[i].status+'</td>')
                row.append( cell );
             }
    
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
            if((searchDate.getDate()+1==day)&&(searchDate.getMonth()+1==month)&&(searchDate.getFullYear()==year))
            {
               numeros.push(facturas[i].numero)
            }
           
        }
        console.log(numeros)
       
        var table = $('#tabla-busqueda');
        var row, cell;
        var titles = $('<th></th><th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
        table.append(titles)
        for (var i in numeros){
           const dJson= await fetch('/searchF/'+numeros[i])
           const data = await dJson.json()
          if(data.length>0){
           document.getElementById("res2").style.display="none";
           document.getElementById("tabla-facturas").style.display="none";
       
        for(var i=0; i<data.length; i++){
            if (data[i].status!="Vendida"){
                row = $('<tr />' );
                table.append( row );
                cell = $('<td><form><input type="checkbox" id="cbs-'+i+'" value="'+data[i].numero+'" onchange="descontar()"></form></td><td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+data[i].invoiceDate+'</td><td>'+data[i].dueDate+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'+data[i].status+'</td>')
                row.append( cell );
            }
       
       }
        }
        }
    }
    
    
    }

async function buscarVendidas(){
    document.getElementById("busqueda").style.display="block";
    document.getElementById("tabla-busqueda").style.display="block";
    var resumenNum =0;
    var resumenValor =0;
    var resumenDM =0;

    var Parent = document.getElementById("tabla-busqueda");
    while(Parent.hasChildNodes())
    {
       Parent.removeChild(Parent.firstChild);
    }

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
      
            resumenNum++;
            resumenValor+=data[i].aforo;
            resumenDM+=data[i].discountMargin;
       
       }
        }
        }
    }

else if(document.getElementById("fechaMaxVen").value){
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
                resumenNum++;
                resumenValor+=data[i].aforo;
                resumenDM+=data[i].discountMargin;
       
       }
        }
        }
    } 
else{
    const facturasJSON = await fetch('/facturasVendidas')
    const facturas = await facturasJSON.json()
    resumenNum=facturas.length;
    for(var i in facturas){
        resumenValor+=facturas[i].aforo
        resumenDM+=facturas[i].discountMargin
    }
    verVendidas()
  document.getElementById("download-btn").style.display="block";

}
document.getElementById("download-btn").style.display="block";
document.getElementById("resumenV").style.display="block";
document.getElementById("resumenValor").innerHTML=formatNumber(roundNum(resumenValor))
document.getElementById("resumen").style.display="block";
document.getElementById("resumenNum").innerHTML=resumenNum
document.getElementById("resumenDM").style.display="block";
document.getElementById("resumenDiscountMargin").innerHTML=formatNumber(roundNum(resumenDM))
}