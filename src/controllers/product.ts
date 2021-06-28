import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import ProductService from '../services/product'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    console.log(req.cookies.token,"creating product")
    const product = new Product({
      ...req.body
    })

    await ProductService.create(product)
    console.log("product created")
    res.json(product)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const productId = req.params.productId
    const updatedProduct = await ProductService.update(productId, update)
    console.log("product updated")
    res.json(updatedProduct)
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductService.deleteProduct(req.params.productId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

export const findProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.findProductById(req.params.productId))
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

export const findAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.findAllProducts())
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}
