import express from 'express'
import product from '../Model/product.mjs'
import verifyToken from '../middlewares/verifyToken.mjs';
import upload from '../middlewares/uploadimage.mjs';

const router = express.Router();

router.get('/' , async(req , res)=>{
    const Products=await product.find();
    res.send({message:"Products fetched successfully" , data:Products});

})

router.get('/:id', async(req , res)=>{
    const Product=await product.findById({_id:req.params.id});
    if(!Product) return res.status(404).send({message:"Products not found"});
    res.send({message:"Products fetched successfully" , data: Product})
})
router.post('/',verifyToken, upload.single('image'), async(req , res)=>{
    try{
        const newProduct=new product(req.body);
        await newProduct.save();
        console.log(req.body);
        res.send({message: "Product created successfully"});
    }
    catch(e){
        res.send({message:e.message});

    }
})
router.put('/:id' , async(req , res)=>{
 try{
        const updateProduct=await product.findOneAndUpdate({_id:req.params.id} , req.body , {new: true});
    res.send({message:"Product updated successfully"} , updateProduct);
 }
 catch(e){
    res.send({message:"Error updating product" , error:e.message});
 }

})
router.delete('/:id' , async(req , res)=>{
    try{
        const DeleteProduct= await product.deleteOne({_id:req.params.id} , req.body , {new:true});
        res.send({message:"Product deleted successfully" , DeleteProduct});
    }
    catch(e){
        res.send(
            {message:"Error deleting Product" , error:e.message}
        );
    }
})
export default router 