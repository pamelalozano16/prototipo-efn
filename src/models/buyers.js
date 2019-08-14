const mongoose = require('mongoose')


const buyerSchema = new mongoose.Schema({
    IDnum:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    }, 
    age: {
        type: String,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number.')
            }
        }
    }, 
    email: {
        type: String
    }, 
    lineaDeCredito:{
        type: Number
    },
    bufferDays:{
        type: Number
    },
    aforoP:{
        type:Number
    },
    cobranza:{
        type: String,
        default: "delegada"
    },
    confirming:{
        type: Boolean,
        default: false
    }
})


const Buyer= mongoose.model('buyers', buyerSchema)

module.exports = Buyer