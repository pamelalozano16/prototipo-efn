
//FORMAT FUNCTIONS
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  function roundNum(num){
    let newNum = Math.round(num * 100) / 100
     return newNum
   }

//END

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

  function verTabla(){
    fetch('/facturas').then((response)=>{
        response.json().then((data)=>{
            if(data.error){
               
                return console.log(data.error)
            } else {
                   
                    for(var i in data){
                        rfcs= rfcs.concat(data[i].rfc)
                        numeros=numeros.concat(data[i].numero)
                        folioFs=folioFs.concat(data[i].folioFiscal)
                        fechas=fechas.concat(data[i].invoiceDate)
                        fechasVen=fechasVen.concat(data[i].dueDate)
                        monedas=monedas.concat(data[i].moneda)
                        aforos=aforos.concat(roundNum(data[i].aforo))
                        status=status.concat(data[i].status)
                    } 
     
                    var table = $('#tabla-facturas');
                    var row, cell;
                    var titles = $('<th></th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
                    table.append(titles)
                 for(var i=0; i<rfcs.length; i++){
                     if(data[i].status!="Vendida"){
                         row = $('<tr />' );
                         table.append( row );
                         cell = $('<td><form><input type="checkbox" id="cb-'+i+'" value="'+numeros[i]+'" onchange="descontar()"></form></td><td class="idnums">'+rfcs[i]+'</td><td>'+numeros[i]+'</td><td>'+folioFs[i]+'</td><td>'+fechas[i]+'</td><td>'+fechasVen[i]+'</td><td>'+monedas[i]+'</td><td>'+formatNumber(aforos[i])+'</td><td>'+status[i]+'</td>')
                         row.append( cell );
                     }
     
                }
     
                // document.getElementById("user").innerHTML = JSON.stringify(data);
            }
           
        })
     })
     
  }

verTabla()

fetch('/facturasVendidas').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           
            return console.log(data.error)
        } else if(data.length>0){
          document.getElementById("res").style.visibility="hidden";
          document.getElementById("res").style.display="none";
  
                var table = $('#facturas-vendidas');
                var row, cell;
                var titles = $('<th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Advance Rate</th><th>Dias de Gracia</th><th>Discount Margin</th><th>Discount Period</th><th>IVA</th><th>Libor</th><th>Purchase Date</th><th>Purchase Price</th><th>Status</th>');
                table.append(titles)
             for(var i=0; i<data.length; i++){
             row = $('<tr />' );
             table.append( row );
             cell = $('<td>'+data[i].name+'</td><td class="idnums">'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+
             '</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td>'+
             '<td style="background-color:lightgreen">'+formatNumber(data[i].advanceRate)+'</td><td style="background-color:lightgreen">'+data[i].bufferDays+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].discountMargin)+'</td><td style="background-color:lightgreen">'+data[i].discountPeriod+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].iva)+'</td>'+
             '<td style="background-color:lightgreen">'+data[i].libor+'</td><td style="background-color:lightgreen">'+formatDate(data[i].purchaseDate)+'</td><td style="background-color:lightgreen">'+formatNumber(data[i].purchasePrice)+'</td><td>'+data[i].status+'</td>')
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
    // fetch('/facturaTemp', {
    //     method: "DELETE"
    // })
    let checked=[]    
    apiGet().then((response)=>{ 
        for(var i in response){
           if (document.getElementById("cb-"+i)!=null && document.getElementById("cb-"+i).checked==true){
               checked=checked.concat(document.getElementById("cb-"+i).value)
           }
        }
        for(var n in checked){
            fetch('/searchF/'+checked[n]).then((result)=>{
                result.json().then((data)=>{
                    console.log(data)
                    fetch('/facturaTemp', {
                        method: "POST",
                        headers: {          
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'accept-encoding': 'gzip, deflate'
                          },
                        body: JSON.stringify(data[0]),
                        json: true
                        }).then((result)=>{
                            console.log(result)
                        })

                })
            })
        }

       createData()


    })
            
}

let x = -1;
function namesOptions(){
    x++;
    fetch('/buyers').then((response)=>{
        response.json().then((data)=>{
            var opciones="<form><select name='nombres' class='tipo' id='nombres'><option value="+"></option>"
            for(var j in data){
                var opcion="<option value="+data[j].age+">"+data[j].name+"</option>"
            opciones+=opcion
            }
            console.log(opciones)
            opciones+="</select></form>"
            var aqui = $("#names-form")
            var bank= $(opciones)
            aqui.append(bank)
        })
    })
}

namesOptions()
