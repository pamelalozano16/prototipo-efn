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



module.exports =router