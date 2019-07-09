const mongoose = require('mongoose')


const Factura = mongoose.model('facturaTemporal', {
    name:{
        type: String
    },
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
   aforoP:{
       type:Number
   },
   status:{
       type:String,
       default:'Publicada'
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
    type:Number,
    default:3
},
discountMargin:{
    type:Number
},
purchasePrice:{
    type:Number
}
})
module.exports = Factura