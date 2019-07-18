const express = require('express')
const User = require('../models/user')
const router = new express.Router()




router.delete('/prueba/:id', async (req, res)=>{
    const _id = req.params.id
    try{
        const user = await User.findByIdAndDelete(_id)  
        if(!user){return res.status(404).send('Not Found')}
        res.send(user)
    } catch(e){
        res.status(500).send(e.message)
    }
})

router.patch('/prueba/:id', async (req, res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'rfc']
    const isValid = updates.every((item)=>{
        return allowedUpdates.includes(item)
    })
    if(!isValid){res.status(400).send('Invalid request')}
    const _id = req.params.id
   
    try{
       const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
       if(!user){return res.status(404).send('Not found')}
       res.send(user)
    }
    catch(e){
        res.send(e)
    }
})

router.get('/prueba', async (req, res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.get('/prueba/:id', async (req, res)=>{
    const _id = req.params.id

    try{
       const user = await User.findById(_id)
       if(!user){
        return res.status(404).send('Not Found')
        }
        return user
    } catch(e){
        res.status(500).send('Error id is not valid')
    }
    
})

router.post('/prueba', async (req,res)=>{
        const user = new User(req.body)

        try{
            await user.save()
            res.status(201).send(user)
        }
        catch (e){

         res.status(400).send(e.message)
        }
        

})
router.get('/searchP/:rfc', async (req, res)=>{
    myRfc=req.params.rfc

    try{
        const user = await User.find({"rfc":myRfc})
        if(!user){throw new Error ('not found')}

        res.send(user)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

module.exports =router