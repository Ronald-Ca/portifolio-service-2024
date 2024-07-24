import AboutController from '@controllers/about-controller'
import { Router, Request, Response, NextFunction } from 'express'

const router = Router()
const controller = new AboutController()

router.get('/get', (req: Request, res: Response, next: NextFunction) => { controller.getAbout(req, res).catch((erro) => next(erro)) })
router.post('/create', (req: Request, res: Response, next: NextFunction) => { controller.create(req, res).catch((erro) => next(erro)) })
router.put('/update/:id', (req: Request, res: Response, next: NextFunction) => { controller.update(req, res).catch((erro) => next(erro)) })

export default router