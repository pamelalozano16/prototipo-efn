

// document.getElementById("save").style.visibility='hidden';
//  let names =[]
//  let emails = []
//  let rfcs= []
//  let ids=[]
// fetch('/prueba').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             document.getElementById("user").innerHTML = data.error;
//             return console.log(data.error)
//         } else{
               
//                 for(var i in data){
//                     names = names.concat(data[i].name)
//                     emails = emails.concat(data[i].email)
//                     rfcs = rfcs.concat(data[i].rfc)
//                     ids = ids.concat(data[i]._id)
//                 } 

//                 var table = $('#myTable');
//                 var row, cell;
//                 var titles = $('<th></th><th></th><th>Names</th><th>RFC</th><th>Email</th>');
//                 table.append(titles)
//              for(var i=0; i<names.length; i++){
//              row = $('<tr />' );
//              table.append( row );
//              cell = $('<td id="delete-td"><button onclick="deletebtn('+i+')" class="btn"><i class="fa fa-trash"></i></button></td><td id="delete-td"><button onclick="editbtn('+i+')" class="editbtn">Edit</button></td><td>'+names[i]+'</td><td>'+rfcs[i]+'</td><td>'+emails[i]+'</td>')
//              row.append( cell );
//             }

//             // document.getElementById("user").innerHTML = JSON.stringify(data);
//         }
       
//     })
// })

// function deletebtn(num){
//     fetch('/prueba/'+ids[num],{method: "DELETE"})
//     document.location.reload(true)
// }

// // const addForm = document.querySelector('form')
// let edit=[]
// function save(){
// const num = edit[0]

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
// function editbtn(num){
//     console.log('edit')
//     document.getElementById("name").value =names[num]
//     document.getElementById("rfc").value = rfcs[num]
//     document.getElementById("email").value =emails[num]

//     document.getElementById("save").style.visibility='visible';
//   edit= edit.concat(num)
// }

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

    

// fetch('https://httpbin.org/post', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({a: 1, b: 'Textual content'})
//   });