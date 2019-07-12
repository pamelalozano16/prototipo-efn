

document.getElementById("save").style.visibility='hidden';
let IDnums=[]
let names =[]
let ages= []
let ids=[]
let lineaDC=[]
let diasDG=[]
let aforoP=[]
fetch('/prueba').then((response)=>{
   response.json().then((data)=>{
       if(data.error){
           document.getElementById("user").innerHTML = data.error;
           return console.log(data.error)
       } else{
              
               for(var i in data){
                   names = names.concat(data[i].name)
                   ages = ages.concat(data[i].rfc)
                   ids = ids.concat(data[i]._id)
                   lineaDC=lineaDC.concat(data[i].spreadpoints)
                   diasDG=diasDG.concat(data[i].tasabase)
                   aforoP=aforoP.concat(data[i].email)
               } 

               var table = $('#myTable');
               var row, cell;
               var titles = $('<th></th><th>Names</th><th>RFC</th><th>Tasa Base</th><th>Spread Points</th><th>Email</th>');
               table.append(titles)
            for(var i=0; i<names.length; i++){
            row = $('<tr />' );
            table.append( row );
            cell = $('<td class="profile-td"><button class="profile" id="profile-'+(i)+'">Ver Perfil</button></td><td>'+names[i]+'</td><td>'+ages[i]+'</td><td>'+diasDG[i]+'</td><td>'+lineaDC[i]+'</td><td>'+aforoP[i]+'</td>')
            row.append( cell );
           }

    document.getElementById("profile-0").onclick=function() {
        window.location.href="/banco-comprador"
    }

           // document.getElementById("user").innerHTML = JSON.stringify(data);
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


function deletebtn(num){
   fetch('/prueba/'+ids[num],{method: "DELETE"})
   document.location.reload(true)
}

// const addForm = document.querySelector('form')
let edit=[]
function save(){
const num = edit[0]

fetch('/prueba/'+ids[num], {
       method: "PATCH",
       headers: {          
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'accept-encoding': 'gzip, deflate'
         },
         body: JSON.stringify({
           "name": document.getElementById("name").value,
           "rfc": document.getElementById("age").value
       })
   }).catch(function(error) {
       console.log('Hubo un problema con la petición Fetch:' + error);
     }).then((response)=>{
       console.log(response)
       if(response.ok){
         document.location.reload(true)
       } else{
           document.getElementById("error").innerHTML="Error"
       }
   })
  
}
function editbtn(num){
   console.log('edit')
   document.getElementById("name").value =names[num]
   document.getElementById("age").value = ages[num]


  console.log(IDnums[num])
   document.getElementById("save").style.visibility='visible';
 edit= edit.concat(num)
}





function add(){
   const name = document.getElementById("name").value
       const age = document.getElementById("age").value || 0


   
       if(!name){return document.getElementById("error").innerHTML="Please enter name"}
  
           fetch('/prueba', {
               method: "POST",
               headers: {          
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'accept-encoding': 'gzip, deflate'
                 },
               body: JSON.stringify({
                   "name": name,
                   "rfc":age,

                  }),
               json: true
               }).catch(function(error) {
                   console.log('Hubo un problema con la petición Fetch:' + error);
                 }).then((response)=>{
                   console.log(response.message)
                   if(response.ok){
                     document.location.reload(true)
                   } else{
                       document.getElementById("error").innerHTML="Error"
                   }
               })
                   
   
   
}

   

// fetch('https://httpbin.org/post', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({a: 1, b: 'Textual content'})
//   });