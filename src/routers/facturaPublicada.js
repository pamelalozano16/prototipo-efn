const express = require('express')
const Factura = require('../models/facturaPublicada')
const router = new express.Router()

router.get('/facturas', async (req, res)=>{
    try{
        const facturas = await Factura.find({})
        res.send(facturas)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.post('/facturas', async (req,res)=>{
    const factura = new Factura(req.body)

    try{
        await factura.save()
        res.status(201).send(factura)
    }
    catch (e){

     res.status(400).send(e.message)
    }
    

})
router.patch('/facturas/:id', async (req, res)=>{

    const _id = req.params.id
   
    try{
       const user = await Factura.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
       if(!user){return res.status(404).send('Not found')}
       res.send(user)
    }
    catch(e){
        res.send(e)
    }
})

router.get('/searchF/:numero', async (req, res)=>{
    invoiceNumber=req.params.numero

    try{
        const user = await Factura.find({"numero":invoiceNumber})
        if(!user){throw new Error ('not found')}

        res.send(user)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

module.exports =router