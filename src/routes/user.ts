import UserController from '../controllers/user-controller'
import { Router } from 'express'
import Auth from '../middlewares/auth'
import { asyncHandler } from '../middlewares/error-handler'

const router = Router()
const controller = new UserController()

router.get('/get', asyncHandler(controller.getUser.bind(controller)))
router.post('/authenticate', asyncHandler(controller.authenticate.bind(controller)))
router.post('/validate-token', asyncHandler(controller.validateToken.bind(controller)))
router.post('/create/portifolio-user', asyncHandler(controller.create.bind(controller)))
router.put('/update/:id', Auth, asyncHandler(controller.update.bind(controller)))

export default router