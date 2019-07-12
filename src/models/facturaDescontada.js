const mongoose = require('mongoose')


const FacturaD = mongoose.model('facturasDescontadas', {
    rfc: {
        type: String,
        validate(value){
            if(value<0){
                throw new Error('RFC must be a positive number.')
            }
        },
    },
    name:{
        type:String
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
   { type:Number,
    default:100
},
    iva:{
        type:Number
    },
    extras:{
        type:Number
    },
    purchaseDate:{
        type: Date
    },
    aforoP:{
        type:Number
    },
    advanceRate:{
        type:Number
    },
    bufferDays:{
        type:Number
    },
    discountPeriod:{
        type:Number
    },
    libor:{
        type:Number
    },
    creditSpread:{
        type:Number
    },
    discountMargin:{
        type:Number
    },
    purchasePrice:{
        type:Number
    },
    efnFee:{
        type:Number
    },
    matuDate:{
        type:Date
    }
})



module.exports = FacturaD