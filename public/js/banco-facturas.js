
let rfcs = []
let numeros =[]
let folioFs=[]
let fechas =[]
let fechasVen = []
let monedas =[]
let aforos=[]
let status=[]
 

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
 
  var curday = function(sp, dDG){
     today = new Date();
     var dd = today.getDate()+dDG;
     var mm = today.getMonth()+1; //As January is 0.
     var yyyy = today.getFullYear();
     
     if(dd<10) dd='0'+dd;
     if(mm<10) mm='0'+mm;
     return (mm+sp+dd+sp+yyyy);
     };
     console.log(curday('/',0));
  
     let monthsDays=[]
     monthsDays[1]=31
     monthsDays[2]=28
     monthsDays[3]=31
     monthsDays[4]=30
     monthsDays[5]=31
     monthsDays[6]=30
     monthsDays[7]=31
     monthsDays[8]=31
     monthsDays[9]=30
     monthsDays[10]=31
     monthsDays[11]=30
     monthsDays[12]=31
 
 
     function matDate(day, month, gracia){
         if(day+gracia>monthsDays[month]){
           day=(day+gracia)-monthsDays[month]
           month++;
           var arr=[day, month]
           return arr
         } else{
           day=day+gracia
            var arr=[day, month]
           return arr
         }
       }
 
       // console.log(date[0], date[1])
       
       function discPeriod(dueday, duemonth, day, month){
         var num=0;
         if(duemonth==month){
           while(day<dueday){
           num++;
           day++;
         }
 
         return num
         }else{
           day=monthsDays[month]-day
           month++;
           while(month<duemonth){
             day+=monthsDays[month]
                 month++;
           }
           day+=dueday
           return day
         }
     }


     function roundNum(num){
        let newNum = Math.round(num * 100) / 100
         return newNum
       }
       function roundLibor(num){
         let newNum = Math.round(num * 100000) / 100000
          return newNum
        }
        function formatNumber(num) {
         return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
       }
     
fetch('/facturasDescontadas').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById("error").innerHTML = data.error;
            return console.log(data.error)
        } else if(data.length>0){
               document.getElementById("result").style.visibility="hidden";
               document.getElementById("result").style.display="none";

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
 
                var table = $('#facturas-descontadas');
                var row, cell;
                var titles = $('<th></th><th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Moneda</th><th>Trade Date</th><th>Aforo</th>'
                +'<th>Dias de Gracia</th><th>Monto Neto de la Factura</th><th>Discount Period</th>><th>Purchase Price</th>');
                table.append(titles)
             for(var i=0; i<rfcs.length; i++){
                 
             row = $('<tr />' );
             table.append( row );
             cell = $('<td class="checkbox-td"><form><input type="checkbox" id="cb-'+i+'" value="'+numeros[i]+'"></form></td><td>'+data[i].name+'</td><td class="idnums">'+rfcs[i]+'</td><td>'+numeros[i]+'</td><td>'+folioFs[i]+'</td><td>'+formatDate(fechas[i])+'</td><td>'+monedas[i]+'</td><td style="background-color:lightgreen">'+formatDate(data[i].purchaseDate)+'</td><td style="background-color:lightgreen">'+data[i].aforoP+'</td><td style="background-color:lightgreen">'+data[i].bufferDays+
             '</td><td style="background-color:lightgreen"> $'+formatNumber(data[i].advanceRate)+'</td><td style="background-color:lightgreen">'+data[i].discountPeriod+'</td><td style="background-color:lightgreen"> $'+formatNumber(data[i].purchasePrice)+'</td>')
             row.append( cell );
            }

        }
       
    })
 })
 fetch('/facturasVendidas').then((response)=>{
  response.json().then((data)=>{
      if(data.error){
         
          return console.log(data.error)
      } else if(data.length>0){
        document.getElementById("result2").style.visibility="hidden";
        document.getElementById("result2").style.display="none";

              var table = $('#facturas-vendidas');
              var row, cell;
              var titles = $('<th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
              table.append(titles)
           for(var i=0; i<data.length; i++){
           row = $('<tr />' );
           table.append( row );
           cell = $('<td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+
           '</td><td>'+data[i].invoiceDate+'</td><td>'+data[i].dueDate+'</td><td>'+data[i].moneda+'</td><td>'+data[i].aforo+'</td><td>'+data[i].status+'</td>')
           row.append( cell );
          }

          // document.getElementById("user").innerHTML = JSON.stringify(data);
      }
     
  })
})

async function apiGet(){
  try{
    const res = await fetch('/facturasDescontadas')
    const data = res.json()
    return data
  } catch(e){
    console.log(e)
  }
}

 async function venderFacturas(){
   try{
    const result = await apiGet()
    for(var i in result){
     if(document.getElementById("cb-"+i).checked==true){ 
       const num = document.getElementById("cb-"+i).value
       const facturaJSON = await fetch('/searchF/'+num)
       const factura = await facturaJSON.json()
      fetch('/facturas/'+factura[0]._id,{
        method: "PATCH",
        headers: {          
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'accept-encoding': 'gzip, deflate'
        },
        body: JSON.stringify({
          "status":"Vendida"
        }),
        json:true
      })
      const facturaDesJSON = await fetch('/searchFd/'+num)
      const facturaDes = await facturaDesJSON.json()
      await fetch('/facturasDescontadas/'+facturaDes[0]._id, {
        method: "DELETE"
      }) 
     
    }
    
    }
    document.location.reload(true)
   } catch(e){
     console.log(e)
   }


 }