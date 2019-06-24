
async function apiGet(){
    try{
        const resp = await fetch('/buyers')
        const data = await resp.json()
        return data
    } catch(error){
        console.log(error)
    }
  }

function add(){
    const name = document.getElementById("name").value
        const rfc = document.getElementById("rfc").value || 0
        const email = document.getElementById("email").value 

        const tipo= $("#tipo").val()

        if(!name){return document.getElementById("error").innerHTML="Please enter name"}
        // if(!email){return document.getElementById("error").innerHTML="Please enter email"}
    if(tipo=="Comprador"){
        apiGet().then((response)=>{
            let newID = response[response.length-1].IDnum+1;
            console.log(newID)
            fetch('/buyers', {
                method: "POST",
                headers: {          
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'accept-encoding': 'gzip, deflate'
                  },
                body: JSON.stringify({
                    "IDnum": newID,
                    "name": name,
                    "age":rfc,
                    "email": email}),
                json: true
                }).catch(function(error) {
                    console.log('Hubo un problema con la petición Fetch:' + error);
                  }).then((response)=>{
                    console.log(response)
                    if(response.ok){
                        window.location.href = '/p';
                    } else{
                        document.getElementById("error").innerHTML="Error"
                    }
                })

          })

    } else if(tipo=="Banco"){
       fetch('/bancos', {
           method: 'POST',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip, deflate'
           },
           body: JSON.stringify({
            name
           }),
           json: true
       }).catch((e)=>{
           console.log(e)
       }).then((response)=>{
           if(response.ok){
            window.location.href = '/clientes';
           }else{
            document.getElementById("error").innerHTML="Error"
        }
       })
       
    }
else{
    fetch('/prueba', {
        method: "POST",
        headers: {          
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip, deflate'
          },
        body: JSON.stringify({
            "name": name,
            "rfc":rfc,
            "tipo":tipo,
            "email": email}),
        json: true
        }).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error);
          }).then((response)=>{
            console.log(response)
            if(response.ok){
                window.location.href = '/relacion';
            } else{
                document.getElementById("error").innerHTML="Error"
            }
        })
    }
           
                    
    
    
}

    
