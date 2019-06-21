const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('user', {
    name:{
        type: String,
        required: true,
        trim: true
    }, 
    rfc: {
        type: String,
        validate(value){
            if(value<0){
                throw new Error('RFC must be a positive number.')
            }
        },
        default: 0
    },
    tipo:{
        type:String
    },
    email:{
        type: String,
        trim: true,
        // required: true,
        lowercase: true,
        validate(value){
           if (!validator.isEmail(value)){
               throw new Error('Email is invalid')
           }
        }
    },
    tasabase: {
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('RFC must be a positive number.')
            }
        }
    },
    spreadpoints:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('RFC must be a positive number.')
            }
        }
    },
    bancos :[{
        banco:{
            type: String
        }
    }]
  
})



module.exports = User