import express from 'express'
import Users from '../Model/users.mjs'
import verifyToken from '../middlewares/verifyToken.mjs'

const router=express.Router()

router.get('/', async(req , res)=>{
    const users=await Users.find()
    res.send({message:"Data fetched successfully" , Data:users})
})

router.post('/register' , async(req , res)=>{
    try{
    const user=new Users(req.body)
    await user.save()
    res.send({message:"User register successfully"})
    }
    catch(e){
        res.send({message:e.message})
    }
})

router.post('/login' , async(req , res)=>{
    try{
        //step1:Check if email exist
        const {email , password}=req.body
        const user=await Users.findOne({email})
        if(!user){
            res.send({message:"User not Found"})
            return
        }
        //step2:compare the password
        const isCorrect=user.comparePassword(password)
        if(!isCorrect){
            res.status(404).send({message:"Invalid Password"})
            return
        }
        //step3:Generate token
        const token=user.generateToken()
        user.Token.push(token)
        await user.save()

        res.send({message: "User logged in successfully"})
    }
    catch(e){
        res.status(404).send({message:e.message})
    }
})

router.put('/logout', verifyToken , async(req , res)=>{
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({message:"Logged out successfully"})
})

export default router