import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { isAuthenticated } from '../../../shared/http/middlewares/is-authenticated'
import { UsersController } from '../controllers/users-controller'

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
