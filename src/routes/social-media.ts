import SocialMediaController from '../controllers/social-media-controller'
import { Router } from 'express'
import Auth from '../middlewares/auth'
import { asyncHandler } from '../middlewares/error-handler'

const router = Router()
const controller = new SocialMediaController()

router.get('/', asyncHandler(controller.getAll.bind(controller)))
router.post('/', Auth, asyncHandler(controller.create.bind(controller)))
router.put('/:id', Auth, asyncHandler(controller.update.bind(controller)))

export default router