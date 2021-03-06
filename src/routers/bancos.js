const express = require('express')
const Banco = require('../models/bancos')
const router = new express.Router()

router.get('/bancos', async (req, res)=>{
    try{
        const bancos = await Banco.find({})
        res.send(bancos)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})
router.get('/searchB/:rfc', async (req, res)=>{
    const myrfc = req.params.rfc
    try{
        const bancos = await Banco.find({"rfc":myrfc})
        res.send(bancos)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})
router.post('/bancos', async (req,res)=>{
    const banco = new Banco(req.body)

    try{
        await banco.save()
        res.status(201).send(banco)
    }
    catch (e){

     res.status(400).send(e.message)
    }
    

})

router.delete('/bancos/:id', async (req, res)=>{
    const _id = req.params.id
    try{
        const banco = await Banco.findByIdAndDelete(_id)  
        if(!banco){return res.status(404).send('Not Found')}
        res.send(banco)
    } catch(e){
        res.status(500).send(e.message)
    }
})


router.patch('/bancos/:id', async (req, res)=>{
    const _id = req.params.id
   
    try{
       const user = await Banco.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
       if(!user){return res.status(404).send('Not found')}
       res.send(user)
    }
    catch(e){
        res.send(e)
    }
})


module.exports =router