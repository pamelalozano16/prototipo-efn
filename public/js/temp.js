
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
 

function createData(){




    apiGet().then((result)=>{

        var i =0
          let data = result
          console.log('Data facturaTemp:',data)
  
         while(i<=data.length-1){
             //Variables nuevas
           var newIva=0;
            const purchaseDate=curday('/',0)
            const aforoo=data[i].aforo
            const dueDay=(new Date(data[i].dueDate).getDate())
            const dueMonth=(new Date(data[i].dueDate).getMonth()+1)
            const _id=data[i]._id
            const theRFC = data[i].rfc
  
  
            fetch('/search/'+theRFC).then((response)=>{
              response.json().then((buyerData)=>{
  
  
                newIva=aforoo/1.16*0.16
                newIva=Math.round(newIva * 100) / 100
                  const aforoP=buyerData[0].aforoP; console.log(aforoP)
                  const bufferDays=buyerData[0].bufferDays; console.log(bufferDays)
                  const advanceRate=roundNum(aforoo*(aforoP/100))
                  const pDay=(new Date (purchaseDate)).getDate()
                  const pMonth=(new Date (purchaseDate)).getMonth()+1
                  const matuDate= matDate(dueDay, dueMonth, bufferDays)
                  const discountPeriod= discPeriod(matuDate[0], matuDate[1], pDay, pMonth)
                  const libor=roundLibor((document.getElementById("libor").innerHTML)/100)
                  const creditSpread=document.getElementById("spreadPoints").innerHTML
                  const discountMargin=roundNum(advanceRate*(libor+creditSpread)*(discountPeriod/360))
                  const purchasePrice=roundNum(advanceRate-discountMargin)
  
            fetch('/facturaTemp/'+_id, {
              method: "PATCH",
              headers: {          
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'accept-encoding': 'gzip, deflate'
                },
                body: JSON.stringify({
                 "iva":newIva,
                "status": "En proceso",
                  purchaseDate,
                  aforoP,
                  bufferDays,
                  advanceRate,
                  discountPeriod,
                  creditSpread,
                  libor,
                  discountMargin,
                  purchasePrice
              })
          }).catch(function(error) {
              console.log('Hubo un problema con la petición Fetch:' + error);
            }).then((response)=>{
  
              console.log(response)
              if(response.ok){
  
              //   document.location.reload(true)
              } else{
                  document.getElementById("error").innerHTML="Error"
              }
          })
              
              })
          })
  
            // libor:{
            //     type:Number
            // },
            // creditSpread:{
            //     type:Number
            // },
            // discountMargin:{
            //     type:Number
            // },
            // purchasePrice:{
            //     type:Number
            // }
    
    
          i++;
            //End of loop de data
         }
      })




}
