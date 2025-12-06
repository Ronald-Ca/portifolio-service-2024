import CurriculumController from '../controllers/curriculum-controller'
import { Router } from 'express'
import Auth from '../middlewares/auth'
import { asyncHandler } from '../middlewares/error-handler'

const router = Router()
const controller = new CurriculumController()

router.get('/', asyncHandler(controller.getCurriculum.bind(controller)))
router.get('/download/:id', asyncHandler(controller.downloadCurriculum.bind(controller)))
router.post('/create', Auth, asyncHandler(controller.create.bind(controller)))
router.put('/update/:id', Auth, asyncHandler(controller.update.bind(controller)))

export default router