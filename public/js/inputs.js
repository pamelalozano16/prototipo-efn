
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
    


    let i =0;
    function addbank(){
        i++;
        var opciones = "<form><select name='tipo-banco"+i+"' class='tipo' id='tipo-banco"+i+"'><option value='Sabadell'>Sabadell</option><option value='Hitachi'>Hitachi</option></select></form>"
        var aqui = $("#add-bank-form")
        var bank= $(opciones)
        aqui.append(bank)

    }

    function banksArray(){
       var banks=[]
        console.log('k')
        var j =0;
        while(j<=i){console.log($("#tipo-banco"+j).val());
        let data =  $('#tipo-banco'+j).val()
        banks=banks.concat([{"banco":data}])
        j++;}
        return banks
    }

    

function agregar(){
    let sp = document.getElementById("s-points").value
    let tb = document.getElementById("tasabase").value
    let banks = banksArray()
    console.log('yes!')
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
        

    // function agregar(){
    //     let id = getId()
    //     console.log(id)
    //     fetch('/prueba/'+id, {
    //         method: "PATCH",
    //         headers: {          
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'accept-encoding': 'gzip, deflate'
    //           },
    //           body: JSON.stringify({
    //             "tasabase": document.getElementById("tasabase").value,
    //             "spreadpoints": document.getElementById("s-points").value,
    //         })
    //     }).catch(function(error) {
    //         console.log('Hubo un problema con la petición Fetch:' + error);
    //       }).then((response)=>{
    //         console.log(response)
    //         if(response.ok){
    //         //   document.location.reload(true)
    //         } else{
    //             document.getElementById("error").innerHTML="Error"
    //         }
    //     })

    //     var j =0;
    //     while(j<=i){console.log($("#tipo-banco"+j).val()); j++;}
    // }
    
 

    // fetch('/prueba/'+ids[num], {
//         method: "PATCH",
//         headers: {          
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'accept-encoding': 'gzip, deflate'
//           },
//           body: JSON.stringify({
//             "name": document.getElementById("name").value,
//             "rfc": document.getElementById("rfc").value,
//             "email": document.getElementById("email").value
//         })
//     }).catch(function(error) {
//         console.log('Hubo un problema con la petición Fetch:' + error);
//       }).then((response)=>{
//         console.log(response)
//         if(response.ok){
//           document.location.reload(true)
//         } else{
//             document.getElementById("error").innerHTML="Error"
//         }
//     })
   
// }