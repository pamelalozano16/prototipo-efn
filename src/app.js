const express= require('express')
const path = require('path')
var request = require("request");
const hbs = require('hbs');
require('./db/mongoose')
const j2c = require('./jsontocsv')
const j2cF = require('./facturastocsv')
const userRouter =require('./routers/user')
const notifsRouter = require('./routers/notificaciones')
const buyerRouter =require('./routers/buyer')
const facturaRouter =require('./routers/facturaPublicada')
const facturaTemp =require('./routers/facturaTemp')
const facturaDescontada =require('./routers/facturaDescontada')
const bancoRouter =require('./routers/bancos')
const multer = require('multer')
const excelToJson = require('convert-excel-to-json');
const fetch = require('node-fetch');


const app = express()
const port = process.env.PORT

console.log(process.env.MONGODB_URL)

app.use(express.json())
app.use(userRouter)
app.use(buyerRouter)
app.use(bancoRouter)
app.use(facturaTemp)
app.use(notifsRouter)
app.use(facturaDescontada)
app.use(facturaRouter);

function excel2json(){
    'use strict';

const result = excelToJson({
    sourceFile: path.join(__dirname, '../public/file.xlsx'),
    sheets: [{
        name:'sheet1',
        columnToKey: {
            A:"name",
            B: "rfc",
            E: "numero",
            F:'folioFiscal',
            G:'invoiceDate',
            H: 'dueDate',
            I: 'moneda',
            J: 'aforo'

            
        }}]
});
 
const final = result.sheet1
for(var i in final){
    final[i].dueDate=new Date(final[i].dueDate)
    final[i].dueDate.setHours(0,0,0,0);
    final[i].invoiceDate=new Date(final[i].invoiceDate)
    final[i].invoiceDate.setHours(0,0,0,0);
    console.log(final[i].dueDate)
    console.log(final[i].invoiceDate)
}

return final
}

var fs = require('fs');

function deleteFile(){
    fs.unlink(path.join(__dirname, '../public/file.xlsx'), (err)=>{
        if (err) return 0;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    })
    fs.unlink(path.join(__dirname, '../public/file.csv'), (err)=>{
        if (err) return 0;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    })

}

var storageTxt = multer.diskStorage(
    {
        destination: 'public',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null,"file.csv");
        },
        limits:{
            fileSize:1000000
        },
        fileFilter(req, file, cb){
            if (!file.originalname.match(/\.(csv|txt)$/)){
                return cb(new Error('Please upload an Excel Document'))
            }
        cb(undefined, true)
        }
    }
);

var storageExcel = multer.diskStorage(
    {
        destination: 'public',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null,"file.xlsx");
        },
        limits:{
            fileSize:1000000
        },
        fileFilter(req, file, cb){
            if (!file.originalname.match(/\.(xls|xlsx)$/)){
                return cb(new Error('Please upload an Excel Document'))
            }
        cb(undefined, true)
        }
    }
);
var uploadTxt = multer({storage: storageTxt});
var upload = multer({ storage: storageExcel});

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

//
app.post('/upload-txt', uploadTxt.single('uploadTxt'), (req, res)=>{
  const result = require('./csvToJson')
    result.then((response)=>{
        let archivo=response
        console.log(archivo)
        for(var i in archivo){
            var invoiceDate = new Date(archivo[i].invoiceDate)
            invoiceDate.setHours(0,0,0,0);
            var dueDate = new Date(archivo[i].dueDate)
            dueDate.setHours(0,0,0,0);
            var options = { method: 'POST',
            url: 'https://prototipo-efn.herokuapp.com/facturaTemp',
            headers: 
             { 'cache-control': 'no-cache',
               Connection: 'keep-alive',
               'accept-encoding': 'gzip, deflate',
               Accept: '*/*',
               'Content-Type': 'application/json' },
            body:{
                "name":archivo[i].name, 
                "rfc":archivo[i].rfc,
                "numero":archivo[i].numero,
                "folioFiscal":archivo[i].folioFiscal,
                "invoiceDate":invoiceDate,
                "dueDate":dueDate,
                "moneda":archivo[i].moneda,
                "aforo":archivo[i].aforo
            },
            json: true };
          
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
          });
        }
        res.render('uploaded')
    })
})

app.post('/upload-excel', upload.single('upload'), (req, res, next)=>{
    console.log(req.file.originalname)
    let archivo = excel2json()

    for(var i in archivo){
        var options = { method: 'POST',
        url: 'https://prototipo-efn.herokuapp.com/facturaTemp',
        headers: 
         { 'cache-control': 'no-cache',
           Connection: 'keep-alive',
           'accept-encoding': 'gzip, deflate',
           Accept: '*/*',
           'Content-Type': 'application/json' },
        body: archivo[i],
        json: true };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      });
    }


   res.render('uploaded')
})

app.get('/add', (req, res) => {
    res.render('registro-admin')
})
app.get('/relacion', (req, res) => {
    res.render('relacion-pb')
})
app.get('/clientes', (req, res) => {
    res.render('clientes-admin')
})
app.get('/p',  (req, res) => {
    res.render('proveedor-admin')
})
app.get('/admin-config',  (req, res) => {
    res.render('admin-config')
})
app.get('/carga-facturas',  (req, res) => {
    res.render('carga-facturas')
})
app.get('/descontar-documentos',  (req, res) => {
    var options = { method: 'DELETE',
    url: 'https://prototipo-efn.herokuapp.com/facturaTemp',
    headers: 
     { 'cache-control': 'no-cache',
       Connection: 'keep-alive',
       'accept-encoding': 'gzip, deflate',
       Accept: '*/*',} };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  });
    res.render('descontar-documentos')
})
app.get('/banco-comprador',  (req, res) => {
    res.render('banco-comprador')
})
app.get('/banco-clientes',  (req, res) => {
    res.render('banco-clientes')
})
app.get('/banco-comprados',  (req, res) => {
    res.render('banco-comprados')
})
app.get('/banco-facturas',  (req, res) => {
    j2c.jsontocsv()
    res.render('banco-facturas')
})
app.get('/descontar-facturas',  (req, res) => {
    res.render('descontar-facturas')
})
app.get('/cobranza',  (req, res) => {
    j2c.jsontocsv()
    res.render('cobranza')
})
app.get('/proveedor',  (req, res) => {
    res.render('logins/login-proveedor')
})
app.get('/comprador',  (req, res) => {
    res.render('logins/login-comprador')
})
app.get('/inicio-comprador',  (req, res) => {
    res.render('dashboards/dashboard-comprador')
})
app.get('/inicio-proveedor',  (req, res) => {
    res.render('dashboards/dashboard-proveedor')
})
app.get('/inicio-banco',  (req, res) => {
    res.render('dashboards/inicio-banco')
})
app.get('/banco',  (req, res) => {
    res.render('logins/login-banco')
})
app.get('/admin',  (req, res) => {
    res.render('logins/login-admin')
})
app.get('/consultar-facturas-admin',  (req, res) => {
    res.render('consultar-facturas-admin')
})
app.get('/consultar-facturas',  (req, res) => {
   deleteFile()
   var options = { method: 'DELETE',
   url: 'https://prototipo-efn.herokuapp.com/facturaTemp',
   headers: 
    { 'cache-control': 'no-cache',
      Connection: 'keep-alive',
      'accept-encoding': 'gzip, deflate',
      Accept: '*/*',} };
 
 request(options, function (error, response, body) {
   if (error) throw new Error(error);
 });
    j2cF.jsontocsv()
   res.render('consultar-facturas')
})


app.get('/todos', async (req, res)=>{
    var todos=[]
   const pJson = await fetch('https://prototipo-efn.herokuapp.com/prueba')
   const suppliers = await pJson.json()
    const cJson = await fetch('https://prototipo-efn.herokuapp.com/buyers')
    const buyers = await cJson.json()
    const bJson = await fetch('https://prototipo-efn.herokuapp.com/bancos')
    const banks = await bJson.json()
    todos= todos.concat(suppliers)
    todos=todos.concat(buyers)
    todos=todos.concat(banks)
    res.send(todos)
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})

