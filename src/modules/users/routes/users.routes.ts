import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { UsersController } from '../controllers/users-controller'
import { isAuthenticated } from './../middlewares/is-authenticated'

export const usersRouter = Router()
const usersController = new UsersController()

usersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create)

usersRouter.get('/', isAuthenticated, usersController.getAll)
