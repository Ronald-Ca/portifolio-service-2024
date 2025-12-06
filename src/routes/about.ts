import AboutController from '../controllers/about-controller'
import { Router } from 'express'
import Auth from '../middlewares/auth'
import { asyncHandler } from '../middlewares/error-handler'

const router = Router()
const controller = new AboutController()

router.get('/', asyncHandler(controller.get.bind(controller)))
router.post('/', Auth, asyncHandler(controller.create.bind(controller)))
router.put('/:id', Auth, asyncHandler(controller.update.bind(controller)))

export default router