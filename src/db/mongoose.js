const mongoose = require('mongoose')



mongoose.connect("mongodb+srv://dbPrueba:Pammap99*@cluster0-viegr.mongodb.net/prototipo-efn?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch((e)=>{
    console.log(e)
})

// const Factura = mongoose.model('facturasPublicadas', {
//     rfc: {
//         type: String,
//         validate(value){
//             if(value<0){
//                 throw new Error('RFC must be a positive number.')
//             }
//         },
//     },
//     numero:{
//         type: Number
//     }
// //     folioFiscal:{
// //         type: String
// //     },
// //     invoiceDate:{
// //         type: Date
// //     },
// //     DueDate:{
// //         type:Date
// //     },
// //     moneda:{
// //         type: String
// //     },
// //     aforo:
// //    { type:Number}
// })

// // Factura.get('/facturas', async (req, res)=>{
// //     try{
// //         const facturas = await Factura.find({})
// //         res.send(facturas)
// //     }
// //     catch(e){
// //         res.status(500).send(e.message)
// //     }
// // })


// new Factura({
//     "rfc":"384b43vvv",
//     "number":329874
// }).save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{console.log(error)})

