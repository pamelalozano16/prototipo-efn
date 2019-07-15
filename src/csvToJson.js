const csv=require("csvtojson");
var request = require("request");
const path = require('path')

const csvFilePath=path.join(__dirname, '../public/file.csv')
const  result = csv({
    delimiter:'|',
    headers:["name","rfc","Id","address","numero","folioFiscal","invoiceDate","dueDate","moneda","aforo"]
})
.fromFile(csvFilePath)
.then((jsonObj)=>{
    for(var i in jsonObj){
        delete jsonObj[i].Id
        delete jsonObj[i].address
        delete jsonObj[i].field11
    }
    
    let archivo=jsonObj

    return archivo

})

module.exports= result