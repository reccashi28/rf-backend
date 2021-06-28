import User, { UserDocument } from '../models/User'
const bcrypt = require('bcrypt')

function create(newUser: UserDocument): Promise<UserDocument> {
  return User.findOne({email: newUser.email})
    .exec()
    .then((user) => {
      if (user) {
        throw new Error(`User slready exist`)        
      }
      return newUser.save()
    })
  
}

function existingUser(email: string, password: string): Promise<UserDocument> {
  return User.findOne( {email: email}).exec()
    .then( async user => {
      if(!user) {
        throw new Error('User does not exist')
      }
      const passwordCorrect = await bcrypt.compare(password, user.password)
      if(!passwordCorrect) {
        throw new Error('Password incorrect')
      }
      return user
    })
      
} 

function findUserById(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      return user
    })
}

function findAllUsers(): Promise<UserDocument[]> {
  return User.find().sort({ firstName: 1 }).exec()
}

function update(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      if (update.firstName) {
        user.firstName = update.firstName
      }

      if (update.lastName) {
        user.lastName = update.lastName
      }
      if (update.role) {
        user.role = update.role
      }

      return user.save()
    })
}

function deleteUser(userId: string): Promise<UserDocument | null> {
  return User.findByIdAndDelete(userId).exec()
}

export default {
  create,
  existingUser,
  findUserById,
  findAllUsers,
  update,
  deleteUser,
}
