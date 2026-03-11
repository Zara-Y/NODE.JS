import express from 'express'
import Product from './product.mjs';

const router = express.Router();
router.use('/products' , Product)

export default router;