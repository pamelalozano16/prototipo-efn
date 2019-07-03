const express = require('express')
const FacturaD = require('../models/facturaDescontada')
const router = new express.Router()

router.get('/facturasDescontadas', async (req, res)=>{
    try{
        const facturas = await FacturaD.find({})
        res.send(facturas)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.post('/facturasDescontadas', async (req,res)=>{
    const factura = new FacturaD(req.body)

    try{
        await factura.save()
        res.status(201).send(factura)
    }
    catch (e){

     res.status(400).send(e.message)
    }
    

})

module.exports =router