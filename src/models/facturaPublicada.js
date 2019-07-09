const mongoose = require('mongoose')


const Factura = mongoose.model('facturasPublicadas', {
    rfc: {
        type: String,
        validate(value){
            if(value<0){
                throw new Error('RFC must be a positive number.')
            }
        },
    },
    numero:{
        type: String
    },
    folioFiscal:{
        type: String
    },
    invoiceDate:{
        type: Date
    },
    dueDate:{
        type:Date
    },
    moneda:{
        type: String
    },
    aforo:
   { type:Number},
   status:{
       type: String,
       default: "Publicada"
   },
   aforoP:{
       type:Number,
       default:100
   }
})

// Factura.get('/facturas', async (req, res)=>{
//     try{
//         const facturas = await Factura.find({})
//         res.send(facturas)
//     }
//     catch(e){
//         res.status(500).send(e.message)
//     }
// })


module.exports = Factura