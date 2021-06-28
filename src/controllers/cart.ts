import { Request, Response, NextFunction } from 'express'

import Cart from '../models/Cart'
import CartService from '../services/cart'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

//post

export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { items } = req.body
    const { productId, quantity } = items[0]
    const cart = new Cart({
      ...req.body
    })
    await CartService.addToCart(cart)
    await CartService.updateStock(productId, quantity)
    console.log('added to cart')
    res.json(cart)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

export const findAllItemsOfUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    console.log(userId, "from full stack userid")
    const cart = await CartService.getItemsInCart(userId)
    console.log("from cart in backend")
    if(cart){
      res.status(200).send(cart)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    res.send(null)
  }
}

export const findAllItemsInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CartService.findAll())
  } catch (error) {
    next(new NotFoundError('Movies not found', error))
  }
}
