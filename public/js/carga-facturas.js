document.getElementById("carga-individual").style.visibility='hidden';
document.getElementById("carga-multiple").style.visibility='hidden';
document.getElementById("carga-multiple").style.display='none';
document.getElementById("carga-individual").style.display='none';


async function apiGet(){
    try{
        const resp = await fetch('/buyers')
        const data = await resp.json()
        return data
    } catch(error){
        console.log(error)
    }
  }
//BUSCAR POR RFC EN BUYERS
function search(){
    let rfc = document.getElementById("rfc-search").value
    console.log(rfc)
    fetch('/search/'+rfc).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            document.getElementById("IDnum").value=data[0].IDnum
            document.getElementById("name").value=data[0].name
            document.getElementById("rfc").value=data[0].age
            document.getElementById("aforoP").value=data[0].aforoP
        })
    })
}

function mostrarIndividual(){
    //STYLE 
    document.getElementById("carga-individual").style.visibility='visible';
    document.getElementById("carga-individual").style.display='block';
    document.getElementById("carga-multiple").style.visibility='hidden';
    document.getElementById("carga-multiple").style.display='none';
    

}
function individual(){
    //FUNCTION
    const name = document.getElementById("name").value
    const rfc = document.getElementById("rfc").value
    const numero = document.getElementById("numero").value
    const folioFiscal =document.getElementById("folioFiscal").value
    const invoiceDate = document.getElementById("invoiceDate").value
    const dueDate = document.getElementById("dueDate").value
    const moneda = document.getElementById("moneda").value
    const aforo = document.getElementById("aforo").value
    const aforoP = document.getElementById("aforoP").value


            fetch('/facturas', {
                method: "POST",
                headers: {          
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'accept-encoding': 'gzip, deflate'
                  },
                body: JSON.stringify({
                    name,
                    rfc,
                    numero,
                    folioFiscal,
                    invoiceDate,
                    dueDate,
                    moneda,
                    aforo,
                    aforoP
                }),
                json: true
                }).catch(function(error) {
                    console.log('Hubo un problema con la petición Fetch:' + error);
                  }).then((response)=>{
                    console.log(response)
                    if(response.ok){
                        window.location.href = '/consultar-facturas';
                    } else{
                        console.log('Error')
                    }
                })

}


function multiple(){
    document.getElementById("carga-multiple").style.visibility='visible';
    document.getElementById("carga-multiple").style.display='block';
    document.getElementById("carga-individual").style.visibility='hidden';
    document.getElementById("carga-individual").style.display='none';
}

function checkedElement(){
    document.getElementById("checkedElement").style.visibility='hidden';
    document.getElementById("checkedElement").style.display="none";
   if (document.getElementById("excel").checked){
       console.log("excel")
       document.getElementById("excelDiv").style.visibility="visible";
       document.getElementById("excelDiv").style.display="block";
   }
   if (document.getElementById("txt").checked){
    console.log("txt")
    document.getElementById("txtDiv").style.visibility="visible";
    document.getElementById("txtDiv").style.display="block";
}
}