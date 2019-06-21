const express = require('express')
const Buyer = require('../models/buyers')
const router = new express.Router()

router.get('/buyers', async (req, res)=>{
    try{
        const buyers = await Buyer.find({})
        res.send(buyers)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})


router.delete('/buyers/:id', async (req, res)=>{
    const _id = req.params.id
    try{
        const user = await Buyer.findByIdAndDelete(_id)  
        if(!user){return res.status(404).send('Not Found')}
        res.send(user)
    } catch(e){
        res.status(500).send(e.message)
    }
})

router.patch('/buyers/:id', async (req, res)=>{

    const _id = req.params.id
   
    try{
       const user = await Buyer.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
       if(!user){return res.status(404).send('Not found')}
       res.send(user)
    }
    catch(e){
        res.send(e)
    }
})


router.get('/buyers/:id', async (req, res)=>{
    const _id = req.params.id

    try{
       const user = await Buyer.findById(_id)
       if(!user){
        return res.status(404).send('Not Found')
        }
        res.send(user)
    } catch(e){
        res.status(500).send('Error id is not valid')
    }
    
})

router.post('/buyers', async (req,res)=>{
        const user = new Buyer(req.body)

        try{
            await user.save()
            res.status(201).send(user)
        }
        catch (e){

         res.status(400).send(e.message)
        }
        

})
router.get('/search/:rfc', async (req, res)=>{
    myRfc=req.params.rfc

    try{
        const user = await Buyer.find({"age":myRfc})
        if(!user){throw new Error ('not found')}

        res.send(user)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

module.exports =router