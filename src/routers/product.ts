import express from 'express'
import {
  createProduct,
  findProductById,
  deleteProduct,
  findAllProducts,
  updateProduct,
} from '../controllers/product'

import {userAuth, adminAuth } from '../middlewares/auth'

const router = express.Router()

router.get('/', findAllProducts)
router.get('/:productId', findProductById)
router.put('/:productId',userAuth, adminAuth, updateProduct)
router.delete('/:productId',userAuth, adminAuth, deleteProduct)
router.post('/', userAuth, adminAuth, createProduct)

export default router
