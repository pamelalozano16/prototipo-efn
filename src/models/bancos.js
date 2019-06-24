const mongoose = require('mongoose')


const bancoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    }
})


const Banco= mongoose.model('bancos', bancoSchema)

module.exports = Banco