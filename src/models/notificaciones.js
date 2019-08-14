const mongoose=require("mongoose")

const NotfsSchema = new mongoose.Schema({
    title:{
        type: String
    },
    description: {
        type: String
    },
    date:{
        type:Date
    },
    status:{
        type: String
    },
    type:{
        type: String,
        default:"N"
    }
})

const notifs = mongoose.model('notificaciones', NotfsSchema)

module.exports = notifs