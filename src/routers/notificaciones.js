const Notifs = require("../models/notificaciones")
const express = require("express")
const router = new express.Router()

router.get('/notifs', async (req, res)=>{
    try{
        const notifs = await Notifs.find({})
        res.send(notifs)

    } catch(e){
        res.status(500).send(e.message)
    }
})
router.get('/notifs/pend', async(req, res)=>{
    try{
        const notifs = await Notifs.find({"status":"Pendiente"})
        res.send(notifs)
    } catch(e){
        res.send(e)
    }
})
router.get('/notifs/pend/np', async(req, res)=>{
    try{
        const notifs = await Notifs.find({"status":"Pendiente", $or: [ { "type": "N" }, { "type" : "Np" } ]})
        res.send(notifs)
    } catch(e){
        res.send(e)
    }
})
router.get('/notifs/pend/nc', async(req, res)=>{
    try{
        const notifs = await Notifs.find({"status":"Pendiente", $or: [ { "type": "N" }, { "type" : "Nc" } ]})
        res.send(notifs)
    } catch(e){
        res.send(e)
    }
})

router.post('/notifs', async (req, res)=>{
    const body = new Notifs(req.body)
    try{
        await body.save()
        res.send(body)
    } catch(e){
        res.status(500).send(e.message)
    }
})

router.delete('/notifs', async(req, res)=>{
    try{
        const empty = await Notifs.remove({})
        res.send(empty)
    } catch(e){
        res.status(500).send(e.message)
    }
})

router.patch('/notifs/:id', async(req, res)=>{
    const id = req.params.id
    try{
        const user = await Notifs.findByIdAndUpdate({_id: id}, req.body, {new: true, runValidators: true})
        if(!user){return res.status(404).send('Not found')}
        res.send(user)
    } catch(e){
        res.send(e)
    }
})
module.exports = router