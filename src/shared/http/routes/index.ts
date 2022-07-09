import { productsRouter } from '@modules/products/routes'
import { sessionRouter, usersRouter } from '@modules/users/routes'
import { Router } from 'express'

export const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/session', sessionRouter)
