const express = require('express')
const Factura = require('../models/facturaTemp')
const router = new express.Router()

router.get('/facturaTemp', async (req, res)=>{
    try{
        const facturas = await Factura.find({})
        res.send(facturas)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.post('/facturaTemp', async (req,res)=>{
    const factura = new Factura(req.body)

    try{
        await factura.save()
        res.status(201).send(factura)
    }
    catch (e){

     res.status(400).send(e.message)
    }
    

})

router.delete('/facturaTemp', async(req, res)=>{
    try{
        const facturas= await Factura.remove({})
        res.send(facturas)
    } catch(e){
        res.status(500).send(e.message)
    }
})


router.patch('/facturaTemp/:id', async (req, res)=>{
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

module.exports =router