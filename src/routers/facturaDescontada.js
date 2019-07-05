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

router.delete('/facturasDescontadas', async (req, res)=>{
    try{
        const facturas= await FacturaD.remove({})
        res.send(facturas)
    } catch(e){
        res.status(500).send(e.message)
    }
})

router.patch('/facturasDescontadas/:id', async (req, res)=>{
    const _id = req.params.id
    try{
       const user = await FacturaD.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
       if(!user){return res.status(404).send('Not found')}
       res.send(user)
    }
    catch(e){
        res.send(e)
    }
})


module.exports =router