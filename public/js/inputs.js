
var ids = new Array(1);


fetch('/prueba').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById("user").innerHTML = data.error;
            return console.log(data.error)
        } else{
            const last = data.length-1
            document.getElementById("name").innerHTML=data[last].name
            document.getElementById("rfc").innerHTML=data[last].rfc
        }

    })
        
    })

    async function apiGet(){
        try{
            const resp = await fetch('/prueba')
            const data = await resp.json()
            return data
        } catch(error){
            console.log(error)
        }
    }

    let x = -1;
function addPrueba(){
    x++;
    fetch('/bancos').then((response)=>{
        response.json().then((data)=>{
            var opciones="<form><select name='tipo-banco"+x+"' class='tipo' id='tipo-banco"+x+"'>"
            for(var j in data){
                var opcion="<option value="+data[j].name+">"+data[j].name+"</option>"
            opciones+=opcion
            }
            console.log(opciones)
            opciones+="</select></form>"
            var aqui = $("#add-bank-form")
            var bank= $(opciones)
            aqui.append(bank)
        })
    })
}

addPrueba()



    function banksArray(){
       var banks=[]
        console.log('k')
        var j =0;
        while(j<=x){console.log($("#tipo-banco"+j).val());
        let data =  $('#tipo-banco'+j).val()
        banks=banks.concat([{"banco":data}])
        j++;}
        return banks
    }

    

function agregar(){
    let sp = document.getElementById("s-points").value
    let tb = document.getElementById("tasabase").value
    let banks = banksArray()

    console.log(JSON.stringify(banks))


    apiGet().then((response)=>{
        fetch('/prueba/'+response[response.length-1]._id, {
                    method: "PATCH",
                    headers: {          
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'accept-encoding': 'gzip, deflate'
                      },
                      body: JSON.stringify({
                    "tasabase": tb,
                   "spreadpoints": sp,
                   "bancos": banks
                    })
                }).then(()=>{
                   
                        window.location.href = '/clientes';
                    
                }).catch((error)=>{
                    console.log('Hubo un problema con la petición Fetch:' + error);
                  })
    })
}
        
