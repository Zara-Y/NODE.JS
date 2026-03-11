import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import jwtSecret from '../config/jwt.mjs'
import {Schema} from 'mongoose'

const username= new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    fullName:{
        type:String,
        required:true
    },
    Token:{
        default:[],
        type:[]
    },
    role:{
        type:String,
        default:"user",
        enum:["user" , "admin"]
    }
});

username.pre('save' , function(next){
    const user = this
    if(user.isModified('password')){
        const salt= bcrypt.genSaltSync(10);
        const hash= bcrypt.hashSync(user.password , salt);

        user.password=hash
    }
    next()

});

username.methods.comparePassword = function (password ){
    const user=this

     //user.password === db password (encrypted) asjdhu2i346193
    //password === frontend password (normal) 123456
     console.log('db password', user.password)
    console.log('frontend password', password)

    return bcrypt.compareSync(password , user.password)
}

username.methods.generateToken=function(){
    const {_id}=this
    const token= jwt.sign({_id} , jwtSecret);
    return token
}

const user= mongoose.model("user" , username);

export default user