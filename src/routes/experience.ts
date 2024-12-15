import ExperienceController from '@controllers/experience-controller'
import { Router, Request, Response, NextFunction } from 'express'

const router = Router()
const controller = new ExperienceController()

router.get('/', (req: Request, res: Response, next: NextFunction) => { controller.getAll(req, res).catch((erro) => next(erro)) })
router.post('/', (req: Request, res: Response, next: NextFunction) => { controller.create(req, res).catch((erro) => next(erro)) })
router.put('/:id', (req: Request, res: Response, next: NextFunction) => { controller.update(req, res).catch((erro) => next(erro)) })

export default router