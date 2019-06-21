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
    }
})


const Buyer= mongoose.model('buyers', buyerSchema)

module.exports = Buyer