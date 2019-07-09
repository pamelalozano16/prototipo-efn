const express= require('express')
const path = require('path')
var request = require("request");
const hbs = require('hbs');
require('./db/mongoose')
const j2c = require('./jsontocsv')
const userRouter =require('./routers/user')
const buyerRouter =require('./routers/buyer')
const facturaRouter =require('./routers/facturaPublicada')
const facturaTemp =require('./routers/facturaTemp')
const facturaDescontada =require('./routers/facturaDescontada')
const bancoRouter =require('./routers/bancos')
const multer = require('multer')
const excelToJson = require('convert-excel-to-json');


const app = express()
const port = process.env.PORT

console.log(process.env.MONGODB_URL)

app.use(express.json())
app.use(userRouter)
app.use(buyerRouter)
app.use(bancoRouter)
app.use(facturaTemp)
app.use(facturaDescontada)
app.use(facturaRouter);

function excel2json(){
    'use strict';

const result = excelToJson({
    sourceFile: path.join(__dirname, '../public/file.xlsx'),
    sheets: [{
        name:'sheet1',
        columnToKey: {
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


console.log(final)
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
            var options = { method: 'POST',
            url: 'https://prototipo-efn.herokuapp.com/facturaTemp',
            headers: 
             { 'cache-control': 'no-cache',
               Connection: 'keep-alive',
               'accept-encoding': 'gzip, deflate',
               Accept: '*/*',
               'Content-Type': 'application/json' },
            body:{ 
                "rfc":archivo[i].rfc,
                "numero":archivo[i].numero,
                "folioFiscal":archivo[i].folioFiscal,
                "invoiceDate":archivo[i].invoiceDate,
                "dueDate":archivo[i].dueDate,
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
app.get('/carga-facturas',  (req, res) => {
    res.render('carga-facturas')
})
app.get('/banco-comprador',  (req, res) => {
    res.render('banco-comprador')
})
app.get('/banco-clientes',  (req, res) => {
    res.render('banco-clientes')
})
app.get('/banco-facturas',  (req, res) => {
    j2c.jsontocsv()
    res.render('banco-facturas')
})
app.get('/descontar-facturas',  (req, res) => {
    res.render('descontar-facturas')
})
app.get('/proveedor',  (req, res) => {
    res.render('logins/login-proveedor')
})
app.get('/banco',  (req, res) => {
    res.render('logins/login-banco')
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

   res.render('consultar-facturas')
})




app.listen(port, () => {
    console.log('Server is up on port '+port)
})

