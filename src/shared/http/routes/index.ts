import { productsRouter } from '@modules/products/routes'
import { usersRouter } from '@modules/users/routes/users.routes'
import { Router } from 'express'

export const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
