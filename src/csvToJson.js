const csv=require("csvtojson");
var request = require("request");
const path = require('path')


function switchDM(myDate){
    var dateString = myDate
    dateString = dateString.substr(6, 4)+"-"+dateString.substr(3, 2)+"-"+dateString.substr(0, 2);
    var date = new Date(dateString);
return date
}

const csvFilePath=path.join(__dirname, '../public/file.csv')
const  result = csv({
    noheader:true,
    delimiter:'|',
    headers:["name","rfc","Id","address","numero","folioFiscal","invoiceDate","dueDate","moneda","aforo"]
})
.fromFile(csvFilePath)
.then((jsonObj)=>{
    for(var i in jsonObj){
        // delete jsonObj[i].name
        jsonObj[i].dueDate=switchDM(jsonObj[i].dueDate)
        jsonObj[i].invoiceDate=switchDM(jsonObj[i].invoiceDate)
        jsonObj[i].dueDate=new Date(jsonObj[i].dueDate)
        jsonObj[i].invoiceDate=new Date(jsonObj[i].invoiceDate)
        delete jsonObj[i].Id
        delete jsonObj[i].address
        delete jsonObj[i].field11
    }
    
    let archivo=jsonObj

    return archivo

})

module.exports= result