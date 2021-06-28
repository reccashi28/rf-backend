import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'
  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// const token = jwt.sign( {

// })

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

const { firstName, lastName, email, role } = req.body
const password = req.body.password;
const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
    firstName, lastName, email, password: hashedPassword, role
  })

  const savedUser = await UserService.create(user)

  res.json(savedUser)

  } catch (error) {
   res.status(500).send({message: "User Already Exist"})
  }
}

export const logInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    //validate
    const userExist = await UserService.existingUser(email, password)
    const userName = userExist.firstName;

    const token = jwt.sign( {
      user: userExist._id,
      role: userExist.role,
      name: userExist.firstName
    },
      process.env.JWT_SECRET
    )

    console.log('login success', token)

    if(userExist.role === "admin") {
      res.cookie('token', token, {
        httpOnly: true
      }).send({ role: "admin", name: userName, userId: userExist._id})
    } else {
      res.cookie('token', token, {
        httpOnly: true
      }).send({ role: "user", name: userName, userId: userExist._id})
    }
   

  } catch (error) {
    res.status(404).send({errorMessage: "Password or Email Incorrect"})
  }
}

export const logOutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    console.log("logout sucessfully")
    res.status(202).clearCookie('token').send()
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updateUser = await UserService.update(userId, update)
    res.json(updateUser)
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUser(req.params.userId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findUserById(req.params.userId))
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAllUsers())
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

export const isLoggedIn = async (
  req: Request,
  res: Response
) => {
  try{

    // console.log(req)

    const token = req.cookies.token;
    console.log(token, "still signedin")
    if(!token) {
      return res.json(false) 
    } else {
    console.log("still signedin")
      jwt.verify(token, process.env.JWT_SECRET)
      const decodedJwt = jwt.decode(token, { complete: true });
      const userId = decodedJwt.payload.user;
      const role = decodedJwt.payload.role;
      const userName = decodedJwt.payload.name;
      // req.user = verified.user;
      if(role === "admin") {
        res.json({signedin: true, role: "admin", name: userName, userId: userId})
      } else {
        res.json({signedin: true, role: "user", name: userName, userId: userId})
      }
      //.send({role: "user", name: userName})  
    }
}catch(err) {
   console.log(err) 
   res.send(false)
}
}