import { Router } from 'express'
import { ProductsController } from '../controllers/products-controller'

export const productsRouter = Router()
const productsController = new ProductsController()

productsRouter.get('/', productsController.getAll)
productsRouter.get('/:id', productsController.getById)
productsRouter.post('/', productsController.create)
productsRouter.put('/:id', productsController.update)
productsRouter.delete('/:id', productsController.delete)
