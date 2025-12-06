import SkillController from '../controllers/skill-controller'
import { Router } from 'express'
import Auth from '../middlewares/auth'
import { asyncHandler } from '../middlewares/error-handler'

const router = Router()
const controller = new SkillController()

router.get('/', asyncHandler(controller.getSkill.bind(controller)))
router.post('/create', Auth, asyncHandler(controller.create.bind(controller)))
router.put('/update/:id', Auth, asyncHandler(controller.update.bind(controller)))

export default router