
 document.getElementById("result").style.visibility="hidden";
 document.getElementById("result").style.display="none";
        
let rfcs = []
let numeros =[]
let folioFs=[]
let fechas =[]
let fechasVen = []
let monedas =[]
let aforos=[]
let status=[]
 
 //DATE FUNCTIONS

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
 //END DATE FUNCTIONS   

async function apiGet(){
    try{
        const resp = await fetch('/facturaTemp')
        const data = await resp.json()
        return data
    } catch(error){
        console.log(error)
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


fetch('/facturaTemp').then((response)=>{
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
 
                var table = $('#tabla-resumen');
                var row, cell;
                var titles = $('<th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>IVA</th><th>Trade Date</th><th>Aforo</th>'
                +'<th>Dias de Gracia</th><th>Monto Neto de la Factura</th><th>Discount Period</th><th>Discount Margin</th><th>Purchase Price</th><th>EFN fee</th>');
                table.append(titles)
             for(var i=0; i<rfcs.length; i++){
             row = $('<tr />' );
             table.append( row );
             cell = $('<td class="idnums">'+rfcs[i]+'</td><td>'+numeros[i]+'</td><td>'+folioFs[i]+'</td><td>'+formatDate(fechas[i])+'</td><td>'+formatDate(fechasVen[i])+'</td><td>'+monedas[i]+'</td><td> $'+formatNumber(aforos[i])+'</td><td> $'+formatNumber(data[i].iva)+'</td><td style="background-color:lightgreen">'+formatDate(data[i].purchaseDate)+'</td><td style="background-color:lightgreen">'+data[i].aforoP+'</td><td style="background-color:lightgreen">'+data[i].bufferDays+
             '</td><td style="background-color:lightgreen"> $'+formatNumber(data[i].advanceRate)+'</td><td style="background-color:lightgreen">'+data[i].discountPeriod+'</td><td style="background-color:lightgreen"> $'+formatNumber(data[i].discountMargin)+'</td><td style="background-color:lightgreen"> $'+formatNumber(data[i].purchasePrice)+'</td><td style="background-color:lightgreen"> $'+formatNumber(data[i].efnFee)+'</td>')
             row.append( cell );
            }

        }
       
    })
 })



 function confirmarDescuento(){
apiGet().then((result)=>{
  for(var i in result){
    fetch('/facturasDescontadas',{
      method: 'POST',
      headers: {          
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accept-encoding': 'gzip, deflate'
      },
      body:JSON.stringify(result[i]),
      json:true
    })
    fetch('/searchF/'+result[i].numero).then((factura)=>{
      factura.json().then((facturaR)=>{
        const id = facturaR[0]._id
        fetch('/facturas/'+id, {
          method: "PATCH",
          headers: {          
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip, deflate'
          },
          body: JSON.stringify({
            "status":"En Proceso"
          })
          
          })
      })

      })
                    }

}).then(()=>{

  document.getElementById("tabla-resumen").style.visibility="hidden";
  document.getElementById("tabla-resumen").style.display="none";
  document.getElementById("confirmar").style.visibility="hidden";
  document.getElementById("confirmar").style.display="none";
  document.getElementById("result").style.visibility="visible";
  document.getElementById("result").style.display="block";
  fetch('/facturaTemp',{
    method: 'DELETE'
  })


})

 }   







  
