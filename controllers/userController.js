import { Router } from 'express'
import { invalidRequest, serverError, success } from '../utils/response.js'
import prisma from '../prisma.js'
import { hashPassword } from '../utils/authUtils.js'

const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  })
  if (!user) {
    return serverError(res, 'User not found')
  }
  return success(res, { user }, 'User fetched successfully')
}

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const hashedPassword = await hashPassword(password)
  try {
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        client: {
          connect: {
            id: req.user.client.id,
          },
        },
      },
    })
    newUser.password = undefined

    return success(res, { user: newUser }, 'User created successfully')
  } catch (error) {
    console.log(error)
    return serverError(res, 'Failed to create the user')
  }
}

const getAllUsers = async (req, res) => {
  const { id } = req.user.client
  if (!id) return invalidRequest(res, 'Client Id not found')
  const users = await prisma.user.findMany({
    where: {
      clientId: id,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatar: true,
      role: true,
      phone: true,
    },
  })

  return success(res, { users }, 'Users fetched successfully')
}

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/', getUser)
userRouter.get('/all', getAllUsers)

export default userRouter
