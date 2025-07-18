import CurriculumController from '../controllers/curriculum-controller'
import { Router, Request, Response, NextFunction } from 'express'
import Auth from '../middlewares/auth'

const router = Router()
const controller = new CurriculumController()

router.get('/', (req: Request, res: Response, next: NextFunction) => { controller.getCurriculum(req, res).catch((erro) => next(erro)) })
router.get('/download/:id', (req: Request, res: Response, next: NextFunction) => { controller.downloadCurriculum(req, res).catch((erro) => next(erro)) })
router.post('/create', Auth, (req: Request, res: Response, next: NextFunction) => { controller.create(req, res).catch((erro) => next(erro)) })
router.put('/update/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.update(req, res).catch((erro) => next(erro)) })

export default router