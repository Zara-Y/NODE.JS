import mongoose  from "mongoose";
import { Schema } from "mongoose";

const Productschema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
         type:String,
        required:true
    }
});

const Product=mongoose.model("Product" , Productschema);
export default Product;