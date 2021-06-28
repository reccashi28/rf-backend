import express, { Router } from 'express'
import {
  addItemToCart,
  findAllItemsOfUser,
  findAllItemsInCart,
} from '../controllers/cart'
import {userAuth, adminAuth} from '../middlewares/auth'

const router = express.Router()


router.post('/', userAuth, addItemToCart)
router.get('/:userId', userAuth, findAllItemsOfUser)
// router.get('/', userAuth, findAllItemsInCart)

export default router
