import express from 'express'
import {
  createUser,
  logInUser,
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser,
  logOutUser,
  isLoggedIn,
} from '../controllers/user'

const router = express.Router()
import {userAuth, adminAuth } from '../middlewares/auth'

router.get('/isloggedin', isLoggedIn)
router.get('/logout', logOutUser)
router.get('/', userAuth, adminAuth, findAllUsers)
router.get('/:userId', userAuth, adminAuth, findUserById)
router.put('/:userId', userAuth, updateUser)
router.delete('/:userId', userAuth, adminAuth, deleteUser)
router.post('/', createUser)
router.post('/login', logInUser)

export default router
