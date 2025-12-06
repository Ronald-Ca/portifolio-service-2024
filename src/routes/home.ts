import HomeController from "../controllers/home-controller"
import Auth from "../middlewares/auth"
import { Router } from 'express'
import { asyncHandler } from "../middlewares/error-handler"

const router = Router()
const controller = new HomeController()

router.get('/', asyncHandler(controller.get.bind(controller)))
router.post('/', Auth, asyncHandler(controller.create.bind(controller)))
router.put('/:id', Auth, asyncHandler(controller.update.bind(controller)))

export default router