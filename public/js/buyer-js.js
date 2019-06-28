

document.getElementById("save").style.visibility='hidden';
let IDnums=[]
let names =[]
let ages= []
let ids=[]
let lineaDC=[]
let diasDG=[]
fetch('/buyers').then((response)=>{
   response.json().then((data)=>{
       if(data.error){
           document.getElementById("user").innerHTML = data.error;
           return console.log(data.error)
       } else{
              
               for(var i in data){
                   names = names.concat(data[i].name)
                   ages = ages.concat(data[i].age)
                   IDnums[i]=(data[i].IDnum)
                   ids = ids.concat(data[i]._id)
                   lineaDC=lineaDC.concat(data[i].lineaDeCredito)
                   diasDG=diasDG.concat(data[i].bufferDays)
               } 

               var table = $('#myTable');
               var row, cell;
               var titles = $('<th></th><th></th><th>ID</th><th>Names</th><th>RFC</th><th>Días de Gracia</th><th>Línea de Credito</th>');
               table.append(titles)
            for(var i=0; i<names.length; i++){
            row = $('<tr />' );
            table.append( row );
            cell = $('<td id="delete-td"><button onclick="deletebtn('+i+')" class="btn"><i class="fa fa-trash"></i></button></td><td id="delete-td"><button onclick="editbtn('+i+')" class="editbtn">Edit</button></td><td class="idnums">'+IDnums[i]+'</td><td>'+names[i]+'</td><td>'+ages[i]+'</td><td>'+diasDG[i]+'</td><td>'+lineaDC[i]+'</td>')
            row.append( cell );
           }

           // document.getElementById("user").innerHTML = JSON.stringify(data);
       }
      
   })
})
async function apiGet(){
  try{
      const resp = await fetch('/buyers')
      const data = await resp.json()
      return data
  } catch(error){
      console.log(error)
  }
}

apiGet().then((response)=>{
  let newID = response[response.length-1].IDnum+1;
  document.getElementById("IDnum").innerHTML=newID;
})

function deletebtn(num){
   fetch('/buyers/'+ids[num],{method: "DELETE"})
   document.location.reload(true)
}

// const addForm = document.querySelector('form')
let edit=[]
function save(){
const num = edit[0]

fetch('/buyers/'+ids[num], {
       method: "PATCH",
       headers: {          
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'accept-encoding': 'gzip, deflate'
         },
         body: JSON.stringify({
           "name": document.getElementById("name").value,
           "age": document.getElementById("age").value
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
   document.getElementById("IDnum").innerHTML= IDnums[num]

  console.log(IDnums[num])
   document.getElementById("save").style.visibility='visible';
 edit= edit.concat(num)
}





function add(){
   const name = document.getElementById("name").value
       const age = document.getElementById("age").value || 0
      const IDnum = document.getElementById("IDnum").innerHTML

   
       if(!name){return document.getElementById("error").innerHTML="Please enter name"}
  
           fetch('/buyers', {
               method: "POST",
               headers: {          
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'accept-encoding': 'gzip, deflate'
                 },
               body: JSON.stringify({
                   "name": name,
                   "age":age,
                    "IDnum": IDnum
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