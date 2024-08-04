import UserController from '@controllers/user-controller'
import { Router, Request, Response, NextFunction } from 'express'

const router = Router()
const controller = new UserController()

router.get('/get', (req: Request, res: Response, next: NextFunction) => { controller.getUser(req, res).catch((erro) => next(erro)) })
router.post('/authenticate', (req: Request, res: Response, next: NextFunction) => { controller.authenticate(req, res).catch((erro) => next(erro)) })
router.post('/create', (req: Request, res: Response, next: NextFunction) => { controller.create(req, res).catch((erro) => next(erro)) })
router.put('/update/:id', (req: Request, res: Response, next: NextFunction) => { controller.update(req, res).catch((erro) => next(erro)) })

export default router