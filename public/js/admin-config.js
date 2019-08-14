
function hideTables(){
    var Parent = document.getElementById("result-table");
    while(Parent.hasChildNodes())
    {
       Parent.removeChild(Parent.firstChild);
    }
}

function displayError(){
    document.getElementById("error").style.display="block"
}

function hideForms(){
    document.getElementById("form-proveedor").style.display="none"
    document.getElementById("form-comprador").style.display="none"
    document.getElementById("form-banco").style.display="none"
    document.getElementById("error").style.display="none"
}

async function buscarClientes(){
    hideTables()
    hideForms()
    var tipo = document.getElementById("sel").value
    var rfc = document.getElementById("rfc").value
    var table = $('#result-table');
    var row;
    var dataJson;
    var data;
    var cell;
    var titles;
if(tipo=="proveedor"){
    titles = $('<th></th><th></th><th>Names</th><th>RFC</th><th>Email</th><th>Tasa Base</th><th>Spread Points</th>');
    dataJson = await fetch('/prueba')
    data = await dataJson.json()
    if(rfc){
        dataJson = await fetch('/searchP/'+rfc)
        data = await dataJson.json()
    }
    if(data.length==0){ displayError(); return 0;}
    table.append(titles)
    for(var i in data){
        row = $('<tr />' );
        table.append( row );
        cell = $('<td id="delete-td"><button  id="deletebtn-'+i+'" onclick="deletebtn('+i+')" class="btn" value="'+data[i].rfc+'"><i class="fa fa-trash"></i></button></td><td id="delete-td"><button id="editbtn-'+i+'"onclick="editbtn('+i+') " class="editbtn" value="'+data[i].rfc+'">Editar</button></td><td class="idnums">'+data[i].name+'</td><td>'+data[i].rfc+'</td><td>'+data[i].email+'</td><td>'+data[i].tasabase+'</td><td>'+data[i].spreadpoints+'</td>')
        row.append( cell );
     }
} else if(tipo=="comprador"){
    titles = $('<th></th><th></th><th>ID</th><th>Names</th><th>RFC</th><th>Días de Gracia</th><th>Línea de Credito</th><th>% Aforo</th>');
    dataJson = await fetch('/buyers')
    data = await dataJson.json()
    if(rfc){
        dataJson = await fetch('/search/'+rfc)
        data = await dataJson.json()
    }
    if(data.length==0){ displayError(); return 0;}
    table.append(titles)
    for(var i in data){
        row = $('<tr />' );
        table.append( row );
        cell = $('<td id="delete-td"><button id="deletebtn-'+i+'" onclick="deletebtn('+i+')" class="btn" value="'+data[i].age+'"><i class="fa fa-trash"></i></button></td><td id="delete-td"><button id="editbtn-'+i+'"onclick="editbtn('+i+') " class="editbtn" value="'+data[i].age+'">Editar</button></td><td class="idnums">'+data[i].IDnum+'</td><td>'+data[i].name+'</td><td>'+data[i].age+'</td><td>'+data[i].bufferDays+'</td><td>'+data[i].lineaDeCredito+'</td><td>'+data[i].aforoP+'</td>')   
        row.append( cell );
     }
}else if(tipo=="banco"){
titles=$('<th></th><th></th><th>Nombre del Banco</th><th>RFC</th>')
    dataJson = await fetch('/bancos')
    data = await dataJson.json()
    if(rfc){
        dataJson = await fetch('/searchB/'+rfc)
        data = await dataJson.json()
    }
    if(data.length==0){ displayError(); return 0;}
    table.append(titles)
    for(var i in data){
        row = $('<tr />' );
        table.append( row );
        cell = $('<td id="delete-td"><button  id="deletebtn-'+i+'" onclick="deletebtn('+i+')" class="btn" value="'+data[i].rfc+'"><i class="fa fa-trash"></i></button></td><td id="delete-td"><button id="editbtn-'+i+'"onclick="editbtn('+i+') " class="editbtn" value="'+data[i].rfc+'">Editar</button></td><td class="idnums">'+data[i].name+'</td><td>'+data[i].rfc+'</td>') 
        row.append( cell );
     }
} 
else{
    console.log("nada")
}

}


async function deletebtn(num){
    const rfc = document.getElementById("deletebtn-"+num).value
    const tipo= document.getElementById("sel").value
    var db=""
    if(tipo=="proveedor"){db="/prueba/"};
    if(tipo=="comprador"){db="/buyer/"}
    if(tipo=="banco"){db="/bancos/"}
    console.log(rfc)
    const dataJson = await fetch('/todos')
    const data = await dataJson.json()
    for(var i in data){
        if(data[i].rfc==rfc||data[i].age==rfc){
            const id = data[i]._id
            console.log(db)
            fetch(db+id, {
                method: 'DELETE'
            })
            window.location.reload(true)
        }
    }
}


async function editbtn(num){
    const rfc = document.getElementById("editbtn-"+num).value
    const tipo= document.getElementById("sel").value
    if(tipo=="proveedor"){
        document.getElementById("form-proveedor").style.display="block"
       const userJson = await fetch('/searchP/'+rfc)
       const user = await userJson.json()
       document.getElementById("f-p-nombre").value=user[0].name
       document.getElementById("rfc").value=user[0].rfc
       document.getElementById("f-p-rfc").value=user[0].rfc
       document.getElementById("f-p-email").value=user[0].email
       document.getElementById("f-p-spreadpoints").value=user[0].spreadpoints
       document.getElementById("f-p-tasabase").value=user[0].tasabase
    };
    if(tipo=="comprador"){
        document.getElementById("form-comprador").style.display="block"
       const userJson = await fetch('/search/'+rfc)
       const user = await userJson.json()
       document.getElementById("f-c-nombre").value=user[0].name
       document.getElementById("rfc").value=user[0].age
       document.getElementById("f-c-rfc").value=user[0].age
       document.getElementById("cobranza").value=user[0].cobranza
       document.getElementById("confirming").value=user[0].confirming
    };
    if(tipo=="banco"){
        document.getElementById("form-banco").style.display="block"
       const userJson = await fetch('/searchB/'+rfc)
       const user = await userJson.json()
       document.getElementById("f-b-nombre").value=user[0].name
       document.getElementById("rfc").value=user[0].rfc
       document.getElementById("f-b-rfc").value=user[0].rfc
    };

}

async function saveProveedor(){
    const rfc = document.getElementById("rfc").value
    const dataJson = await fetch('/searchP/'+rfc)
    const data = await dataJson.json()
    console.log(data)
    await fetch('/prueba/'+data[0]._id, {
        method:'PATCH',
        headers: {          
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'accept-encoding': 'gzip, deflate'
        },
        body: JSON.stringify({
            "name":document.getElementById("f-p-nombre").value,
            "rfc":document.getElementById("f-p-rfc").value,
            "email": document.getElementById("f-p-email").value,
            "spreadpoints":document.getElementById("f-p-spreadpoints").value,
            "tasabase":document.getElementById("f-p-tasabase").value
        })
    })
    window.location.reload(true)
}

async function saveComprador(){
    const rfc = document.getElementById("rfc").value
    const cobranza = document.getElementById("cobranza").value
    const confirming = document.getElementById("confirming").value
    const dataJson = await fetch('/search/'+rfc)
    const data = await dataJson.json()
    console.log(data)
    await fetch('/buyers/'+data[0]._id, {
        method:'PATCH',
        headers: {          
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'accept-encoding': 'gzip, deflate'
        },
        body: JSON.stringify({
            "name":document.getElementById("f-c-nombre").value,
            "age":document.getElementById("f-c-rfc").value,
            "cobranza": cobranza,
            "confirming":confirming
        })
    })
    window.location.reload(true)
}
async function saveBanco(){
    const rfc = document.getElementById("rfc").value
    const dataJson = await fetch('/searchB/'+rfc)
    const data = await dataJson.json()
    console.log(data)
    await fetch('/bancos/'+data[0]._id, {
        method:'PATCH',
        headers: {          
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'accept-encoding': 'gzip, deflate'
        },
        body: JSON.stringify({
            "name":document.getElementById("f-b-nombre").value,
            "rfc":document.getElementById("f-b-rfc").value,
        })
    })
    window.location.reload(true)
}