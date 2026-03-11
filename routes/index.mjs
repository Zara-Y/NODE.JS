import express from 'express'
import Product from './product.mjs';
import User from "./user.mjs"

const router = express.Router();

// Root route - this fixes "Cannot GET /"
router.get('/', (req, res) => {
  res.json({ message: 'Backend is running 🚀' });
});

router.use('/products' , Product)
router.use('/user' , User)

export default router; 