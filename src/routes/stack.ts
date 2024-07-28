import StackController from '@controllers/stack-controller'
import { Router, Request, Response, NextFunction } from 'express'

const router = Router()
const controller = new StackController()

router.get('/get', (req: Request, res: Response, next: NextFunction) => { controller.getStack(req, res).catch((erro) => next(erro)) })
router.post('/create', (req: Request, res: Response, next: NextFunction) => { controller.create(req, res).catch((erro) => next(erro)) })
router.put('/update/:id', (req: Request, res: Response, next: NextFunction) => { controller.update(req, res).catch((erro) => next(erro)) })

export default router